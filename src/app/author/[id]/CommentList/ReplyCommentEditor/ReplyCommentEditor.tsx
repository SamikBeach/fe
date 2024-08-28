import { Button, TextArea } from '@radix-ui/themes';
import { useState } from 'react';
import { css } from 'styled-system/css';
import { VStack } from 'styled-system/jsx';

interface Props {
  onSubmit: ({ comment }: { comment: string }) => void;
}

export default function ReplyCommentEditor({ onSubmit }: Props) {
  const [comment, setComment] = useState('');

  return (
    <VStack
      left="0px"
      bottom="0px"
      bgColor="white"
      zIndex={2}
      position="relative"
      width="100%"
      pl="100px"
    >
      <TextArea
        value={comment}
        onChange={e => setComment(e.target.value)}
        className={css({
          width: '100%',
          minHeight: '20px',
          height: '34px',
          pr: '80px',
        })}
        onKeyDown={e => {
          if (e.metaKey && e.key === 'Enter') {
            onSubmit({ comment });
            setComment('');
          }
        }}
      />
      <Button
        onClick={() => {
          onSubmit({ comment });
          setComment('');
        }}
        size="1"
        variant="outline"
        className={css({
          cursor: 'pointer',
          position: 'absolute',
          right: '5px',
          bottom: '5px',
        })}
      >
        Submit
      </Button>
    </VStack>
  );
}
