interface Props {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: { box: 'h-7 w-7', inner: 'rounded-[8px]', text: 'text-[10px] tracking-tight' },
  md: { box: 'h-9 w-9', inner: 'rounded-[9px]', text: 'text-xs tracking-tight' },
  lg: { box: 'h-11 w-11', inner: 'rounded-[10px]', text: 'text-sm tracking-tight' },
};

export default function Logo({ size = 'md', className = '' }: Props) {
  const s = sizes[size];
  return (
    <span
      className={`relative inline-flex ${s.box} items-center justify-center rounded-[10px] bg-gradient-to-br from-neon-purple via-neon-violet to-neon-cyan p-[1.5px] shadow-[0_0_18px_rgba(176,38,255,0.35)] ${className}`}
      aria-label="Mohd Aaquib Rodde"
    >
      <span className={`relative flex h-full w-full items-center justify-center ${s.inner} bg-bg-deep`}>
        <span className={`text-gradient font-display font-bold ${s.text} leading-none`}>MA</span>
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-[3px] right-[5px] h-1 w-1 rounded-full bg-neon-cyan shadow-[0_0_8px_2px_rgba(0,240,255,0.6)]"
        />
      </span>
    </span>
  );
}
