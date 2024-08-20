'use client';

import { Flex } from '@radix-ui/themes';
import FeedList from './FeedList';
import RightSide from './RightSide';
import LeftSide from './LeftSide';

export default function Home() {
  return (
    <Flex justify="center" minHeight="100vh" py="20px" gap="30px">
      <LeftSide />
      <FeedList />
      <RightSide />
    </Flex>
  );
}
