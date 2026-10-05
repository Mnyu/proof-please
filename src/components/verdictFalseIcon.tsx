import { X } from 'lucide-react';

const VerdictFalseIcon = () => {
  return (
    <div className='flex items-center justify-center h-20 w-20 shrink-0 rounded-full bg-red-500/80'>
      <X className='h-10 w-10 text-white' strokeWidth={3} />
    </div>
  );
};

export default VerdictFalseIcon;
