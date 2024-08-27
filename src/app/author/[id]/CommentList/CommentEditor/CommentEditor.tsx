import { Button, TextArea } from '@radix-ui/themes';
import { useState } from 'react';
import { css } from 'styled-system/css';
import { VStack } from 'styled-system/jsx';

interface Props {
  onSubmit: ({ comment }: { comment: string }) => void;
}

export default function CommentEditor({ onSubmit }: Props) {
  const [comment, setComment] = useState('');

  return (
    <VStack alignItems="end" width="100%">
      <TextArea
        value={comment}
        onChange={e => setComment(e.target.value)}
        className={css({ width: '100%' })}
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
        size="2"
        variant="outline"
        className={css({ cursor: 'pointer' })}
      >
        Submit
      </Button>
    </VStack>
  );
}
