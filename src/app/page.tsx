import { useTranslations } from 'next-intl';
import Home from './@home/page';

export default function Page() {
  const t = useTranslations('HomePage');

  return (
    <>
      {t('title')}
      <Home />
    </>
  );
}
