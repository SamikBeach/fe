import { OriginalWorkServerModel } from '@models/original_work';
import { css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';
import OringinalWorkItemInner from './OriginalWorkItemInner';

interface Props {
  originalWork: OriginalWorkServerModel;
}

export default function OriginalWorkItem({ originalWork }: Props) {
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
    >
      <OringinalWorkItemInner originalWork={originalWork} />
    </HStack>
  );
}
