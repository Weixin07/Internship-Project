import * as GeneralHelper from '../../helper/GeneralHelper';

export const useFkcAbout = () => {

  const pregAppOnPressed = () => {
    GeneralHelper.openUrl(Platform.OS === 'ios'
    ? 'https://apps.apple.com/us/app/my-pregnancy-calculator/id636470555'
    : 'https://play.google.com/store/apps/details?id=com.ecare.pregnancycalculator2');
  };

  const mmdOnPressed = () => {
    GeneralHelper.openUrl(
      Platform.OS === 'ios'
      ? 'https://apps.apple.com/us/app/my-menstrual-diary/id533701901'
      : 'https://play.google.com/store/apps/details?id=com.ecare.menstrualdiary&hl=en'
    )
  };

  return {
    pregAppOnPressed,
    mmdOnPressed,
  };
};