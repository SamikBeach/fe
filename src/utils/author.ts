import { format, isMatch } from 'date-fns';
import { isNil } from 'lodash';

export function getIsValidDateString(bornDate: string) {
  const splitBornDate = bornDate.split('-');
  const isValidBornDate =
    bornDate !== '' &&
    splitBornDate?.[1] !== '00' &&
    splitBornDate?.[2] !== '00';

  return isMatch(bornDate, 'yyyy-MM-dd') && isValidBornDate;
}

export function getBornAndDiedDateText({
  bornDate,
  diedDate,
  bornDateIsBc,
  diedDateIsBc,
}: {
  bornDate?: string | null;
  diedDate?: string | null;
  bornDateIsBc: boolean;
  diedDateIsBc: boolean;
}) {
  return `${bornDateIsBc ? '기원전 ' : ''}${
    !isNil(bornDate) && getIsValidDateString(bornDate)
      ? format(new Date(bornDate), 'y년 M월 d일 ')
      : '???'
  } - ${diedDateIsBc ? '기원전 ' : ''}${
    !isNil(diedDate) && getIsValidDateString(diedDate)
      ? format(new Date(diedDate), 'y년 M월 d일 ')
      : '???'
  }`;
}

export function getCenturyByDate(date: string) {
  const bornYear = date.split('-')[0];

  return getIsValidDateString(date)
    ? Math.floor(Number(bornYear) / 100) + 1
    : null;
}
//
