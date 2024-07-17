'use client';

import { viewModeAtom } from '@atoms/viewMode';
import { useAtomValue } from 'jotai';
import { css } from 'styled-system/css';
import { HStack, HstackProps } from 'styled-system/jsx';
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
      <HStack
        ref={ref}
        className={classNames(
          css({
            pointerEvents: 'auto',
            minHeight: FILTER_BOX_HEIGHT,
            width: '100%',
            padding: '20px',

            top: viewMode === 'list' ? '64px' : '0px',
            position: viewMode === 'list' ? 'sticky' : 'absolute',
            backgroundColor: viewMode === 'list' ? 'gray.50' : undefined,

            zIndex: 4,

            borderBottom:
              viewMode === 'list' && scrollY !== 0 ? '1px solid' : undefined,
            borderColor: 'gray.200',
          }),
          className
        )}
        gap="30px"
        alignItems="start"
        justify="space-between"
        {...props}
      >
        <HStack flexWrap="wrap" gap="6px">
          <NationalityFilter onValueChange={onValueChange} />
          <EraFilter onValueChange={onValueChange} />
          <RegionFilter onValueChange={onValueChange} />
          <EducationFilter onValueChange={onValueChange} />
          <MainInterestFilter onValueChange={onValueChange} />
          <SchoolFilter onValueChange={onValueChange} />
          <Sort />
        </HStack>
        <ViewModeSelect />
      </HStack>
    );
  }
);

export default AuthorFilterBox;
