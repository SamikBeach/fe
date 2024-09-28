import { CategoryWrapper } from './styled-components';
import { HStack, styled } from 'styled-system/jsx';
import { GiBlackBook } from 'react-icons/gi';
import { Text } from '@radix-ui/themes';
import { css } from 'styled-system/css';
import { useTranslations } from 'next-intl';

export default function EditionLikeHistory() {
  const t = useTranslations('Common');

  return (
    <CategoryWrapper>
      <Text size="2" weight="medium">
        {t('editions')}
      </Text>
      <HStack gap="6px" flexWrap="wrap">
        {[
          'Also sprach Zarathustra',
          'History of the Peoples',
          'Passover Sermon',
          'The Gresham Lectures',
          'Womans Rights',
        ].map(title => (
          <EditionItem key={title} title={title} />
        ))}
      </HStack>
    </CategoryWrapper>
  );
}

function EditionItem({ title }: { title: string }) {
  return (
    <HStack gap="6px" bgColor="gray.100" px="14px" py="6px" borderRadius="8px">
      <GiBlackBook
        className={css({
          display: 'inline',
          cursor: 'pointer',
          color: 'gray.600',
        })}
        size="24px"
      />
      <BoldText>{title}</BoldText>
    </HStack>
  );
}

const BoldText = styled('span', {
  base: {
    fontWeight: 'medium',
    cursor: 'pointer',
    fontSize: '14px',

    _hover: {
      textDecoration: 'underline',
    },
  },
});
