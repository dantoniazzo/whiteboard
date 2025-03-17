import { getStage } from "_features/stage";
import { Stage } from "konva/lib/Stage";
import { Node } from "konva/lib/Node";
import { Transformer } from "konva/lib/shapes/Transformer";

export const getTransformer = () => {
  const stage = getStage();
  if (stage) {
    return findTransformerOnStage(stage);
  }
};

export const findTransformerOnStage = (stage: Stage): Transformer => {
  const [transformer] = stage.find((node: Node) => {
    // string 'Transformer' is the default Konva class name of the Transformer
    return node.className === "Transformer";
  });
  return transformer as Transformer;
};
