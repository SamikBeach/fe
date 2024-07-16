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
}: {
  bornDate?: string | null;
  bornDateIsBc: boolean;
}) {
  const splitBornDate = bornDate?.split('-');

  return `${bornDateIsBc ? 'BC ' : ''}${
    !isNil(bornDate) && getIsValidDateString(bornDate)
      ? format(new Date(bornDate), 'y년 M월 d일')
      : splitBornDate?.[1] === '00'
        ? `${splitBornDate[0]}년 ?월 ?일`
        : '???'
  }`;
}

export function getDiedDateText({
  diedDate,
  diedDateIsBc,
}: {
  diedDate?: string | null;
  diedDateIsBc: boolean;
}) {
  const splitDiedDate = diedDate?.split('-');

  return `${diedDateIsBc ? 'BC ' : ''}${
    !isNil(diedDate) && getIsValidDateString(diedDate)
      ? format(new Date(diedDate), 'y년 M월 d일')
      : splitDiedDate?.[1] === '00'
        ? `${splitDiedDate[0]}년 ?월 ?일`
        : '???'
  }`;
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
  return `${getBornDateText({
    bornDate,
    bornDateIsBc,
  })} - ${getDiedDateText({
    diedDate,
    diedDateIsBc,
  })}`;
}

export function getCenturyByDate(date: string) {
  const bornYear = date.split('-')[0];

  return Math.floor(Number(bornYear) / 100) + 1;
}
