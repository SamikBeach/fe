'use client';

import { getAllUsers } from '@apis/user';
import { DropdownMenu, Flex, Text } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { styled } from 'styled-system/jsx';

export default function Header() {
  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: getAllUsers,
  });

  console.log({ data });

  return (
    <StyledHeader>
      <Flex align="center" width="100%" height="100%" justify="between">
        <Text>Logo</Text>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <div>Me</div>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item>Id: </DropdownMenu.Item>
            <DropdownMenu.Item>email:</DropdownMenu.Item>
            <DropdownMenu.Item>Sign out</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Flex>
    </StyledHeader>
  );
}

const StyledHeader = styled('header', {
  base: {
    height: '60px',
    backgroundColor: 'gray.200',
    width: '100%',
    px: '20px',
  },
});
