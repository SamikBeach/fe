import { HStack, HstackProps } from 'styled-system/jsx';
import { AuthorFilter, WritingFilter } from './filters';
import { forwardRef } from 'react';
import { FilterBox } from 'legacy_src/components/FilterBox';

interface Props extends HstackProps {
  onValueChange?: (value: string) => void;
}

const BookFilterBox = forwardRef<HTMLDivElement, Props>(
  ({ className, onValueChange, ...props }, ref) => {
    return (
      <FilterBox ref={ref} {...props}>
        <HStack flexWrap="wrap" gap="6px" width="100%">
          <AuthorFilter />
          <WritingFilter />
        </HStack>
      </FilterBox>
    );
  }
);

export default BookFilterBox;
