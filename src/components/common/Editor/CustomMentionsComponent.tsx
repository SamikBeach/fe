import { BeautifulMentionComponentProps } from 'lexical-beautiful-mentions';
import { forwardRef } from 'react';
import { css } from 'styled-system/css';

const CustomMentionComponent = forwardRef<
  HTMLSpanElement,
  BeautifulMentionComponentProps
>(({ trigger, value, children, ...other }, ref) => {
  return (
    <>
      <span {...other} ref={ref} className={css({ bgColor: 'gray.200' })}>
        {trigger}
        {value}
      </span>
    </>
  );
});
CustomMentionComponent.displayName = 'CustomMentionComponent';

export default CustomMentionComponent;
