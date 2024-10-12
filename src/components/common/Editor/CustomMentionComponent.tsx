import { BeautifulMentionComponentProps } from 'lexical-beautiful-mentions';
import { forwardRef } from 'react';
import { css } from 'styled-system/css';

interface Props extends BeautifulMentionComponentProps {
  className: string;
}

const CustomMentionComponent = forwardRef<HTMLSpanElement, Props>(
  ({ trigger, value, children, className, ...other }, ref) => {
    console.log({ className });
    return (
      <>
        <span
          {...other}
          ref={ref}
          className={css({
            color: trigger === '@' ? 'blue' : undefined,
            fontWeight: trigger === '#' ? 'bold' : undefined,

            bgColor: className.includes('focused') ? 'gray.200' : undefined,
            padding: '2px',
            borderRadius: '4px',
          })}
        >
          {trigger}
          {value}
        </span>
      </>
    );
  }
);
CustomMentionComponent.displayName = 'CustomMentionComponent';

export default CustomMentionComponent;
