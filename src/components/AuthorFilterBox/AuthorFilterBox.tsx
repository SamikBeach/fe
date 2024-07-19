'use client';

import { viewModeAtom } from '@atoms/viewMode';
import { useAtomValue } from 'jotai';
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
import { Sort } from './sort';
import ViewModeSelect from './ViewModeSelect';
import { FILTER_BOX_HEIGHT } from '@constants/common';
import { forwardRef, useEffect, useState } from 'react';

interface Props extends HstackProps {
  onValueChange?: (value: string) => void;
}

const AuthorFilterBox = forwardRef<HTMLDivElement, Props>(
  ({ className, onValueChange, ...props }, ref) => {
    const viewMode = useAtomValue(viewModeAtom);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
      if (viewMode !== 'list') {
        return;
      }

      const scrollHandler = () => {
        setScrollY(window.scrollY);
      };

      window.addEventListener('scroll', scrollHandler);

      return () => window.removeEventListener('scroll', scrollHandler);
    }, [viewMode]);

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
        gap="30px"
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
          <Sort />
        </HStack>
      </VStack>
    );
  }
);

export default AuthorFilterBox;
