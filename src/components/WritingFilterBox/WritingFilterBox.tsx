'use client';

import { HStack, VstackProps } from 'styled-system/jsx';

import { forwardRef } from 'react';
import { FilterBox } from '@components/FilterBox';
import { AuthorFilter } from './filters';

interface Props extends VstackProps {
  onValueChange?: (value: string) => void;
}

const WritingFilterBox = forwardRef<HTMLDivElement, Props>(
  ({ className, onValueChange, ...props }, ref) => {
    return (
      <FilterBox ref={ref} {...props}>
        <HStack flexWrap="wrap" gap="6px" width="100%">
          <AuthorFilter onValueChange={onValueChange} />
        </HStack>
      </FilterBox>
    );
  }
);

export default WritingFilterBox;
