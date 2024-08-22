'use client';

import FeedList from './FeedList';
import RightSide from './RightSide';
import LeftSide from './LeftSide';
import { HStack } from 'styled-system/jsx';

export default function Home() {
  return (
    <HStack justify="center" alignItems="start" minHeight="100vh" gap="30px">
      <LeftSide />
      <FeedList />
      <RightSide />
    </HStack>
  );
}
