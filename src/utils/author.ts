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

export function getBornDateText({
  bornDate,
  bornDateIsBc,
  locale = 'en',
}: {
  bornDate?: string | null;
  bornDateIsBc: boolean;
  locale?: string;
}) {
  const splitBornDate = bornDate?.split('-');

  return `${bornDateIsBc ? (locale === 'ko' ? '기원전 ' : 'BC ') : ''}${
    !isNil(bornDate) && getIsValidDateString(bornDate)
      ? format(new Date(bornDate), locale === 'ko' ? 'y년 M월 d일' : 'd MMMM y')
      : splitBornDate?.[1] === '00'
        ? `${splitBornDate[0]}${locale === 'ko' ? '년' : ''}`
        : '???'
  }`;
}

export function getDiedDateText({
  diedDate,
  diedDateIsBc,
  locale,
}: {
  diedDate?: string | null;
  diedDateIsBc: boolean;
  locale?: string;
}) {
  const splitDiedDate = diedDate?.split('-');

  return `${diedDateIsBc ? (locale === 'ko' ? '기원전 ' : 'BC ') : ''}${
    !isNil(diedDate) && getIsValidDateString(diedDate)
      ? format(new Date(diedDate), locale === 'ko' ? 'y년 M월 d일' : 'd MMMM y')
      : splitDiedDate?.[1] === '00'
        ? `${splitDiedDate[0]}${locale === 'ko' ? '년' : ''}`
        : '???'
  }`;
}

export function getBornAndDiedDateText({
  bornDate,
  diedDate,
  bornDateIsBc,
  diedDateIsBc,
  locale = 'en',
}: {
  bornDate?: string | null;
  diedDate?: string | null;
  bornDateIsBc: boolean;
  diedDateIsBc: boolean;
  locale?: string;
}) {
  return `${getBornDateText({
    bornDate,
    bornDateIsBc,
    locale,
  })} - ${getDiedDateText({
    diedDate,
    diedDateIsBc,
    locale,
  })}`;
}

export function getCenturyByDate(date: string) {
  const bornYear = date.split('-')[0];

  return Math.floor(Number(bornYear) / 100) + 1;
}
