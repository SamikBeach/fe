'use client';

import { Flex } from '@radix-ui/themes';
import { styled } from 'styled-system/jsx';
import Logo from './Logo';
import RightSlot from './RightSlot';

export default function Header() {
  return (
    <StyledHeader>
      <Flex align="center" width="100%" height="100%" justify="between">
        <Logo />
        <RightSlot />
      </Flex>
    </StyledHeader>
  );
}

Header.RightSlot = RightSlot;

const StyledHeader = styled('header', {
  base: {
    height: '64px',
    backgroundColor: 'white',
    borderBottom: '1px solid',
    borderColor: 'gray.200',
    width: '100%',
    px: '20px',
  },
});
