import { LucideIcon } from "lucide-react"

export interface MetricData {
  title: string
  value: number
  unit: string
  iconType: LucideIcon
  minValue?: number
  maxValue?: number
  color?: string
  showRadial?: boolean
}

export const standardRanges = {
  'api537': {
    'r_LF_0_5': { min: 150, max: 250 },
    'r_LF_1_0': { min: 50, max: 150 },
    'r_LF_2_0': { min: 10, max: 50 }
  },
  'epa': {
    'r_LF_0_5': { min: 120, max: 220 },
    'r_LF_1_0': { min: 40, max: 120 },
    'r_LF_2_0': { min: 8, max: 30 }
  },
  'industry': {
    'r_LF_0_5': { min: 100, max: 300 },
    'r_LF_1_0': { min: 30, max: 150 },
    'r_LF_2_0': { min: 5, max: 40 }
  }
} as const

export const standardInfo = {
  api537: {
    title: "API 537 Standard",
    description: `API Standard 537 provides comprehensive guidelines for the safe and efficient operation of flare systems in refineries and petrochemical facilities. It covers:

• Flare system design principles
• Safety considerations and requirements
• Performance criteria and monitoring
• Operational best practices
• Maintenance recommendations

The ranges specified in API 537 are based on extensive industry experience and research, providing a reliable framework for flare system evaluation and compliance.`
  },
  epa: {
    title: "EPA Guidelines",
    description: `The Environmental Protection Agency (EPA) guidelines for flare operations focus on environmental protection and emissions control. Key aspects include:

• Emissions monitoring requirements
• Environmental impact assessment
• Compliance reporting procedures
• Performance standards
• Air quality management

These guidelines are designed to ensure flare operations meet environmental regulations while maintaining operational efficiency.`
  },
  industry: {
    title: "Industry Studies",
    description: `Industry studies represent aggregated data from various sources including:

• Academic research findings
• Field measurements and observations
• Operational data from multiple facilities
• Peer-reviewed publications
• Industry consortium studies

These studies provide real-world insights into flare performance across different operational conditions and configurations.`
  }
}
