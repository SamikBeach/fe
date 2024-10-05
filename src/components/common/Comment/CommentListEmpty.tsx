import { HStack } from 'styled-system/jsx';
import { Text } from '@radix-ui/themes';
import { useTranslations } from 'next-intl';

export default function CommentListEmpty() {
  const t = useTranslations('Common');

  return (
    <HStack
      width="100%"
      height="calc(100vh - 390px)"
      justify="center"
      alignItems="center"
      color="gray.400"
    >
      <Text>{t('comment_list_empty')}</Text>
    </HStack>
  );
}
