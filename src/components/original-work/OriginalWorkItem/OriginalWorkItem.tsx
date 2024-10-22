import { OriginalWorkServerModel } from '@models/original-work';
import { css } from 'styled-system/css';
import { HStack, HstackProps } from 'styled-system/jsx';
import OringinalWorkItemInner from './OriginalWorkItemInner';
import { useRouter } from 'next/navigation';
import { ComponentProps } from 'react';

interface Props extends HstackProps {
  originalWork: OriginalWorkServerModel;
  originalWorkItemInnerProps?: Omit<
    ComponentProps<typeof OringinalWorkItemInner>,
    'originalWork'
  >;
}

export default function OriginalWorkItem({
  originalWork,
  originalWorkItemInnerProps,
  ...props
}: Props) {
  const router = useRouter();

  return (
    <HStack
      border="1px solid"
      borderColor="gray.200"
      padding="16px"
      borderRadius="8px"
      width="386px"
      height="130px"
      className={css({ cursor: 'pointer' })}
      _hover={{ scale: 1.02, bgColor: 'gray.50' }}
      transition="scale 0.1s ease-in-out"
      onClick={() => router.push(`/original-work/${originalWork.id}`)}
      {...props}
    >
      <OringinalWorkItemInner
        originalWork={originalWork}
        {...originalWorkItemInnerProps}
      />
    </HStack>
  );
}
