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

interface Props extends HstackProps {
  onValueChange?: (value: string) => void;
}

export default function AuthorFilterBox({
  className,
  onValueChange,
  ...props
}: Props) {
  const viewMode = useAtomValue(viewModeAtom);

  return (
    <HStack
      className={classNames(
        css({
          pointerEvents: 'auto',
          height: '64px',
          width: '100%',
          px: '20px',

          position: viewMode === 'list' ? 'relative' : 'absolute',
          top: '0px',

          zIndex: 4,
        }),
        className
      )}
      gap="30px"
      {...props}
    >
      <ViewModeSelect />
      <HStack>
        <EraFilter onValueChange={onValueChange} />
        <RegionFilter onValueChange={onValueChange} />
        <NationalityFilter onValueChange={onValueChange} />
        <MainInterestFilter onValueChange={onValueChange} />
        <SchoolFilter onValueChange={onValueChange} />
        <EducationFilter onValueChange={onValueChange} />
        <Sort />
      </HStack>
    </HStack>
  );
}
