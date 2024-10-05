import { useTranslations } from 'next-intl';
import { HStack } from 'styled-system/jsx';
import { Text } from '@radix-ui/themes';
import { css } from 'styled-system/css';

interface Props {
  type: 'author' | 'original_work' | 'edition';
}

export default function LikeHistoryEmpty({ type }: Props) {
  const t = useTranslations('Common');

  return (
    <HStack>
      <Text className={css({ color: 'gray.400' })} size="2" weight="medium">
        {t('like_empty_history', {
          type: t(type),
        })}
      </Text>
    </HStack>
  );
}
