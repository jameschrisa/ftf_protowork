/**
 * Generate a random number between min and max (inclusive)
 */
export function getRandomInRange(min: number, max: number): number {
  return Number((Math.random() * (max - min) + min).toFixed(1))
}

/**
 * Generate random flare dimensions data
 */
export function generateFlareDimensions() {
  return {
    flameLength: getRandomInRange(30, 60),
    radiatedFraction: getRandomInRange(25, 40),
    flameTilt: getRandomInRange(10, 20)
  }
}

/**
 * Generate random heat flux data within the specified ranges
 */
export function generateHeatFluxData(ranges: {
  r_LF_0_5: { min: number; max: number }
  r_LF_1_0: { min: number; max: number }
  r_LF_2_0: { min: number; max: number }
}) {
  return {
    r_LF_0_5: getRandomInRange(ranges.r_LF_0_5.min, ranges.r_LF_0_5.max),
    r_LF_1_0: getRandomInRange(ranges.r_LF_1_0.min, ranges.r_LF_1_0.max),
    r_LF_2_0: getRandomInRange(ranges.r_LF_2_0.min, ranges.r_LF_2_0.max)
  }
}
