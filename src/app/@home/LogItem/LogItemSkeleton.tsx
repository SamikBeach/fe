/* eslint-disable react/no-unescaped-entities */
import { Avatar, Skeleton } from '@radix-ui/themes';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';

export default function LogItemSkeleton() {
  return (
    <VStack
      bgColor="white"
      alignItems="start"
      width="100%"
      padding="16px"
      borderRadius="8px"
      border="1px solid"
      borderColor="gray.200"
    >
      <HStack width="100%">
        <Avatar size="2" fallback="" radius="full" mb="4px" />{' '}
        <Skeleton width="100%" height="20px" />
      </HStack>
      <Skeleton width="80%" height="20px" />
      <p
        className={css({
          backgroundColor: ' gray.100',
          height: '60px',
          mt: '10px',
          borderRadius: '8px',
          width: '100%',
        })}
      />
    </VStack>
  );
}
