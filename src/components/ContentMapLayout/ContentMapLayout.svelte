<script>
  // import InfoTile from '../components/InfoTile/InfoTile.svelte';
  // import BaseContentSet from '../components/BaseContentSet/BaseContentSet.svelte';
  // import ContentLargeBlurb from '../components/ContentLargeBlurb/ContentLargeBlurb.svelte';
  // import ContentLinkBox from '../components/ContentLinkBox/ContentLinkBox.svelte';
  // import ContentPullQuote from '../components/ContentPullQuote/ContentPullQuote.svelte';
  // import ContentSingleBlurb from '../components/ContentSingleBlurb/ContentSingleBlurb.svelte';
  // import InfoBanner from '../components/InfoBanner/InfoBanner.svelte';
  // import LowestPricingList from '../components/LowestPricingList/LowestPricingList.svelte';
  // import MarketingSectionHeader from '../components/MarketingSectionHeader/MarketingSectionHeader.svelte';
  // import MoreInfoBanner from '../components/MoreInfoBanner/MoreInfoBanner.svelte';
  // import NewsletterSignup from '../components/NewsletterSignup/NewsletterSignup.svelte';
  // import TextExpander from '../components/TextExpander/TextExpander.svelte';
  import SearchAside from '../../components/SearchAside/SearchAside.svelte';

  export let content;

  const dynamicComponent = typename => {
    switch (typename) {
      case 'SearchAside':
        return import('../../components/SearchAside/SearchAside.svelte');
      default:
        return Promise.resolve();
    }
  };
</script>

{#await dynamicComponent(content.__typename) then module}
  {#if module && module.default}
    <svelte:component this={module.default} {...content} />
  {/if}
{/await}
