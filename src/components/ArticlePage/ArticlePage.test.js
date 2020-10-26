import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/svelte';
import ArticlePage from './ArticlePage.svelte';
import { props } from './ArticlePage.fixtures';

it('should render to the DOM', () => {
  const { queryByTestId } = render(ArticlePage, {
    props,
  });
  expect(queryByTestId('article-page')).toBeInTheDocument();
});

it('should not render an image if image props are not passed down', () => {
  const props2 = {
    ...props,
    image: undefined,
  };
  const { container } = render(ArticlePage, {
    props: props2,
  });
  const img = container.querySelectorAll('img')[0];
  expect(img).toBeFalsy();
});

it('should render an image if image props are passed down', () => {
  const { container } = render(ArticlePage, {
    props,
  });
  const img = container.querySelectorAll('img')[0];
  expect(img).toBeInTheDocument();
});
