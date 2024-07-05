import { getAllMainInterests } from '@apis/main_interest';
import { selectedMainInterestIdAtom } from '@atoms/filter';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { ComponentProps } from 'react';
import { css } from 'styled-system/css';

interface Props extends ComponentProps<typeof Select.Root> {}

function MainInterestFilter({ onValueChange, ...props }: Props) {
  const setSelectedMainInterestId = useSetAtom(selectedMainInterestIdAtom);

  const { data: mainInterests = [] } = useQuery({
    queryKey: ['mainInterest'],
    queryFn: getAllMainInterests,
    select: response => response.data,
  });

  const handleValueChange = (value: string) => {
    setSelectedMainInterestId(Number(value));

    onValueChange?.(value);
  };

  return (
    <Select.Root onValueChange={handleValueChange} {...props}>
      <Select.Trigger
        className={css({
          cursor: 'pointer',
          zIndex: 2,
          backgroundColor: 'white',
        })}
        placeholder="Pick a mainInterest"
      />
      <Select.Content side="bottom" position="popper">
        <Select.Group>
          <Select.Label>MainInterest</Select.Label>
          {mainInterests
            .sort((a, b) => a.main_interest.localeCompare(b.main_interest))
            .map(mainInterest => (
              <Select.Item
                key={mainInterest.id}
                value={String(mainInterest.id)}
              >
                {mainInterest.main_interest}
              </Select.Item>
            ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

export default MainInterestFilter;
