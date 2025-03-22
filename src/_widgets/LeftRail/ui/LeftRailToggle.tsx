import { toggleLeftRail } from '../model';

export const LeftRailToggle = () => {
  return (
    <div
      onClick={toggleLeftRail}
      className="absolute top-0 right-0 translate-x-full w-10 h-10 bg-green-100"
    />
  );
};
