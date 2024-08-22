import { Button } from '@radix-ui/themes';
import { css } from 'styled-system/css';

interface Props {
  onClickShowSelected: () => void;
  onClickShowAll: () => void;
}

export default function TestButtons({
  onClickShowSelected,
  onClickShowAll,
}: Props) {
  return (
    <>
      <Button
        className={css({
          position: 'absolute',
          top: 200,
          left: 400,
          zIndex: 3,
        })}
        onClick={onClickShowSelected}
      >
        선택된 노드만 보기
      </Button>
      <Button
        className={css({
          position: 'absolute',
          top: 240,
          left: 400,
          zIndex: 3,
        })}
        onClick={onClickShowAll}
      >
        전체 보기
      </Button>
    </>
  );
}
