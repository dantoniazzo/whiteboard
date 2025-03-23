import { getDataAttribute, setDataAttribute } from '_shared';
import { getLeftRailElement } from '../lib/left-rail.element';
import { LeftRailAttributes } from '../lib';

export const openLeftRail = () => {
  const leftRail = getLeftRailElement();
  if (leftRail) {
    setDataAttribute(leftRail, LeftRailAttributes.OPEN, 'true');
  }
};

export const closeLeftRail = () => {
  const leftRail = getLeftRailElement();
  if (leftRail) {
    setDataAttribute(leftRail, LeftRailAttributes.OPEN, 'false');
  }
};

export const toggleLeftRail = (callback: (isOpen: boolean) => void) => {
  const leftRail = getLeftRailElement();
  if (leftRail) {
    const isOpen =
      getDataAttribute(leftRail, LeftRailAttributes.OPEN) === 'true';
    setDataAttribute(
      leftRail,
      LeftRailAttributes.OPEN,
      isOpen ? 'false' : 'true'
    );
    callback(!isOpen);
  }
};
