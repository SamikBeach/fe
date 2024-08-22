import { VStack } from 'styled-system/jsx';
import { FeedItem } from './FeedItem';
import FeedItem2 from './FeedItem/FeedItem2';
import FeedItem3 from './FeedItem/FeedItem3';
import FeedItem4 from './FeedItem/FeedItem4';
import FeedItem5 from './FeedItem/FeedItem5';
import FeedItem6 from './FeedItem/FeedItem6';

function FeedList() {
  return (
    <VStack gap="10px" pt="84px">
      <FeedItem />
      <FeedItem2 />
      <FeedItem3 />
      <FeedItem4 />
      <FeedItem5 />
      <FeedItem6 />
      <FeedItem />
      <FeedItem2 />
      <FeedItem3 />
      <FeedItem4 />
      <FeedItem5 />
      <FeedItem6 />
    </VStack>
  );
}

export default FeedList;
