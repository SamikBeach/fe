import { Avatar, Card, Text } from '@radix-ui/themes';
import { VStack } from 'styled-system/jsx';
import { hstack } from 'styled-system/patterns';

export default function PhilosopherNode() {
  return (
    <Card className={hstack()}>
      <Avatar fallback="니" />
      <VStack>
        <Text>니체</Text>
        <Text>니체는 블라블라</Text>
      </VStack>
    </Card>
  );
}
