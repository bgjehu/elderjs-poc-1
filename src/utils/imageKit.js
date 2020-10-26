const whitelist = ['ik.imagekit.io', 'images.insiderx.com'];

// Note - this is a increadibly small subset of features we can use to transform a image
// Please extend to add others as needed, for transforms that require other attributes, please safeguard (like crop below)
// https://docs.imagekit.io/features/image-transformations/resize-crop-and-other-transformations

export const getPath = (image, options, dpr) => {
  // Safeguard when Image is Optional in a component
  if (!image || !image.url) return undefined;

  // Safeguard when Image is not hosted on ImageKit or Origin we control
  // Don't add transforms to prevent 404 of Image
  const parts = image.url.split('//');
  const domain = parts.length > 1 ? parts[1].split('/')[0] : parts[0].split('/')[0];
  if (!whitelist.includes(domain)) return image.url;

  // Used for tranformations that apply resize, crop, padding, etc
  const transforms = [];

  // Used for transformations that have to applied after any an initial resizeable transformation (crop, resize, pad, etc)
  const chainedTransforms = [];

  // Did we have options
  if (options) {
    // Height
    if (options.w) transforms.push(`w-${options.w}`);

    // Width
    if (options.h) transforms.push(`h-${options.h}`);

    // Focus Auto
    if (options.auto) transforms.push(`fo-auto`);

    // Both Height & Width, can use more advanced crop method, or padding
    // Leaving x,y and fo off will crop from center when using a different aspect w/h
    // To prevent crop, a background (bg) can be passed to pad the image
    if (options.h && options.w) {
      if (options.x && options.y) {
        // Crop starts at top/left corner reprsented by x,y and goes w,h
        transforms.push('cm-extract');
        transforms.push(`x-${options.x}`);
        transforms.push(`y-${options.y}`);
      } else if (options.fo && !options.bg) {
        // Crop at preset focus locations defined by 'fo'
        transforms.push('cm-extract');
        transforms.push(`fo-${options.fo}`);
      } else if (options.bg) {
        // Pads a image to the correct size with the color specified
        // Color should be 6 byte hex value, we strip of # to prevent accidents
        transforms.push('cm-pad_resize');
        transforms.push(`bg-${options.bg.replace('#', '')}`);

        // If we have preset focus, apply that also so we control what direction we pad from
        if (options.fo) {
          transforms.push(`fo-${options.fo}`);
        }
      }
    }

    // Can only use Aspect Ratio (ar) if only height or only width is specified
    // For a 4:3 ratio, should use '4-3'. Adding safeguard to replace ':' with '-' to be safe
    // It is (width):(height) when passing 4:3 as a example
    if (options.ar && ((options.h && !options.w) || (!options.h && options.w))) {
      transforms.push(`ar-${options.ar.replace(':', '-')}`);
    }

    ///////////////////////////////////////////////////////////////
    // NOTE - Everything below here should be chained transforms
    //        that require resize to be finished first
    //////////////////////////////////////////////////////////////

    // Applies a radius if sent in
    if (options.r) {
      chainedTransforms.push(`r-${options.r}`);
    }
  }

  // Build Output Params
  let outputParams = '';

  // If we have transforms, build list
  if (transforms.length) {
    outputParams = `${outputParams}${transforms.join(',')}`;
  }

  // If we have chainedTransforms, build list
  if (chainedTransforms.length) {
    // Only include chain operator if we have previous transforms
    if (transforms.length) {
      outputParams = `${outputParams}:`;
    }
    outputParams = `${outputParams}${chainedTransforms.join(',')}`;
  }

  // We use query params transforms over path transform for ImageKit
  return `${image.url}?tr=dpr-${dpr}${outputParams ? `,${outputParams}` : ''}`;
};
