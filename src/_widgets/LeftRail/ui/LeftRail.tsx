import { LeftRailToggle } from './LeftRailToggle';
export const LeftRail = () => {
  return (
    <div className="absolute top-0 left-0 -translate-x-full w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 h-full bg-red-500">
      <LeftRailToggle />
    </div>
  );
};
