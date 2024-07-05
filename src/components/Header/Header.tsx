'use client';

import { Flex } from '@radix-ui/themes';
import { styled } from 'styled-system/jsx';

import RightSlot from './RightSlot/RightSlot';
import LeftSlot from './LeftSlot/LeftSlot';
import { HEADER_HEIGHT } from '@constants/common';

export default function Header() {
  return (
    <StyledHeader>
      <Flex align="center" width="100%" height="100%" justify="between">
        <LeftSlot />
        <RightSlot />
      </Flex>
    </StyledHeader>
  );
}

Header.RightSlot = RightSlot;

const StyledHeader = styled('header', {
  base: {
    height: HEADER_HEIGHT,
    backgroundColor: 'white',
    borderBottom: '1px solid',
    borderColor: 'gray.200',
    width: '100%',
    px: '20px',

    position: 'fixed',
    top: '0px',

    zIndex: 3,
  },
});
