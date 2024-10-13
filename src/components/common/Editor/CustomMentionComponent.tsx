import { Avatar } from '@radix-ui/themes';
import { BeautifulMentionComponentProps } from 'lexical-beautiful-mentions';
import { useLocale } from 'next-intl';
import { forwardRef, useMemo } from 'react';
import { GiSecretBook } from 'react-icons/gi';
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

      if (data?.type === 'user') {
        return `${trigger}${value}`;
      }
    }, [data, value, trigger]);

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

    const avatar = useMemo(() => {
      if (data?.type === 'author') {
        return (
          <Avatar
            size="1"
            radius="full"
            src={data?.imageUrl ?? undefined}
            fallback={data?.nameInKor?.[0] ?? ''}
            className={css({
              borderRadius: '50%',
              width: '14px',
              height: '14px',
              mb: '3px',
              mx: '2px',
            })}
          />
        );
      }

      if (data?.type === 'original-work') {
        return (
          <GiSecretBook
            className={css({
              display: 'inline',
              marginBottom: '2px',
              width: '14px',
              color: 'gray.500',
              mx: '1px',
            })}
            size="24px"
          />
        );
      }

      if (data?.type === 'edition') {
        return (
          <img
            src={data?.imageUrl ?? undefined}
            width="10px"
            className={css({
              borderRadius: '2px',
              display: 'inline',
              mb: '3px',
              mx: '2px',
            })}
          />
        );
      }
    }, [data?.imageUrl, data?.nameInKor, data?.type]);

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
        {avatar}
        {locale === 'ko' ? valueInKor : valueInEng}
      </span>
    );
  }
);
CustomMentionComponent.displayName = 'CustomMentionComponent';

export default CustomMentionComponent;
