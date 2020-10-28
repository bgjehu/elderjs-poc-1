const dev = process.env.BUILD_ENV === 'localhost';
module.exports = {
  plugins: [
    require('postcss-import')(),
    require('postcss-url')(),
    require('tailwindcss')('./tailwind.config.js'),
    require('autoprefixer')(),
    !dev &&
      require('@fullhuman/postcss-purgecss')({
        content: ['./src/**/*.svelte', './src/**/*.html'],
        whitelistPatternsChildren: [/svelte-/],
        defaultExtractor: (content) => {
          let matching = [];

          const regulars = content.match(/[\w-/:%.]+(?<!:)/g);
          const classDirectives = content.match(/(?<=class:)[\w-/:%.]+(?<!:)/g);

          if (regulars) {
            matching.push(...regulars);
          }

          if (classDirectives) {
            matching.push(...classDirectives);
          }

          return matching;
        },
        whitelist: [],
      }),
    !dev && require('cssnano')(),
  ].filter((x) => x),
};
