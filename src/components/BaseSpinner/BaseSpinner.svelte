<script>
  // Programatic
  export let strokeCount = 12;
  export let duration = 1400;
  export let className = 'w-4 h-4 text-gray-charcoal';
  export let dataTestId = 'base-spinner';

  $: getDynamicStrokeStyles = index => `
    transform: rotate(${(index * 360) / strokeCount}deg);
    animation-delay: ${(duration * index) / strokeCount}ms;
    animation-duration: ${duration}ms;
  `;

  const newLineRegex = /\n/;

  if (typeof className === 'string' && newLineRegex.test(className)) className = className.replace('\n', ' ');
</script>

<div class="relative a11y-no-motion-hidden {className}" data-testid={dataTestId}>
  {#each Array(strokeCount) as circle, index}
    <svg class="animated-spinner" style={getDynamicStrokeStyles(index)} role="presentation">
      <circle cx="50%" cy="50%" r="50%" />
    </svg>
  {/each}
</div>
