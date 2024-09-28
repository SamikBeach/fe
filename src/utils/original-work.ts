import { OriginalWorkServerModel } from '@models/original-work';

interface GetPublicationDateTextParams {
  originalWork: OriginalWorkServerModel;
  locale?: string;
}

export function getPublicationDateText({
  originalWork,
  locale = 'en',
}: GetPublicationDateTextParams) {
  const { publication_date, publication_date_is_bc, century, circa, s } =
    originalWork;

  // const hasFromTo = publication_date?.includes('-');

  // const prefixCirca = circa == 1 ? (locale === 'ko' ? '약' : 'about ') : '';
  // const prefix =
  //   publication_date_is_bc == 1 && locale === 'ko' ? '기원전 ' : '';

  // const suffix =
  //   publication_date_is_bc == 1 && locale === 'en'
  //     ? ' BCE'
  //     : century == 1
  //       ? ' C'
  //       : '';
  // const suffixS =
  //   locale === 'ko' ? (s === 1 ? '년대' : '년') : s === 1 ? 's' : '';

  // if (hasFromTo) {
  //   const splitPublicationDate = publication_date?.split('-');
  //   const from = splitPublicationDate?.[0];
  //   const to = splitPublicationDate?.[1];

  //   return `${prefix}${prefixCirca}${from}${suffix}${suffixS} - ${prefix}${prefixCirca}${to}${suffix}${suffixS}`;
  // }

  // return `${prefix}${prefixCirca}${publication_date}${suffix}${suffixS}`;

  if (locale === 'ko') {
  }
}
