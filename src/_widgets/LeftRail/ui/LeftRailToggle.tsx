import { toggleLeftRail } from '../model';
import { Button } from '_shared';
import { ArrowLeftToLine, ArrowRightFromLine } from 'lucide-react';
import { useState } from 'react';

export const LeftRailToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Button
      onClick={() => toggleLeftRail((isOpen) => setIsOpen(isOpen))}
      classNames="absolute top-0 right-0 translate-x-full w-10 h-10"
    >
      {isOpen ? <ArrowLeftToLine /> : <ArrowRightFromLine />}
    </Button>
  );
};
