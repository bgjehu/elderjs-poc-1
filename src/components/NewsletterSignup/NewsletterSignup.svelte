<script context="module">
  let count = 0;
</script>

<script>
  import BaseSpinner from '../BaseSpinner/BaseSpinner.svelte';
  import handleFetch from '../../utils/handleFetch';
  import { SPRITESHEET_URL, KEYCODES } from '../../utils/constants';
  // import { trackEvent } from '../../utils/trackers';
  // import handleSAASError from '../../utils/handleSAASError';

  // CMS
  export let theme = 'gray';
  export let instructions;
  export let label;
  export let placeholder;
  export let submitButtonLabel;
  export let validationErrorText;
  export let errorText;
  export let tryAgainButtonLabel;
  export let successText;
  export let locale;

  // Programatic
  export let incomingState = 'initial';
  export let lang = locale || 'en';
  export let dataTestId = 'newsletter-signup';
  const key = count++;

  let inputValue;
  let inputNode;

  // Component Statement Managment
  const setState = state => {
    currentState = { ...initialStates, [state]: true };
  };

  let currentState;

  const initialStates = {
    initial: false,
    populated: false,
    invalid: false,
    pending: false,
    failed: false,
    success: false,
  };

  setState(incomingState);

  $: state = currentState;

  const handleSubmit = async () => {
    // trackEvent('Newsletter Signup', 'Form Submission', 'trackCustom');
    try {
      setState('pending');
      const pending = await handleFetch(`${process.env.SAAS_NEWSLETTER_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': `${process.env.SAAS_API_KEY}`,
        },
        body: JSON.stringify({
          email: inputValue,
          locale: lang === 'es' ? 'es-US' : 'en-US',
        }),
      });
      const response = await pending.json();

      if (response.registered) {
        setState('success');
      } else {
        // handleSAASError('Newsletter signup failed.', response.id, { errorMessage: response.message});
        setState('failed');
      }
    } catch (e) {
      setState('failed');
    }
  };

  const checkValidity = () => {
    if (!inputNode.validity.valid || !inputValue) {
      setState('invalid');
    }
  };

  const handleBlur = () => {
    if (!inputNode.validity.valid) {
      if (!inputValue) {
        reset();
      } else {
        setState('invalid');
      }
    }
  };

  const handleFocus = () => {
    setState('populated');
  };

  const handleRetry = () => {
    setState('populated');
  };

  const handleOnKeydown = (e) => {
    if (e.keyCode === KEYCODES.ESCAPE || e.keyCode === KEYCODES.ENTER ) return;
    if (state.invalid) setState('populated');
  }

  const reset = () => {
    inputValue = '';
    setState('initial');
  };
</script>

<div
  data-testid={dataTestId}
  class="w-full print:hidden"
  class:bg-gray-light-silver={theme === 'gray'}
  class:bg-blue-cerulean={theme === 'blue'}>
  <div class="pt-8 px-4 pb-0 flex flex-col justify-between min-h-64 max-w-100 mx-auto">
    {#if state.success}
      <div class="flex justify-center items-center my-4">
        <svg
          class="w-16 h-16 fill-current"
          class:text-blue-cerulean={theme === 'gray'}
          class:text-blue-light={theme === 'blue'}>
          <use xlink:href={`${SPRITESHEET_URL}#check`} />
        </svg>
      </div>
      <p
        class="text-base leading-tight font-medium mb-12 px-8"
        class:text-blue-navy={theme === 'gray'}
        class:text-white={theme === 'blue'}>
        {successText}
      </p>
    {:else if state.failed}
      <div class="flex justify-center items-center mb-0">
        <svg
          class="w-16 h-16 fill-current text-red"
          class:text-red={theme === 'gray'}
          class:text-white={theme === 'blue'}>
          <use xlink:href={`${SPRITESHEET_URL}#alert`} />
        </svg>
      </div>
      <p
        class="text-base leading-tight font-medium my-4 px-8"
        class:text-blue-navy={theme === 'gray'}
        class:text-white={theme === 'blue'}>
        {errorText}
      </p>
      <div class="flex justify-center items-center mb-8">
        <button
          class="leading-loose text-center font-medium bg-blue-robin-egg hover:bg-blue-light active:bg-blue-malibu
          transition-shadow duration-200 ease-in-out focus:outline-none focus:shadow-focus active:shadow-active
          rounded-md whitespace-no-wrap min-w-25 px-4 flex items-center justify-center h-12 mt-0.5"
          data-testid="{dataTestId}-try-again-button"
          on:click={handleRetry}>
          {tryAgainButtonLabel}
        </button>
      </div>
    {:else}
      <div class="w-full h-12">
        <svg
          class="w-12 h-12 -mt-4 fill-current mb-4"
          class:text-blue-cerulean={theme === 'gray'}
          class:text-blue-light={theme === 'blue'}>
          <use xlink:href={`${SPRITESHEET_URL}#email`} />
        </svg>
      </div>
      <p
        class="text-base leading-tight font-medium mb-4"
        class:text-blue-navy={theme === 'gray'}
        class:text-white={theme === 'blue'}>
        {instructions}
      </p>
      <form
        id="newsletterSubmit"
        class="flex flex-row justify-between"
        data-testid="{dataTestId}-form"
        on:submit|preventDefault={handleSubmit}>
        <div class="min-h-20 flex-grow mr-2">
          <label for="email-{key}" class="visually-hidden">{label}</label>
          <input
            id="email-{key}"
            class="w-full shadow-md rounded border px-4 py-2 bg-white text-base leading-loose placeholder-gray-bluey
            transition-shadow duration-200 ease-in-out focus:outline-none focus:shadow-focus"
            class:border-red={state.invalid}
            class:text-red={state.invalid}
            class:border-gray-gunmetal={state.initial || state.pending}
            class:text-gray-gunmetal={state.initial || state.pending}
            type="email"
            bind:this={inputNode}
            bind:value={inputValue}
            on:keydown={handleOnKeydown}
            on:focus={handleFocus}
            on:blur={handleBlur}
            {placeholder}
            required
            aria-required="true"
            data-testid="{dataTestId}-input" />
          <span
            class="text-sm text-red leading-loose"
            class:hidden={state.initial || state.pending || state.populated}
            class:block={state.invalid}
            class:text-black={theme === 'gray'}
            class:text-white={theme === 'blue'}
            data-testid="{dataTestId}-validation-message">
            {validationErrorText}
          </span>
        </div>
        <div>
          <button
            type="submit"
            class="leading-loose text-center font-medium transition-shadow duration-200 ease-in-out focus:outline-none
            focus:shadow-focus active:shadow-active rounded-md whitespace-no-wrap min-w-25 px-4 flex items-center
            justify-center h-12 mt-0.5 bg-blue-robin-egg hover:bg-blue-light active:bg-blue-malibu text-black"
            on:click={checkValidity}
            data-testid="{dataTestId}-button">
            {#if state.pending}
              <BaseSpinner className="w-6 h-6 mt-1 text-blue-cerulean" dataTestId="{dataTestId}-form-section-spinner" />
            {:else}
              <!-- prettier-ignore -->
              {submitButtonLabel}
            {/if}
          </button>
        </div>
      </form>
    {/if}
  </div>
</div>
