<script>
  // CMS
  export let url;
  export let text = undefined;
  export let target = 'self';

  // Programmatic
  export let rel = undefined;
  export let ariaLabel = undefined;
  export let key = undefined;
  export let className = undefined;
  export let ref = undefined;
  export let dataTestId = 'base-link';
  export let itemscope = undefined;
  export let itemtype = undefined;
  export let itemprop = undefined;
  export let tabindex = undefined;
  export let id = undefined;
  export let onFocus = () => {};
  export let onBlur = () => {};

  const trailingSlashRegex = /[^\/]\?/;
  const newLineRegex = /\n/;

  $: if (target === 'blank') {
    target = '_blank';
    rel = [...new Set([...(rel || '').split(' '), 'noreferrer', 'noopener'])].join(' ').trim();
  } else if (target === null) {
    target = undefined;
  } else {
    target = '_self';
  }

  $: if (typeof url === 'string' && trailingSlashRegex.test(url)) url = url.replace('?', '/?');

  if (typeof className === 'string' && newLineRegex.test(className)) className = className.replace('\n', ' ');
</script>

<a
  {key}
  data-testid={dataTestId}
  class={className}
  href={url}
  {target}
  {rel}
  {itemscope}
  {itemtype}
  {itemprop}
  {tabindex}
  {id}
  aria-label={ariaLabel}
  on:focus={onFocus}
  on:blur={onBlur}
  bind:this={ref}>
  <slot>
    {#if text}{text}{/if}
  </slot>
</a>
