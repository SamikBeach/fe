import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';

export default getRequestConfig(async () => {
  const header = headers();
  const locale =
    header.get('accept-language')?.split(',')[0].split('-')[0] ?? 'ko';

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
