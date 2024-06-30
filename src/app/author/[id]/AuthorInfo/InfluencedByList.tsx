import { AuthorServerModel } from '@models/author';
import { HStack, VStack } from 'styled-system/jsx';
import { Text } from '@radix-ui/themes';
import { AuthorAvatar } from '@components/AuthorAvatar';

interface Props {
  influencedBys?: AuthorServerModel[];
}

export default function InfluencedByList({ influencedBys = [] }: Props) {
  return (
    influencedBys.length > 0 && (
      <VStack gap="4px" alignItems="start">
        <Text size="1" color="gray">
          InfluencedBy to
        </Text>
        <HStack gap="4px">
          {influencedBys
            ?.slice(0, 3)
            .map(influencedBy => (
              <AuthorAvatar size="1" author={influencedBy} />
            ))}
          +{influencedBys?.slice(3).length}
        </HStack>
      </VStack>
    )
  );
}
