import { AuthorSidePeek } from '@components/AuthorSidePeek';
import { Avatar, Card, Text } from '@radix-ui/themes';
import { memo } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';

export interface NodeData {
  label: string;
  name: string;
  englishName: string;
  src: string;
}

interface AuthorNodeProps extends NodeProps {
  data: NodeData;
}

function AuthorNode({ selected, data }: AuthorNodeProps) {
  return (
    <AuthorSidePeek>
      <AuthorSidePeek.Trigger>
        <Handle
          type="target"
          position={Position.Top}
          id="top"
          className={css({ visibility: 'hidden' })}
        />
        <Card
          className={css({
            width: '240px',
            cursor: 'pointer',

            '&::after': {
              outline: selected ? '1px solid brown' : 'none',
            },
          })}
        >
          <HStack>
            <Avatar src={data.src} fallback="니체" radius="full" />
            <VStack gap="0" alignItems="start">
              <Text className={css({ color: 'black' })} weight="bold" size="2">
                {data.name}
              </Text>
              <Text size="1" color="gray">
                {data.englishName}
              </Text>
            </VStack>
          </HStack>
        </Card>
        <Handle
          type="source"
          position={Position.Bottom}
          id="bottom"
          className={css({ visibility: 'hidden' })}
        />
      </AuthorSidePeek.Trigger>
    </AuthorSidePeek>
  );
}

export default AuthorNode;
