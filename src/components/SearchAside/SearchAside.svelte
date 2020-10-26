<script>
  import { SPRITESHEET_URL, KEYCODES } from '../../utils/constants.js';

  //CMS
  export let inputPlaceHolder;
  export let buttonText;
  export let screenReaderSearchText;

  //programmatic
  export let dataTestId = 'search-aside';
  // export let closeCallback = () => {};

  let input;
  let button;

  const handleClick = e => {
    alert('openOverpanel');
  };

  const handleKeydown = e => {
    if (
      e.keyCode === KEYCODES.ESCAPE ||
      e.keyCode === KEYCODES.TAB ||
      e.keyCode === KEYCODES.ENTER ||
      e.keyCode === KEYCODES.SHIFT
    )
      return;
    handleClick(e);
  };
</script>

<div class="flex justify-center relative bg-blue-very-light flex text-center" data-testid={dataTestId}>
  <div class="flex items-center justify-center relative w-full lg:max-w-6xl px-4">
    <div class="w-full py-4 md:relative flex flex-col items-center">
      <div class="flex flex-col relative w-full md:max-w-full text-gunmetal items-center md:z-10">
        <svg class="absolute top-4 left-4 w-4 h-4 fill-current" role="presentation">
          <use xlink:href="{SPRITESHEET_URL}#magnifying-glass" />
        </svg>
        <button
          class="w-full shadow-md rounded-sm border border-gray-gunmetal bg-white mb-4 py-2 pl-10 pr-4 leading-loose
          text-base text-gray-warm font-normal text-left placeholder-gray-warm cursor-text whitespace-no-wrap
          overflow-hidden md:flex-2 w-full items-center"
          id='test'
          aria-label={screenReaderSearchText}
          bind:this={input}
          on:click={handleClick}
          on:keydown={handleKeydown}
          data-testid="{dataTestId}-input">
          {inputPlaceHolder}
        </button>
        <button
          class="flex-1 w-full rounded border-t border-blue-cerulean bg-blue-cerulean py-2 px-6 text-center text-base
          leading-loose font-medium text-white hover:bg-blue-darkish hover:border-blue-darkish active:bg-blue-navy
          active:border-blue-navy whitespace-no-wrap"
          bind:this={button}
          on:click={handleClick}
          data-testid="{dataTestId}-button">
          {buttonText}
        </button>
      </div>
    </div>
  </div>
</div>
