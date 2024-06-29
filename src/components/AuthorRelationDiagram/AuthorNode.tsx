import { AuthorSidePeek } from '@components/AuthorSidePeek';
import { AuthorServerModel } from '@models/author';
import { PlusIcon } from '@radix-ui/react-icons';
import { Avatar, Card, IconButton, Text } from '@radix-ui/themes';
import { memo, useEffect, useState } from 'react';
import {
  Handle,
  NodeProps,
  Position,
  useNodesState,
  useReactFlow,
} from 'reactflow';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';

interface AuthorNodeProps extends NodeProps {
  data: AuthorServerModel;
}

function AuthorNode({ selected, data }: AuthorNodeProps) {
  const [isOpenAuthorSidePeek, setIsOpenAuthorSidePeek] = useState(false);
  // console.log({ selected });

  // useEffect(() => {
  //   if (selected) {
  //     reactflow.setNodes([]);
  //   }
  // }, [selected]);

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        className={css({ visibility: 'hidden' })}
      />

      <HStack>
        <HStack
          className={css({
            width: '240px',
            cursor: 'pointer',

            borderRadius: '8px',
            border: selected ? '1px solid brown' : '1px solid lightgray',
            padding: '10px',

            backgroundColor: 'white',
          })}
          onPointerUp={() => {
            setIsOpenAuthorSidePeek(true);
          }}
        >
          <Avatar src={data.image_url} fallback="니체" radius="full" />
          <VStack gap="0" alignItems="start">
            <Text className={css({ color: 'black' })} weight="bold" size="2">
              {data.name}
            </Text>
            <Text size="1" color="gray">
              {data.name_in_kor}
            </Text>
          </VStack>
        </HStack>
      </HStack>

      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        className={css({ visibility: 'hidden' })}
      />
      {/* <AuthorSidePeek
        authorId={data.id}
        open={isOpenAuthorSidePeek}
        onOpenChange={setIsOpenAuthorSidePeek}
      /> */}
    </>
  );
}

export default AuthorNode;
