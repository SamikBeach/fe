import { Cross2Icon } from '@radix-ui/react-icons';
import { Button, ChevronDownIcon } from '@radix-ui/themes';
import { isNil } from 'lodash';
import { forwardRef } from 'react';
import { css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';

interface Props {
  value?: string | null;
  label: string;
  onClear: () => void;
}

const FilterTriggerButton = forwardRef<HTMLButtonElement, Props>(function (
  { value, label, onClear }: Props,
  ref
) {
  return (
    <Button
      ref={ref}
      variant="outline"
      className={css({
        cursor: 'pointer',
        color: isNil(value) ? 'gray' : 'black',
        gap: '4px',
      })}
    >
      {isNil(value) ? label : value}
      {isNil(value) ? (
        <ChevronDownIcon />
      ) : (
        <HStack
          borderRadius="50%"
          _hover={{ bgColor: 'gray.200' }}
          padding="4px"
          onPointerDown={e => {
            e.stopPropagation();

            onClear();
          }}
        >
          <Cross2Icon />
        </HStack>
      )}
    </Button>
  );
});

export default FilterTriggerButton;
