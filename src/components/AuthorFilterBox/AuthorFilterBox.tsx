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
import { forwardRef } from 'react';
import KeywordSearch from './KeywordSearch';

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
          <KeywordSearch />
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
