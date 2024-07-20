'use client';

import { css } from 'styled-system/css';
import { VStack, VstackProps } from 'styled-system/jsx';
import classNames from 'classnames';
import { forwardRef } from 'react';

interface Props extends VstackProps {
  onValueChange?: (value: string) => void;
}

const FilterBox = forwardRef<HTMLDivElement, Props>(
  ({ className, onValueChange, children, ...props }, ref) => {
    return (
      <VStack
        ref={ref}
        className={classNames(
          css({
            width: '100%',
            padding: '20px',
          }),
          className
        )}
        gap="10px"
        alignItems="start"
        justify="space-between"
        {...props}
      >
        {children}
      </VStack>
    );
  }
);

export default FilterBox;
