<script>
  import BaseHeading from '../BaseHeading/BaseHeading.svelte';
  import { getPath } from '../../utils/imageKit.js';

  // programmatic
  export let image = undefined;
  export let theme = 'light_blue';
  export let category;
  export let publishDateLabel;
  export let title;
  export let headingLevel = 'h1';
  export let description = undefined; // Markdown
  export let content; // Markdown
  export let className = '';
  export let dataTestId = 'article-page';

  // Handle Image Setup
  const smSrc = getPath(image, { w: 300, ar: '2:1' });
  const mdSrc = getPath(image, { w: 576, ar: '2:1' });
  const lgSrc = getPath(image, { w: 720, ar: '2:1' });
  const xlSrc = getPath(image, { w: 1440, ar: '2:1' });

  const newLineRegex = /\n/;

  if (typeof className === 'string' && newLineRegex.test(className)) className = className.replace('\n', ' ');
</script>

<article class="bg-white lg:shadow-y-md p-4 2xl:p-10 {className}" data-testId={dataTestId}>
  {#if image && image.url && image.alt}
    <!-- This should always mirror ArtileTile for mobile -> md viewports -->
    <div
      class="lg:hidden -mx-4 -mt-4 mb-4 md:mb-10 h-64 flex items-center justify-center px-8"
      class:bg-gradient-blue-light={theme === 'light_blue'}
      class:bg-gradient-pink-light={theme === 'light_pink'}
      class:bg-gradient-blue-dark={theme === 'dark_blue'}
      class:bg-gradient-gray-dark={theme === 'dark_gray'}
      class:bg-gradient-purple-light={theme === 'light_purple'}
      class:bg-gradient-gold={theme === 'gold'}>
      <img
        class="object-contain h-56 w-full"
        src={smSrc}
        alt={image.alt}
        width="311"
        height="224"
        srcset={`${smSrc} 300w, ${mdSrc} 576w, ${lgSrc} 720w, ${xlSrc} 1440w`}
        sizes="(min-width 640px) 529px, (min-width: 768px) 657px, 80vw" />
    </div>
  {/if}
  <header class="w-full mb-4 md:mb-10">
    <span class="block mb-1 text-gray-warm text-xs font-medium leading-relaxed tracking-wide">{category.name}</span>
    <BaseHeading {headingLevel} className="mb-2 text-blue-navy text-lg sm:text-1.5xl lg:text-4xl lg:mb-3 leading-tight">
      {title}
    </BaseHeading>
    <span class="text-gray-warm text-sm leading-normal">{publishDateLabel}</span>
  </header>
  {#if description && description.content}
    <section class="markdown-wrapper -mx-4 lg:mx-0 mb-4 md:mb-10 p-4 md:py-10 lg:px-10 bg-blue-very-light text-base">
      {@html description.content}
    </section>
  {:else}
    <hr class="my-4 md:my-10 border-gray-silver" />
  {/if}
  <section class="markdown-wrapper w-full mb-4 md:mb-10 bg-white lg:p-0 text-base">
    {@html content}
  </section>
</article>
