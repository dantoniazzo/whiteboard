import { getDataAttribute, setDataAttribute } from '_shared';
import {
  getLeftRailElement,
  LEFT_RAIL_OPEN_ATTR_NAME,
} from '../lib/left-rail.element';

export const openLeftRail = () => {
  const leftRail = getLeftRailElement();
  if (leftRail) {
    setDataAttribute(leftRail, LEFT_RAIL_OPEN_ATTR_NAME, 'true');
  }
};

export const closeLeftRail = () => {
  const leftRail = getLeftRailElement();
  if (leftRail) {
    setDataAttribute(leftRail, LEFT_RAIL_OPEN_ATTR_NAME, 'false');
  }
};

export const toggleLeftRail = () => {
  const leftRail = getLeftRailElement();
  if (leftRail) {
    const isOpen =
      getDataAttribute(leftRail, LEFT_RAIL_OPEN_ATTR_NAME) === 'true';
    setDataAttribute(
      leftRail,
      LEFT_RAIL_OPEN_ATTR_NAME,
      isOpen ? 'false' : 'true'
    );
  }
};
