export const smoothScrollIntoView = (node = document.body, option = {}) => {
  const { matches: reduceMotion } = window.matchMedia('(prefers-reduced-motion: reduce)');
  node.scrollIntoView({ ...option, behavior: reduceMotion ? 'auto' : 'smooth' });
};

export const smoothScrollIntoContainer = (node, container) => {
  const nodeTop = node.offsetTop;
  const nodeBottom = node.offsetTop + node.offsetHeight;
  const containerTop = container.offsetTop + container.scrollTop;
  const containerBottom = containerTop + container.offsetHeight;

  if (nodeTop < containerTop) {
    smoothScrollIntoView(node, { block: 'start' });
  }

  if (nodeBottom > containerBottom) {
    smoothScrollIntoView(node, { block: 'end' });
  }
};
