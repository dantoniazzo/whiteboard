import { getLeftRailId, LeftRailAttributes } from '../lib';
import { LeftRailToggle } from './LeftRailToggle';
import { NodeTree } from '_widgets/NodeTree';
import { constructDataAttribute } from '_shared';

export const LeftRail = () => {
  return (
    <div
      {...{ [constructDataAttribute(LeftRailAttributes.OPEN)]: 'false' }}
      id={getLeftRailId()}
      className={`absolute top-0 left-0 data-[left-rail-open=false]:-translate-x-full transition w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 h-full bg-gray-900`}
    >
      <LeftRailToggle />
      <NodeTree />
    </div>
  );
};
