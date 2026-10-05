import { cn } from '@/lib/utils';

interface ConfidenceRingProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  className?: string;

  /**
   * Minimum confidence required for yellow.
   * Default: 50
   */
  yellowThreshold?: number;

  /**
   * Minimum confidence required for green.
   * Default: 75
   */
  greenThreshold?: number;
}

export function ConfidenceRing({
  value,
  size = 100,
  strokeWidth = 6,
  className,
  yellowThreshold = 50,
  greenThreshold = 75,
}: ConfidenceRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const normalizedValue = Math.min(100, Math.max(0, value));

  const offset = circumference - (normalizedValue / 100) * circumference;

  const colorClass =
    normalizedValue >= greenThreshold
      ? 'stroke-emerald-500'
      : normalizedValue >= yellowThreshold
        ? 'stroke-amber-400'
        : 'stroke-red-400';

  return (
    <div className={cn('relative', className)}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className='-rotate-90'>
        {/* Background ring */}
        <circle cx={size / 2} cy={size / 2} r={radius} fill='none' className='stroke-muted' strokeWidth={strokeWidth} />

        {/* Progress ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill='none'
          className={colorClass}
          strokeWidth={strokeWidth}
          strokeLinecap='round'
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>

      {/* Percentage */}
      <div className='absolute inset-0 flex items-center justify-center'>
        <span className='text-xl tracking-tight'>{normalizedValue}%</span>
      </div>
    </div>
  );
}
