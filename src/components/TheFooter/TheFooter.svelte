<script>
  import NewsletterSignup from '../NewsletterSignup/NewsletterSignup.svelte';
  import BaseLink from '../BaseLink/BaseLink.svelte';
  import { SPRITESHEET_URL } from '../../utils/constants';
  import { smoothScrollIntoView } from '../../utils/side-effects';

  // CMS
  export let socialIcons;
  export let links;
  export let conditions;
  export let cities;
  export let badges = undefined;
  export let socialMediaText;
  export let spanishLabel;
  export let englishLabel;
  export let newsletterSignup;
  export let topPageLinkText;
  export let copyrightText;
  export let globalDisclaimer = undefined;

  // CMS - from page
  export let pageDisclaimer = undefined;

  // Programatic
  export let lang = 'en';
  export let spanishLink = undefined;
  export let englishLink = undefined;
  export let dataTestId = 'the-footer';

  // to respond to changes in the English and Spanish link props
  $: englishLinkObj = englishLink;
  $: spanishLinkObj = spanishLink;

  const handleBackToTopButtonClicked = e => {
    // see whether user activated this with click of mouse or enter key
    // if the latter, go to skip link. We want focus to be on the top of the page instead of on the bottom.
    // else, just do the scroll the to top
    if (e.detail > 0) smoothScrollIntoView();
    else document.getElementById('skip-link').focus();
  };
</script>

