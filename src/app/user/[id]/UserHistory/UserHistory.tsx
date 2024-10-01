import { useTranslations } from 'next-intl';
import { LikeHistory } from './LikeHistory';
import { SegmentedControl } from '@radix-ui/themes';
import { useState } from 'react';
import { css } from 'styled-system/css';
import { CommentHistory } from './CommentHistory';
import { VStack } from 'styled-system/jsx';

function UserHistory() {
  const t = useTranslations('Common');

  const [selected, setSelected] = useState<'likes' | 'comments'>('likes');

  return (
    <VStack alignItems="start" padding="20px">
      <SegmentedControl.Root
        defaultValue="likes"
        onValueChange={value => setSelected(value as 'likes' | 'comments')}
        size="2"
      >
        <SegmentedControl.Item
          value="likes"
          className={css({ cursor: 'pointer' })}
        >
          {t('likes')}
        </SegmentedControl.Item>
        <SegmentedControl.Item
          value="comments"
          className={css({ cursor: 'pointer' })}
        >
          {t('comments')}
        </SegmentedControl.Item>
      </SegmentedControl.Root>
      {selected === 'likes' ? <LikeHistory /> : <CommentHistory />}
    </VStack>
  );
}

export default UserHistory;
