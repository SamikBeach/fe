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

  if (locale === 'ko') {
    const hasFromTo = publication_date?.includes('-');

    const prefix = publication_date_is_bc == 1 ? '기원전 ' : '';
    const prefixCirca = circa == 1 ? '약 ' : '';

    const suffix = century == 1 ? '세기' : s === 1 ? '년대' : '년';

    if (hasFromTo) {
      const splitPublicationDate = publication_date?.split('-');
      const from = splitPublicationDate?.[0];
      const to = splitPublicationDate?.[1];

      return `${prefix}${prefixCirca}${from}${suffix} - ${prefix}${prefixCirca}${to}${suffix}`;
    }

    return `${prefix}${prefixCirca}${publication_date}${suffix}`;
  }

  if (locale === 'en') {
    const hasFromTo = publication_date?.includes('-');

    const prefixCirca = circa == 1 ? 'about ' : '';
    const prefix = publication_date_is_bc == 1 ? 'BC ' : '';

    const suffix = century == 1 ? 'C' : s === 1 ? 's' : '';

    if (hasFromTo) {
      const splitPublicationDate = publication_date?.split('-');
      const from = splitPublicationDate?.[0];
      const to = splitPublicationDate?.[1];

      return `${prefixCirca}${prefix}${from}${suffix} - ${prefixCirca}${prefix}${to}${suffix}`;
    }

    return `${prefixCirca}${prefix}${publication_date}${suffix}`;
  }
}
