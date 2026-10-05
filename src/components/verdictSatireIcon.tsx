import { cn } from 'cn';
import { MessageCircle } from 'lucide-react';

interface VerdictSatireIconProps {
  className?: string;
}

const VerdictSatireIcon = ({ className }: VerdictSatireIconProps) => {
  return (
    <div className={cn('flex size-10 shrink-0 items-center justify-center rounded-full bg-violet-500/80', className)}>
      <MessageCircle className='size-1/2 text-white' strokeWidth={3} />
    </div>
  );
};

export default VerdictSatireIcon;
