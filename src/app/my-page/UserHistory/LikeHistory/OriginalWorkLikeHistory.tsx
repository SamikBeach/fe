import { CategoryWrapper } from './styled-components';
import { HStack } from 'styled-system/jsx';
import {
  MOCK_ORIGINAL_WORK1,
  MOCK_ORIGINAL_WORK2,
  MOCK_ORIGINAL_WORK3,
  MOCK_ORIGINAL_WORK4,
  MOCK_ORIGINAL_WORK5,
} from '@constants/mocks';
import { Text } from '@radix-ui/themes';
import { OriginalWorkShort } from '@components/original_work/OriginalWorkShort';

export default function OriginalWorkLikeHistory() {
  return (
    <CategoryWrapper>
      <Text size="2" weight="medium">
        Original works
      </Text>
      <HStack gap="6px" flexWrap="wrap">
        {[
          MOCK_ORIGINAL_WORK1,
          MOCK_ORIGINAL_WORK2,
          MOCK_ORIGINAL_WORK3,
          MOCK_ORIGINAL_WORK4,
          MOCK_ORIGINAL_WORK5,
        ].map(originalWork => (
          <OriginalWorkShort
            key={originalWork.id}
            originalWork={originalWork}
            bgColor="gray.100"
            px="14px"
            py="6px"
            borderRadius="8px"
          />
        ))}
      </HStack>
    </CategoryWrapper>
  );
}
