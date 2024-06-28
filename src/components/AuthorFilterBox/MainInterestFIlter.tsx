import { getAllMainInterests } from '@apis/main_interest';
import { selectedMainInterestIdAtom } from '@atoms/filter';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { css } from 'styled-system/css';

function MainInterestFIlter() {
  const setSelectedMainInterestId = useSetAtom(selectedMainInterestIdAtom);

  const { data: mainInterest = [] } = useQuery({
    queryKey: ['mainInterest'],
    queryFn: getAllMainInterests,
    select: response => response.data,
  });

  return (
    <Select.Root
      onValueChange={value => setSelectedMainInterestId(Number(value))}
    >
      <Select.Trigger
        className={css({
          cursor: 'pointer',
          zIndex: 2,
        })}
        placeholder="Pick a mainInterest"
      />
      <Select.Content side="bottom" position="popper">
        <Select.Group>
          <Select.Label>MainInterest</Select.Label>
          {mainInterest
            .sort((a, b) => a.main_interest.localeCompare(b.main_interest))
            .map(_mainInterest => (
              <Select.Item
                key={_mainInterest.id}
                value={String(_mainInterest.id)}
              >
                {_mainInterest.main_interest}
              </Select.Item>
            ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

export default MainInterestFIlter;
