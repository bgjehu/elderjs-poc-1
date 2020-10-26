const cache = require('../../utils/redis');

module.exports = {
  // WARNING: Here be dragons and magic of all sorts.

  // 'data' and 'all' for this route are populated by /plugins/elder-plugin/markdown/index.js
  // This example is designed to show you the power of plugins.

  // If you look in your `elder.config.js` you will see that the plugin is configured as so:
  // 'elderjs-plugin-markdown': {
  //   routes: ['blog'],
  // },

  // This is telling the simple markdown plugin, which route to control.
  template: 'BlogPost.svelte',
  layout: 'TheLayout.svelte',
  data: async ({ request }) => {
    const blogGlobal = await cache.get({
      key: `${request.lang}/PageBlogGlobal/`,
      client: cache.contentClient,
    });
    const article = await cache.get({
      key: `${request.lang}/PageBlogPost/${request.slug}`,
      client: cache.contentClient,
    });
    const articles = await cache
      .keys({
        pattern: `${request.lang}/PageBlogPost/*`,
        client: cache.contentClient,
        noParse: true,
      })
      .then((keys) =>
        cache.multi({
          commands: keys.map((key) => ['GET', key]),
          client: cache.contentClient,
        }),
      );
    // aside
    if (!article.aside || !article.aside.imports.length) article.aside = blogGlobal.aside;
    return { article, articles };
  },
  all: async () => {
    const keys = await cache.keys({
      pattern: `*/PageBlogPost/*`,
      client: cache.contentClient,
      noParse: true,
    });
    const all = keys.map((key) => {
      const [_, lang, slug] = key.match(/(.+)\/PageBlogPost\/(.+)/);
      return { lang, slug };
    });
    return all;
  },
  permalink: ({ request }) => `${request.lang === 'es' ? '/es' : ''}/blog/${request.slug}/`,
};
