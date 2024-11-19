/**
 * Clamp calculator for responsive font sizes: https://utopia.fyi/clamp/calculator/?a=430,1280,16%E2%80%9413
 * Mobile (max-width: 430px) scale peak at 16px, desktop (min-width: 1280px) scale peak at 13px
 * */

export const fontClampFormula = {
  mobile_16_desktop_13: 'clamp(0.8125rem, 1.0949rem + -0.3529vi, 1rem)',
  mobile_16_desktop_14: 'clamp(0.875rem, 1.0632rem + -0.2353vi, 1rem)',
  mobile_14_desktop_13: 'clamp(0.8125rem, 0.9066rem + -0.1176vi, 0.875rem)',
};
