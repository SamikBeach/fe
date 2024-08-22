'use client';

import { HStack, styled } from 'styled-system/jsx';

import RightSlot from './RightSlot/RightSlot';
import LeftSlot from './LeftSlot/LeftSlot';

export default function Header() {
  return (
    <StyledHeader>
      <HStack justify="space-between" width="100%" height="100%">
        <LeftSlot />
        <RightSlot />
      </HStack>
    </StyledHeader>
  );
}

const StyledHeader = styled('header', {
  base: {
    position: 'fixed',
    top: '0px',

    height: '64px',
    width: '100%',

    backgroundColor: 'white',
    borderBottom: '1px solid',
    borderColor: 'gray.200',

    px: '20px',

    zIndex: 3,
  },
});
