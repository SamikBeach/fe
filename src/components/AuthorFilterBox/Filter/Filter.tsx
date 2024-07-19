import { filterAtom } from '@atoms/filter';
import {
  Badge,
  ChevronDownIcon,
  IconButton,
  Select,
  Text,
} from '@radix-ui/themes';
import { useAtom } from 'jotai';
import { ComponentProps, useRef, useState } from 'react';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons';
import SearchTextField from './SearchTextField';
import { filterLabelMap } from './utils';
import { FilterType } from './models';
import { SelectItem } from '@models/common';

interface Props extends ComponentProps<typeof Select.Root> {
  items: SelectItem[];
  filterType: FilterType;
}

export default function Filter({
  onValueChange,
  filterType,
  items,
  ...props
}: Props) {
  const [searchValue, setSearchValue] = useState('');
  const [open, setOpen] = useState(false);

  const textFieldRef = useRef<HTMLInputElement>(null);

  const [selectedFilters, setSelectedFilters] = useAtom(filterAtom);

  const searchedItems = items.filter(item =>
    item.value.toLowerCase().includes(searchValue.toLowerCase())
  );

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
    <Select.Root
      open={open}
      onOpenChange={opened => {
        if (opened) {
          setTimeout(() => {
            textFieldRef.current?.focus();
          }, 0);

          setOpen(true);
        }

        setSearchValue('');
      }}
      {...props}
    >
      <HStack
        onClick={() => {
          setOpen(true);
        }}
        width="100%"
      >
        <Select.Trigger
          className={css({
            visibility: 'hidden',
            position: 'absolute',
          })}
        />
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
      </HStack>
      <Select.Content
        side="bottom"
        position="popper"
        variant="soft"
        className={css({
          maxHeight: '300px',
          width: '260px',
          maxWidth: '260px',

          '& .rt-SelectViewport': {
            paddingTop: '0px',
          },
        })}
        onPointerDownOutside={() => {
          setOpen(false);
        }}
        onKeyDown={e => {
          if (e.key === 'Escape' || e.key === 'Esc') {
            setOpen(false);
          }
        }}
      >
        <SearchTextField
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          textFieldRef={textFieldRef}
        />
        {searchedItems.length === 0 ? (
          <VStack height="200px" alignItems="center" justify="center">
            <Text>No Results</Text>
          </VStack>
        ) : (
          searchedItems
            .sort((a, b) => a.value.localeCompare(b.value))
            .map((item, index) => (
              <Select.Item
                key={item.id}
                value={String(item.id)}
                onPointerDown={() => handleValueChange(String(item.id))}
                onKeyDown={e => {
                  if (
                    (index === 0 && e.key === 'ArrowUp') ||
                    (index === searchedItems.length - 1 &&
                      e.key === 'ArrowDown')
                  ) {
                    textFieldRef.current?.focus();
                  }

                  e.preventDefault();
                }}
                className={css({
                  cursor: 'pointer',

                  '& > .rt-SelectItemIndicator': {
                    display: 'none',
                  },
                })}
              >
                <HStack>
                  {selectedFilters[filterType]
                    .map(filter => filter.id)
                    .includes(item.id) && (
                    <CheckIcon
                      color="black"
                      className={css({ position: 'absolute', left: '4px' })}
                    />
                  )}
                  <Text>{item.value}</Text>
                </HStack>
              </Select.Item>
            ))
        )}
      </Select.Content>
    </Select.Root>
  );
}