<footer class="flex print:hidden flex-col bg-gray-pale" data-testid={dataTestId}>
  <!-- Sociasl, Link Section, Newsletter -->
  <div class="w-full lg:bg-white flex flex-col">
    <div class="flex w-full flex-wrap items-center max-w-6xl mx-auto lg:flex-row lg:items-start">
      <!-- Social Icons -->
      <div
        class="flex items-center lg:items-start w-full bg-white lg:bg-transparent shadow-md lg:shadow-none p-4 lg:py-0
        lg:mt-8 lg:flex-col lg:w-1/4 xl:w-1/6">
        <span class="text-lg leading-tight text-blue-navy mr-auto">{socialMediaText}</span>
        {#each socialIcons as { link, icon }}
          {#if link && link.url && link.text}
            <BaseLink
              className="mr-5 last:mr-0 text-blue-cerulean hover:text-blue-darkish group lg:mt-3 lg:mb-4"
              {...link}
              ariaLabel={link.text}>
              <svg
                role="presentation"
                class="w-6 h-6 inline fill-current transform group-hover:text-blue-darkish lg:mr-2">
                <use xlink:href="{SPRITESHEET_URL}#{icon}" />
              </svg>
              <span class="hidden lg:inline-block group-hover:underline">{link.text}</span>
            </BaseLink>
          {/if}
        {/each}
      </div>
      <!-- Link Section - Need to Split out Conditions and Cities -->
      <div class="flex flex-wrap pb-10 w-full lg:w-3/4 xl:w-3/6">
        {#each links as linkGroup, i}
          <nav
            aria-labelledby="footer-nav-{i}"
            class="w-1/2 md:w-1/3 mt-8 px-4 flex flex-col"
            data-testid="the-footer-link-group-{i}">
            <h3 id="footer-nav-{i}" class="text-lg leading-tight text-blue-navy break-words">
              {linkGroup.headingText}
            </h3>
            {#each linkGroup.childLinks as link}
              <div class="mt-3">
                <BaseLink
                  className="text-sm leading-tight text-gray-charcoal break-words hover:underline
                  hover:text-blue-cerulean"
                  {...link} />
              </div>
            {/each}
            {#if linkGroup && linkGroup.viewAllLink && linkGroup.viewAllLink.url}
              <BaseLink
                className="flex w-full md:w-1/2 items-center mt-3 md:mt-2 -ml-0.5 text-xs leading-relaxed font-medium
                text-blue-cerulean group hover:text-blue-darkish"
                {...linkGroup.viewAllLink}
                dataTestId="the-footer-view-all-link">
                <svg role="presentation" class="w-4 h-4 inline mr-2 fill-current">
                  <use xlink:href="{SPRITESHEET_URL}#plus-sign" />
                </svg>
                <span class="group-hover:underline">{linkGroup.viewAllLink.text}</span>
              </BaseLink>
            {/if}
          </nav>
        {/each}
      </div>
      <!-- Newsletter -->
      <div class="w-full flex items-center xl:w-2/6 xl:mt-4">
        <NewsletterSignup hydrate-client={{ ...newsletterSignup, lang }} />
      </div>
    </div>
  </div>
  <!-- Cities and Conditions -->
  <div class="pb-10 lg:order-first lg:shadow-content-well lg:py-16">
    <div class="flex flex-wrap max-w-6xl mx-auto justify-between">
      <!-- Cities -->
      <nav
        aria-labelledby="footer-nav-cities"
        class="w-1/2 mt-8 px-4 lg:bg-white lg:py-4 lg:shadow-y-sm lg:mr-4 lg:ml-16 lg:w-auto lg:flex-1 lg:mt-0"
        data-testid="the-footer-link-group-cities">
        <div class="flex flex-col md:flex-row md:flex-wrap">
          <h3 id="footer-nav-cities" class="text-lg leading-tight text-blue-navy break-words w-full">
            {cities.headingText}
          </h3>
          {#each cities.childLinks as link}
            <div class="w-full md:w-1/2 mt-3">
              <BaseLink
                className="text-sm leading-tight text-gray-charcoal break-words hover:text-blue-cerulean hover:underline"
                {...link} />
            </div>
          {/each}
          {#if cities && cities.viewAllLink && cities.viewAllLink.url}
            <BaseLink
              className="flex w-full md:w-1/2 items-center mt-3 md:mt-2 -ml-0.5 text-xs leading-relaxed font-medium
              text-blue-cerulean group hover:text-blue-darkish"
              {...cities.viewAllLink}
              dataTestId="the-footer-view-all-link">
              <svg role="presentation" class="w-4 h-4 inline mr-2 fill-current">
                <use xlink:href="{SPRITESHEET_URL}#plus-sign" />
              </svg>
              <span class="group-hover:underline">{cities.viewAllLink.text}</span>
            </BaseLink>
          {/if}
        </div>
      </nav>
      <!-- Conditons -->
      <nav
        aria-labelledby="footer-nav-conditions"
        class="w-1/2 mt-8 px-4 lg:bg-white lg:py-4 lg:shadow-y-sm lg:ml-4 lg:mr-16 lg:w-auto lg:flex-1 lg:mt-0"
        data-testid="the-footer-link-group-conditions">
        <div class="flex flex-col md:flex-row md:flex-wrap">
          <h3 id="footer-nav-conditions" class="text-lg leading-tight text-blue-navy break-words w-full">
            {conditions.headingText}
          </h3>
          {#each conditions.childLinks as link}
            <div class="w-full md:w-1/2 mt-3">
              <BaseLink
                className="text-sm leading-tight text-gray-charcoal break-words hover:text-blue-cerulean hover:underline"
                {...link} />
            </div>
          {/each}
          {#if conditions && conditions.viewAllLink && conditions.viewAllLink.url}
            <BaseLink
              className="flex w-full md:w-1/2 items-center mt-3 md:mt-2 -ml-0.5 text-xs leading-relaxed font-medium
              text-blue-cerulean group hover:text-blue-darkish"
              {...conditions.viewAllLink}
              dataTestId="the-footer-view-all-link">
              <svg role="presentation" class="w-4 h-4 inline mr-2 fill-current">
                <use xlink:href="{SPRITESHEET_URL}#plus-sign" />
              </svg>
              <span class="group-hover:underline">{conditions.viewAllLink.text}</span>
            </BaseLink>
          {/if}
        </div>
      </nav>
    </div>
  </div>
  <!-- Copywrite, Language Selection, Back to Top -->
  <div class="px-4 bg-blue-navy">
    <div class="flex flex-wrap items-center max-w-6xl mx-auto">
      <div class="pt-8 pb-10 w-full relative">
        <!-- Language Selection -->
        <svg role="presentation" class="w-6 h-6 inline mr-4 fill-current text-white">
          <use xlink:href="{SPRITESHEET_URL}#language-globe" />
        </svg>
        {#if englishLinkObj && englishLinkObj.url}
          <BaseLink
            className="mr-4 inline-block text-lg text-white opacity-50 hover:opacity-75 active:opacity-100"
            {...englishLinkObj}
            dataTestId="the-footer-language-en">
            {englishLabel}
          </BaseLink>
        {:else}
          <span
            class="mr-4 inline-block text-lg text-white border-white border-b-2 font-medium"
            data-testid="the-footer-language-en">
            {englishLabel}
          </span>
        {/if}
        {#if spanishLinkObj && spanishLinkObj.url}
          <BaseLink
            className="mr-4 inline-block text-lg text-white opacity-50 hover:opacity-75 active:opacity-100"
            {...spanishLinkObj}
            dataTestId="the-footer-language-es">
            {spanishLabel}
          </BaseLink>
        {:else}
          <span
            class="mr-4 inline-block text-lg text-white border-white border-b-2 font-medium"
            data-testid="the-footer-language-es">
            {spanishLabel}
          </span>
        {/if}
        <!-- Back to Top -->
        <button class="absolute right-0 group mt-1" on:click={handleBackToTopButtonClicked}>
          <span
            class="mr-2 text-xs leading-normal text-right font-medium text-blue-bright-cyan
            group-hover:text-blue-robin-egg group-hover:underline active:text-blue-robin-egg inline">
            {topPageLinkText}
          </span>
          <svg
            role="presentation"
            class="w-4 h-4 inline fill-current text-blue-bright-cyan group-hover:text-blue-robin-egg transform
            -rotate-90">
            <use xlink:href="{SPRITESHEET_URL}#right-arrow" />
          </svg>
        </button>
      </div>
    </div>
    <!-- Copyright -->
    <div class="max-w-6xl mx-auto">
      <div class="pb-8 text-sm leading-tight text-white">
        {@html copyrightText.content}
      </div>
    </div>
  </div>
  <!-- Badges, Global Disclaimer, Page Disclaimer-->
  <div class="px-4 pt-8 bg-white">
    <div class="flex flex-wrap items-center max-w-6xl mx-auto">
      <!-- Badges -->
      {#if badges}
        <div class="flex flex-row flex-wrap justify-center items-center w-full mb-8">
          {#each badges as { link, image }}
            <BaseLink className="m-4 h-16 max-h-16" {...link} ariaLabel={link.text}>
              <img class="lazyload object-scale-down h-16 w-auto" height="64" data-src={image.url} alt={image.alt} />
            </BaseLink>
          {/each}
        </div>
      {/if}

      <!-- Global Disclaimer - Move Outside of this Section -->
      {#if globalDisclaimer && globalDisclaimer.content}
        <div
          class="pb-8 text-sm leading-tight text-gray-warm mx-auto max-w-4xl"
          data-testid="the-footer-global-disclaimer">
          {@html globalDisclaimer.content}
        </div>
      {/if}

      <!-- Page Disclaimer - Move Outside of this Section -->
      {#if pageDisclaimer && pageDisclaimer.content}
        <div
          class="pb-8 text-sm leading-tight text-gray-warm mx-auto max-w-4xl"
          data-testid="the-footer-page-disclaimer">
          {@html pageDisclaimer.content}
        </div>
      {/if}
    </div>
  </div>
</footer>
