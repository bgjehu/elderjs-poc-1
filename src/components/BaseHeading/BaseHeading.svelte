<script>
  // Programatic
  export let headingLevel = 'h1';
  export let className = '';
  export let dataTestId = 'base-heading';

  const newLineRegex = /\n/;

  if (typeof className === 'string' && newLineRegex.test(className)) className = className.replace('\n', ' ');
</script>

{#if headingLevel === 'h1'}
  <h1 class={className} data-testid={dataTestId}>
    <slot />
  </h1>
{:else if headingLevel === 'h2'}
  <h2 class={className} data-testid={dataTestId}>
    <slot />
  </h2>
{:else if headingLevel === 'h3'}
  <h3 class={className} data-testid={dataTestId}>
    <slot />
  </h3>
{:else if headingLevel === 'h4'}
  <h4 class={className} data-testid={dataTestId}>
    <slot />
  </h4>
{:else if headingLevel === 'h5'}
  <h5 class={className} data-testid={dataTestId}>
    <slot />
  </h5>
{:else if headingLevel === 'h6'}
  <h6 class={className} data-testid={dataTestId}>
    <slot />
  </h6>
{/if}
