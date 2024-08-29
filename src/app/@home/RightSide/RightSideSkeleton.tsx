import { VStack, styled } from 'styled-system/jsx';

export default function RightSideSkeleton() {
  return (
    <VStack minWidth="300px" position="sticky" top="0">
      <Section />
    </VStack>
  );
}

const Section = styled(VStack, {
  base: {
    alignItems: 'start',
    width: '100%',
    height: '231px',
    bgColor: 'gray.100',
    borderRadius: '8px',
  },
});
