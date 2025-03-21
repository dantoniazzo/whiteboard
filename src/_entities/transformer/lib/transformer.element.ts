import { getStage } from '_entities/stage';
import { Node } from 'konva/lib/Node';
import { TRANSFORMER_KEY } from './transformer.constants';
import { Transformer } from 'konva/lib/shapes/Transformer';

export const getTransformerId = () => {
  return 'transformer';
};

export const getTransformer = () => {
  const stage = getStage();
  if (stage) {
    return findTransformerOnStage();
  }
};

export const findTransformerOnStage = (): Transformer | undefined => {
  const stage = getStage();
  if (!stage) return;
  const [transformer] = stage.find((node: Node) => {
    return node.className === TRANSFORMER_KEY;
  });
  return transformer as Transformer;
};
