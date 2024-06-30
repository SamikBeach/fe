import { AuthorServerModel } from '@models/author';
import { HStack, VStack } from 'styled-system/jsx';
import { Text } from '@radix-ui/themes';
import { AuthorAvatar } from '@components/AuthorAvatar';

interface Props {
  influenceds?: AuthorServerModel[];
}

export default function InfluencedList({ influenceds = [] }: Props) {
  return (
    influenceds.length > 0 && (
      <VStack gap="4px" alignItems="start">
        <Text size="1" color="gray">
          Influenced to
        </Text>
        <HStack gap="4px">
          {influenceds
            ?.slice(0, 3)
            .map(influenced => <AuthorAvatar size="1" author={influenced} />)}
          +{influenceds?.slice(3).length}
        </HStack>
      </VStack>
    )
  );
}
