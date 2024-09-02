import { OriginalWorkServerModel } from '@models/original-work';

interface GetPublicationDateTextParams {
  originalWork: OriginalWorkServerModel;
}

export function getPublicationDateText({
  originalWork,
}: GetPublicationDateTextParams) {
  const { publication_date, publication_date_is_bc, century, circa, s } =
    originalWork;

  const hasFromTo = publication_date?.includes('-');

  const prefixCirca = circa == 1 ? 'about ' : '';
  const suffix =
    publication_date_is_bc == 1 ? ' BCE' : century == 1 ? ' C' : '';
  const suffixS = s == 1 ? 's' : '';

  if (hasFromTo) {
    const splitPublicationDate = publication_date?.split('-');
    const from = splitPublicationDate?.[0];
    const to = splitPublicationDate?.[1];

    return `${prefixCirca}${from}${suffix} - ${prefixCirca}${to}${suffix}`;
  }

  return `${prefixCirca}${publication_date}${suffix}${suffixS}`;
}
