import { Ruler, Percent, ArrowUpRight, Waves } from "lucide-react"
import type { MetricData } from "./flare-analysis"
import { standardRanges } from "./flare-analysis"

export const flareDimensions: MetricData[] = [
  { 
    title: "Flame Length", 
    value: 45.8, 
    unit: "m",
    iconType: Ruler
  },
  { 
    title: "Flame Radiated Fraction", 
    value: 32.5, 
    unit: "%",
    iconType: Percent
  },
  { 
    title: "Flame Tilt", 
    value: 15.3, 
    unit: "degrees",
    iconType: ArrowUpRight
  },
]

export const getRadiantHeatFlux = (standard: keyof typeof standardRanges): MetricData[] => [
  { 
    title: "Max RHF at r/LF=0.5", 
    value: 180.4, 
    unit: "kW/m²",
    iconType: Waves,
    minValue: standardRanges[standard].r_LF_0_5.min,
    maxValue: standardRanges[standard].r_LF_0_5.max,
    color: "hsl(346, 77%, 49%)", // Red
    showRadial: true
  },
  { 
    title: "Max RHF at r/LF=1.0", 
    value: 95.7, 
    unit: "kW/m²",
    iconType: Waves,
    minValue: standardRanges[standard].r_LF_1_0.min,
    maxValue: standardRanges[standard].r_LF_1_0.max,
    color: "hsl(21, 83%, 53%)", // Orange
    showRadial: true
  },
  { 
    title: "Max RHF at r/LF=2.0", 
    value: 22.3, 
    unit: "kW/m²",
    iconType: Waves,
    minValue: standardRanges[standard].r_LF_2_0.min,
    maxValue: standardRanges[standard].r_LF_2_0.max,
    color: "hsl(198, 93%, 60%)", // Blue
    showRadial: true
  },
]
