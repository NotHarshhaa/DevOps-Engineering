/**
 * Responsive typography utilities for fluid text scaling across different viewport sizes
 */

/**
 * Creates a clamp value for fluid typography that scales smoothly between viewport sizes
 *
 * @param minFontSize - The minimum font size in rem
 * @param maxFontSize - The maximum font size in rem
 * @param minViewport - The minimum viewport width in px where scaling starts
 * @param maxViewport - The maximum viewport width in px where scaling stops
 * @returns A CSS clamp function string
 */
export function fluidTypography(
  minFontSize: number,
  maxFontSize: number,
  minViewport: number = 320,
  maxViewport: number = 1280
): string {
  // Calculate the slope for the linear equation (y = mx + b)
  const slope = (maxFontSize - minFontSize) / (maxViewport - minViewport);
  // Calculate the y-intercept
  const yAxisIntersection = -minViewport * slope + minFontSize;

  // Create the CSS clamp function
  return `clamp(${minFontSize}rem, ${yAxisIntersection.toFixed(4)}rem + ${(slope * 100).toFixed(4)}vw, ${maxFontSize}rem)`;
}

/**
 * Predefined responsive typography sizes using fluid scaling
 */
export const responsiveFontSizes = {
  // Heading Sizes
  h1: fluidTypography(2, 3.5),       // 32px to 56px
  h2: fluidTypography(1.75, 2.75),   // 28px to 44px
  h3: fluidTypography(1.5, 2.25),    // 24px to 36px
  h4: fluidTypography(1.25, 1.75),   // 20px to 28px
  h5: fluidTypography(1.125, 1.5),   // 18px to 24px
  h6: fluidTypography(1, 1.25),      // 16px to 20px

  // Body Text Sizes
  body: fluidTypography(1, 1.125),   // 16px to 18px
  small: fluidTypography(0.875, 1),  // 14px to 16px
  xs: fluidTypography(0.75, 0.875),  // 12px to 14px

  // Special Sizes
  display: fluidTypography(2.5, 5),  // 40px to 80px
  jumbo: fluidTypography(3.5, 7),    // 56px to 112px
};

/**
 * Applies a responsive font size to an element
 *
 * @param element - The DOM element to apply the font size to
 * @param sizeKey - The key from responsiveFontSizes or a custom clamp value
 */
export function applyResponsiveSize(
  element: HTMLElement | null,
  sizeKey: keyof typeof responsiveFontSizes | string
): void {
  if (!element) return;

  const fontSize = (responsiveFontSizes as Record<string, string>)[sizeKey] || sizeKey;
  element.style.fontSize = fontSize;
}

/**
 * Creates a CSS custom property value for responsive line height
 * that maintains better proportions across different font sizes
 *
 * @param minLineHeight - The minimum line height value (unitless)
 * @param maxLineHeight - The maximum line height value (unitless)
 * @param minFontSize - The minimum font size in rem
 * @param maxFontSize - The maximum font size in rem
 * @returns A CSS clamp function string for line height
 */
export function fluidLineHeight(
  minLineHeight: number,
  maxLineHeight: number,
  minFontSize: number = 1,
  maxFontSize: number = 3
): string {
  // Smaller font sizes need more line height, larger need less
  // This creates an inverse relationship between font size and line height
  const slope = (minLineHeight - maxLineHeight) / (maxFontSize - minFontSize);
  const yAxisIntersection = minLineHeight - slope * minFontSize;

  return `clamp(${maxLineHeight}, ${yAxisIntersection.toFixed(4)} + ${(slope * 100).toFixed(4)}vw, ${minLineHeight})`;
}

/**
 * Predefined responsive line heights
 */
export const responsiveLineHeights = {
  tight: fluidLineHeight(1.2, 1.4),
  normal: fluidLineHeight(1.4, 1.6),
  relaxed: fluidLineHeight(1.6, 1.8),
  loose: fluidLineHeight(1.8, 2),
};

/**
 * Dynamically adjusts letter-spacing based on font size to improve readability
 *
 * @param fontSize - Font size in rem
 * @returns Appropriate letter-spacing value in em
 */
export function calculateLetterSpacing(fontSize: number): string {
  // Larger text generally needs tighter letter spacing
  if (fontSize >= 3) return '-0.02em';
  if (fontSize >= 2) return '-0.01em';
  if (fontSize >= 1.5) return '-0.005em';
  if (fontSize >= 1) return '0em';

  // Smaller text often benefits from slightly increased spacing
  return '0.01em';
}

/**
 * Applies all responsive typography settings to an element
 *
 * @param element - The DOM element to style
 * @param size - Font size key or custom value
 * @param lineHeight - Line height key or custom value
 */
export function applyResponsiveTypography(
  element: HTMLElement | null,
  size: keyof typeof responsiveFontSizes | string,
  lineHeight: keyof typeof responsiveLineHeights | string = 'normal'
): void {
  if (!element) return;

  const fontSize = (responsiveFontSizes as Record<string, string>)[size] || size;
  const lineHeightValue = (responsiveLineHeights as Record<string, string>)[lineHeight] || lineHeight;

  element.style.fontSize = fontSize;
  element.style.lineHeight = lineHeightValue;

  // Extract the base font size from the clamp function for letter spacing calculation
  const baseFontSize = parseFloat(size.includes('rem') ? size : '1');
  element.style.letterSpacing = calculateLetterSpacing(baseFontSize);
}
