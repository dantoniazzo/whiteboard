import { getLeftRailId, LEFT_RAIL_OPEN_ATTR_NAME } from '../lib';
import { LeftRailToggle } from './LeftRailToggle';
export const LeftRail = () => {
  return (
    <div
      {...{ [`data-${LEFT_RAIL_OPEN_ATTR_NAME}`]: 'false' }}
      id={getLeftRailId()}
      className={`absolute top-0 left-0 data-[${LEFT_RAIL_OPEN_ATTR_NAME}=false]:-translate-x-full transition w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 h-full bg-red-500`}
    >
      <LeftRailToggle />
    </div>
  );
};
