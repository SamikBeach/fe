import { filterAtom } from '@atoms/filter';
import { SelectItem } from '@models/common';
import { useAtom } from 'jotai';
import { HStack } from 'styled-system/jsx';
import { FilterType } from './models';
import { css } from 'styled-system/css';
import { Badge, ChevronDownIcon, IconButton, Text } from '@radix-ui/themes';
import { Cross2Icon } from '@radix-ui/react-icons';
import { filterLabelMap } from './utils';
import FilterPopover from './FilterPopover';

interface Props {
  items: SelectItem[];
  filterType: FilterType;
  onValueChange?: (value: string) => void;
}

export default function Filter({ onValueChange, filterType, items }: Props) {
  const [selectedFilters, setSelectedFilters] = useAtom(filterAtom);

  const handleValueChange = (value: string) => {
    if (
      selectedFilters[filterType]
        .map(filter => filter.id)
        .includes(Number(value))
    ) {
      setSelectedFilters({
        ...selectedFilters,
        [filterType]: selectedFilters[filterType]?.filter(
          filter => filter.id !== Number(value)
        ),
      });
    } else {
      setSelectedFilters({
        ...selectedFilters,
        [filterType]: [
          ...(selectedFilters[filterType] || []),
          items.find(item => item.id === Number(value)),
        ],
      });
    }

    onValueChange?.(value);
  };

  return (
    <FilterPopover items={items}>
      <FilterPopover.Trigger>
        <HStack
          className={css({
            backgroundColor: 'white',
            border: '1px solid',
            borderColor: 'gray.300',
            cursor: 'pointer',
            padding: '3px',
            borderRadius: '6px',
            minHeight: '36px',
            width: '100%',

            _hover: {
              borderColor: 'gray.400',

              transition: 'border-color 0.2s',
            },
          })}
          gap="2px"
          flexWrap="wrap"
        >
          {selectedFilters[filterType].length > 0 ? (
            selectedFilters[filterType].map(item => (
              <Badge
                key={item.id}
                size="3"
                className={css({
                  _hover: {
                    backgroundColor: 'gray.200',

                    transition: 'background-color 0.2s',
                  },
                })}
              >
                {item.value}
                <IconButton
                  asChild
                  variant="soft"
                  color="gray"
                  radius="full"
                  size="1"
                  className={css({
                    width: '20px',
                    height: '20px',
                    padding: '3px',
                    bgColor: 'gray.200',

                    _hover: {
                      bgColor: 'gray.300',

                      transition: 'background-color 0.2s',
                    },
                  })}
                  onClick={e => {
                    e.stopPropagation();
                    handleValueChange(String(item.id));
                  }}
                >
                  <Cross2Icon />
                </IconButton>
              </Badge>
            ))
          ) : (
            <HStack px="8px" justify="space-between" width="100%" color="gray">
              <Text size="2">{filterLabelMap[filterType]}</Text>
              <ChevronDownIcon />
            </HStack>
          )}
        </HStack>
      </FilterPopover.Trigger>
    </FilterPopover>
  );
}
