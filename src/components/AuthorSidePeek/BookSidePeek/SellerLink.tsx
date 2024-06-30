import { ScrollArea } from '@radix-ui/themes';
import { VStack } from 'styled-system/jsx';

function SellerLink() {
  return (
    <ScrollArea type="always" scrollbars="vertical">
      <VStack alignItems="flex-start" height="100%">
        구매 링크
      </VStack>
    </ScrollArea>
  );
}

export default SellerLink;
