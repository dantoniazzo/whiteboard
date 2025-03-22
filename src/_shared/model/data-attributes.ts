export const constructDataAttribute = (attr: string) => {
  return `data-${attr}`;
};

export const getDataAttribute = (element: HTMLElement, attr: string) => {
  return element.getAttribute(constructDataAttribute(attr));
};

export const setDataAttribute = (
  element: HTMLElement,
  attr: string,
  value: string
) => {
  element.setAttribute(constructDataAttribute(attr), value);
};

export const removeDataAttribute = (element: HTMLElement, attr: string) => {
  element.removeAttribute(constructDataAttribute(attr));
};
