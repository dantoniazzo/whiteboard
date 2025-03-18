export const getToolbarId = () => "toolbar";
export const getToolbarElement = () => {
  return document.getElementById(getToolbarId());
};

export const getTool = () => {
  return getToolbarElement()?.getAttribute("data-tool");
};
