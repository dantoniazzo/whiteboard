import { getLayer } from '_entities/layer';

export const findNode = (id: string) => {
  const layer = getLayer();
  if (layer) {
    return layer.findOne(`#${id}`);
  }
};
