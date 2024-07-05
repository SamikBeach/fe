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
import { FILTER_BOX_HEIGHT, HEADER_HEIGHT } from '@constants/common';
import { useEffect, useState } from 'react';

interface Props extends HstackProps {
  onValueChange?: (value: string) => void;
}

export default function AuthorFilterBox({
  className,
  onValueChange,
  ...props
}: Props) {
  const viewMode = useAtomValue(viewModeAtom);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const scrollHandler = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', scrollHandler);

    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  return (
    <HStack
      className={classNames(
        css({
          pointerEvents: 'auto',
          height: FILTER_BOX_HEIGHT,
          width: '100%',
          px: '20px',

          position: viewMode === 'list' ? 'fixed' : 'absolute',
          top: HEADER_HEIGHT,
          backgroundColor: viewMode === 'list' ? 'gray.50' : undefined,

          zIndex: 4,

          borderBottom:
            viewMode === 'list' && scrollY !== 0 ? '1px solid' : undefined,
          borderColor: 'gray.200',
        }),
        className
      )}
      gap="30px"
      {...props}
    >
      <ViewModeSelect />
      <HStack>
        <NationalityFilter onValueChange={onValueChange} />
        <EraFilter onValueChange={onValueChange} />
        <RegionFilter onValueChange={onValueChange} />
        <EducationFilter onValueChange={onValueChange} />
        <MainInterestFilter onValueChange={onValueChange} />
        <SchoolFilter onValueChange={onValueChange} />
        <Sort />
      </HStack>
    </HStack>
  );
}
