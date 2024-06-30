import { isMatch } from 'date-fns';

export function getIsValidDateString(bornDate: string) {
  const splitBornDate = bornDate.split('-');
  const isValidBornDate =
    bornDate !== '' &&
    splitBornDate?.[1] !== '00' &&
    splitBornDate?.[2] !== '00';

  return isMatch(bornDate, 'yyyy-MM-dd') && isValidBornDate;
}
