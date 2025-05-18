
interface SparkGaugeProps {
  value: number;
  min: number;
  max: number;
  width?: number;
  height?: number;
}

export function SparkGauge({ value, min, max, width = 140, height = 70 }: SparkGaugeProps) {
  const normalizedValue = Math.min(Math.max(value, min), max);
  const percentage = ((normalizedValue - min) / (max - min)) * 100;
  
  // SVG parameters
  const strokeWidth = 8;
  const radius = (height - strokeWidth) * 0.8;
  const centerX = width / 2;
  const centerY = height - strokeWidth;

  // Calculate the arc path
  const describeArc = (percentage: number) => {
    const angleStart = Math.PI;
    const angleEnd = Math.PI * (1 - percentage / 100);
    
    const startX = centerX + radius * Math.cos(angleStart);
    const startY = centerY + radius * Math.sin(angleStart);
    const endX = centerX + radius * Math.cos(angleEnd);
    const endY = centerY + radius * Math.sin(angleEnd);
    
    const largeArcFlag = percentage > 50 ? 1 : 0;
    
    return `
      M ${startX} ${startY}
      A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}
    `;
  };

  return (
    <div className="relative w-full flex justify-center" style={{ height }}>
      <svg 
        width={width} 
        height={height}
        className="overflow-visible"
      >
        {/* Background track */}
        <path
          d={describeArc(100)}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className="text-muted opacity-20"
        />
        
        {/* Value indicator */}
        <path
          d={describeArc(percentage)}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className="text-primary transition-all duration-500"
        />

        {/* Value text */}
        <text
          x={centerX}
          y={centerY - radius/2}
          textAnchor="middle"
          className="fill-current text-sm font-medium"
        >
          {value.toFixed(1)}
        </text>

        {/* Min value */}
        <text
          x={centerX - radius}
          y={centerY + 16}
          textAnchor="middle"
          className="fill-muted-foreground text-[10px]"
        >
          {min}
        </text>

        {/* Max value */}
        <text
          x={centerX + radius}
          y={centerY + 16}
          textAnchor="middle"
          className="fill-muted-foreground text-[10px]"
        >
          {max}
        </text>
      </svg>
    </div>
  );
}
