<script>
  import ArticlePage from '../../components/ArticlePage/ArticlePage.svelte';
  import ContentMapLayout from '../../components/ContentMapLayout/ContentMapLayout.svelte';
  // import SearchPromoLite from '../../../../components/SearchPromoLite/SearchPromoLite.svelte';
  // import LowestPricingList from '../../../../components/LowestPricingList/LowestPricingList.svelte';
  // import ArticleSlider from '../../../../components/ArticleSlider/ArticleSlider.svelte';
  import contentMap from '../../utils/ContentMapLayout';

  export let data;
  const { article, articles } = data;
  // export let lowestPricingList;
  // export let aside;
  // export let articles;
  // export let articlesHeadingText;
  // export let articlesHeadingLevel;
  // export let searchPromoLite;

  $: theme = article.theme || 'light_blue';
  $: hasArticles = !!articles.length;
</script>

<div class="bg-gray-mercury">
  <div
    class:bg-gradient-blue-light={theme === 'light_blue'}
    class:bg-gradient-pink-light={theme === 'light_pink'}
    class:bg-gradient-blue-dark={theme === 'dark_blue'}
    class:bg-gradient-gray-dark={theme === 'dark_gray'}
    class:bg-gradient-purple-light={theme === 'light_purple'}
    class:bg-gradient-gold={theme === 'gold'}
    class="hidden lg:flex items-center justify-center w-full h-116 px-4">
    <div class="w-full max-w-6xl">
      <img class="right-0 w-88 ml-auto" src={article.image.url} alt={article.image.alt} />
    </div>
  </div>
  <div class="flex flex-col items-center shadow-content-well print:shadow-none lg:px-4">
    <div class="flex flex-col lg:flex-row max-w-6xl lg:mt-10" class:lg:mb-22={!hasArticles}>
      <div class="flex flex-col lg:flex-grow lg:-mt-116">
        <ArticlePage {...article} className={!hasArticles ? 'mb-4 lg:mb-0' : ''} />
      </div>
      <!-- Aside lg -->
      <div class="hidden lg:block lg:w-88 lg:ml-10 lg:flex-none">
        <div class="sticky top-8">
          <!-- {#if lowestPricingList}
            <div class="mb-8">
              <LowestPricingList {...lowestPricingList} />
            </div>
          {/if} -->
          {#if article.aside}
            {#each article.aside.imports as content}
              <div class="mb-8">
                <ContentMapLayout hydrate-client={{content}} />
              </div>
            {/each}
          {/if}
        </div>
      </div>
    </div>

    <!-- Aside sm -->
    <div class="lg:hidden w-full">
      <!-- {#if lowestPricingList}
        <LowestPricingList {...lowestPricingList} />
      {/if}
      {#if aside}
        {#each aside.imports as content}
          <svelte:component this={contentMap[content.__typename]} {...content} />
        {/each}
      {/if} -->
    </div>
    <!-- {#if hasArticles}
      <ArticleSlider headingLevel={articlesHeadingLevel} headingText={articlesHeadingText} {articles}/>
    {/if} -->
  </div>
  <div class="w-full">
    <!-- <SearchPromoLite {...searchPromoLite} /> -->
  </div>
</div>
