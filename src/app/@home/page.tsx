'use client';

import LogList from './LogList';
import LeftSide from './LeftSide';
import { HStack } from 'styled-system/jsx';
import { RightSide } from './RightSide';
import { Media } from '@app/media';

export default function Home() {
  return (
    <HStack justify="center" alignItems="start" minHeight="100vh" gap="30px">
      <Media greaterThanOrEqual="lg">
        <LeftSide />
      </Media>
      <LogList />
      <RightSide />
    </HStack>
  );
}
