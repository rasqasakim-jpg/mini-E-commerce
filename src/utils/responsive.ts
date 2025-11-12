import { Dimensions, ScaledSize } from 'react-native';

const { width, height }: ScaledSize = Dimensions.get('window');

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth: number = 375;
const guidelineBaseHeight: number = 812;

const scale = (size: number): number => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number): number => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor: number = 0.5): number => 
  size + (scale(size) - size) * factor;

// Responsive font size
const responsiveFontSize = (size: number): number => {
  const scaledSize = scale(size);
  return Math.round(scaledSize);
};

// Check device orientation
const isLandscape = (): boolean => width > height;

// Screen breakpoints
const breakpoints = {
  small: 375,
  medium: 768,
  large: 1024,
};

// Get number of columns based on screen width
const getColumnCount = (): number => {
  if (width < breakpoints.small) return 2;
  if (width < breakpoints.medium) return 3;
  return 4;
};

export {
  scale,
  verticalScale,
  moderateScale,
  responsiveFontSize,
  isLandscape,
  getColumnCount,
  width as screenWidth,
  height as screenHeight,
};