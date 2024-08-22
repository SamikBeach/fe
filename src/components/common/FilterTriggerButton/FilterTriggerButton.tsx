import { Cross2Icon } from '@radix-ui/react-icons';
import { Button, ChevronDownIcon } from '@radix-ui/themes';
import { css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';

interface Props {
  value?: string | null;
  onClear: () => void;
}
export default function FilterTriggerButton({ value, onClear }: Props) {
  return (
    <Button
      variant="outline"
      className={css({
        cursor: 'pointer',

        color: value === null ? 'gray' : 'black',
        gap: '4px',
      })}
    >
      {value === null ? 'Field' : value}
      {value === null ? (
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
}
