import classNames from 'classnames';
import { css } from 'styled-system/css';
import { HStack, HstackProps } from 'styled-system/jsx';
import Sort from './Sort';
import WritingFilter from './WritingFilter';
import AuthorFilter from './AuthorFilter';
import PublisherFilter from './PublisherFilter';
import PublicationDateFilter from './PublicationDateFilter';

interface Props extends HstackProps {}

export default function BookFilterBox({ className, ...props }: Props) {
  return (
    <HStack
      className={classNames(
        css({
          pointerEvents: 'auto',
          height: '64px',
          width: '100%',
          px: '20px',

          top: '0px',
        }),
        className
      )}
      gap="30px"
      {...props}
    >
      <HStack>
        <AuthorFilter />
        {/* AuthorFitler의 조건부 필터 */}
        <WritingFilter />
        <PublisherFilter />
        <PublicationDateFilter />
        <Sort />
      </HStack>
    </HStack>
  );
}
