
interface TireMarkProps {
  value: number;
  maxValue: number;
  minValue: number;
  width?: number;
  height?: number;
}

export function TireMark({ value, maxValue, minValue, width = 120, height = 6 }: TireMarkProps) {
  const percentage = ((value - minValue) / (maxValue - minValue)) * 100;
  
  return (
    <div className="relative" style={{ width, height }}>
      {/* Background track */}
      <div 
        className="absolute inset-0 rounded-full bg-muted/30"
      />
      
      {/* Value indicator */}
      <div 
        className="absolute inset-y-0 left-0 rounded-full bg-primary transition-all duration-500"
        style={{ 
          width: `${percentage}%`,
          boxShadow: '0 0 8px var(--primary)' 
        }}
      />
      
      {/* Markers */}
      <div className="absolute inset-0 flex justify-between px-[2px]">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="w-[2px] h-full bg-background/50"
            style={{
              opacity: i === 0 || i === 4 ? 0 : 0.5
            }}
          />
        ))}
      </div>
    </div>
  );
}
