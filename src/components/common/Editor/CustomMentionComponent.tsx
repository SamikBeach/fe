import { BeautifulMentionComponentProps } from 'lexical-beautiful-mentions';
import { useLocale } from 'next-intl';
import { forwardRef, useMemo } from 'react';
import { css } from 'styled-system/css';

interface Props extends Omit<BeautifulMentionComponentProps, 'data'> {
  className: string;
  data?: { [key: string]: string };
}

const CustomMentionComponent = forwardRef<HTMLSpanElement, Props>(
  ({ trigger, value, children, className, data, ...other }, ref) => {
    const locale = useLocale();

    const valueInKor = useMemo(() => {
      if (data?.type === 'author') {
        return data.nameInKor;
      }

      if (data?.type === 'original-work') {
        return data.titleInKor;
      }

      if (data?.type === 'edition') {
        return data.title;
      }
    }, [data]);

    const valueInEng = useMemo(() => {
      if (data?.type === 'author') {
        return data.name;
      }

      if (data?.type === 'original-work') {
        return data.titleInEng;
      }

      if (data?.type === 'edition') {
        return data.title;
      }
    }, [data]);

    return (
      <span
        {...other}
        ref={ref}
        className={css({
          color: trigger === '@' ? 'blue' : undefined,
          fontWeight: trigger !== undefined ? 'medium' : undefined,

          bgColor: className.includes('focused') ? 'gray.200' : 'gray.200',
          padding: '2px',
          borderRadius: '4px',
        })}
      >
        {trigger}
        {locale === 'ko' ? valueInKor : valueInEng}
      </span>
    );
  }
);
CustomMentionComponent.displayName = 'CustomMentionComponent';

export default CustomMentionComponent;
