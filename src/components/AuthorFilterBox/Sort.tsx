import { Select } from '@radix-ui/themes';

import { css } from 'styled-system/css';

function Sort() {
  return (
    <Select.Root>
      <Select.Trigger
        className={css({
          cursor: 'pointer',
          zIndex: 2,
        })}
        placeholder="정렬"
      />
      <Select.Content side="bottom" position="popper">
        <Select.Group>
          <Select.Label>정렬</Select.Label>
          {['추천순', '코멘트수', '판매량순', '대여량순'].map(item => (
            <Select.Item key={item} value={String(item)}>
              {item}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

export default Sort;
