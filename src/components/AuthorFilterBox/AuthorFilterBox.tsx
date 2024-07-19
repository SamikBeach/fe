'use client';

import { css } from 'styled-system/css';
import { HStack, HstackProps, VStack } from 'styled-system/jsx';
import classNames from 'classnames';
import {
  EducationFilter,
  EraFilter,
  MainInterestFilter,
  NationalityFilter,
  RegionFilter,
  SchoolFilter,
} from './filters';
import ViewModeSelect from './ViewModeSelect';
import { FILTER_BOX_HEIGHT } from '@constants/common';
import { forwardRef } from 'react';

interface Props extends HstackProps {
  onValueChange?: (value: string) => void;
}

const AuthorFilterBox = forwardRef<HTMLDivElement, Props>(
  ({ className, onValueChange, ...props }, ref) => {
    return (
      <VStack
        ref={ref}
        className={classNames(
          css({
            pointerEvents: 'auto',
            minHeight: FILTER_BOX_HEIGHT,
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
        <ViewModeSelect />
        <HStack flexWrap="wrap" gap="6px">
          <NationalityFilter onValueChange={onValueChange} />
          <EraFilter onValueChange={onValueChange} />
          <RegionFilter onValueChange={onValueChange} />
          <EducationFilter onValueChange={onValueChange} />
          <MainInterestFilter onValueChange={onValueChange} />
          <SchoolFilter onValueChange={onValueChange} />
        </HStack>
      </VStack>
    );
  }
);

export default AuthorFilterBox;
