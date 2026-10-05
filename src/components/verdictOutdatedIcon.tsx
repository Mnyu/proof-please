import { Clock } from 'lucide-react';

const VerdictOutdatedIcon = () => {
  return (
    <div className='flex items-center justify-center h-20 w-20 shrink-0 rounded-full bg-blue-500/80'>
      <Clock className='h-10 w-10 text-white' strokeWidth={2.5} />
    </div>
  );
};

export default VerdictOutdatedIcon;
