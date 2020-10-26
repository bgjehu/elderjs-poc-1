import BaseHeadingView from './BaseHeadingView.svelte';
import { select, text } from '@storybook/addon-knobs';

export default { title: 'Global/BaseHeading' };

export const defaultProps = () => ({
  Component: BaseHeadingView,
  props: {
    headingLevel: select('Heading Level', ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'], 'h2'),
    className: text(
      'Class Name',
      'text-blue-dark-navy font-medium text-base leading-tight md:text-lg md:leading-snug mb-2 p-4 pt-6 md:py-12 lg:py-16 mx-auto max-w-sm md:text-center'
    ),
  },
});
