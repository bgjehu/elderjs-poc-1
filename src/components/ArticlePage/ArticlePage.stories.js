import ArticlePage from './ArticlePage.svelte';
import { props } from './ArticlePage.fixtures.ts';
import { text, select } from '@storybook/addon-knobs';
import marked from 'marked';

export default { title: 'App/Article/ArticlePage' };

const themes = {
  'Light Blue': 'light_blue',
  'Light Pink': 'light_pink',
  'Dark Blue': 'dark_blue',
  'Dark Gray': 'dark_gray',
  'Light Purple': 'light_purple',
  Gold: 'gold',
};

export const defaultProps = () => ({
  Component: ArticlePage,
  props: {
    image: {
      url: text('image URL', props.image.url),
      alt: text('Alt text for image', props.image.alt),
    },
    category: text('Article Category', props.category),
    title: text('Article Title', props.title),
    headingLevel: select('Heading Level', ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'], props.headingLevel),
    publishDateLabel: text('Publish Date', props.publishDateLabel),
    theme: select('The color theme for image background', themes, props.theme),
    description: marked(text('Description', props.description)),
    content: marked(text('Content', props.content)),
  },
});
