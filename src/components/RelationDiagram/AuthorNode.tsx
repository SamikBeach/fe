import { AuthorSidePeek } from '@components/AuthorSidePeek';
import { Avatar, Card, Text } from '@radix-ui/themes';
import { Handle, NodeProps, Position } from 'reactflow';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';

interface AuthorNodeProps extends NodeProps {}

export default function AuthorNode({ selected }: AuthorNodeProps) {
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
            base: {
              cursor: 'pointer',

              '&::after': {
                outline: selected ? '1px solid gray' : 'none',
              },
            },
          })}
        >
          <HStack>
            <Avatar
              src="https://t2.gstatic.com/licensed-image?q=tbn:ANd9GcS3F15vW2p-W1vemKEkViypH0pjICfqHDzzuhC87bVXDYeysTmfYY9tD-M5-UyBr-Uo"
              fallback="니체"
            />
            <VStack gap="0">
              <Text className={css({ color: 'black' })} weight="bold" size="1">
                Friedrich Nietzsche
              </Text>
              <Text size="1" color="gray">
                1844.08.15 - 1900.08.25
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
