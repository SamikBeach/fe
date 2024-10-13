import { AuthorHoverCard } from '@components/author/AuthorHoverCard';
import { EditionHoverCard } from '@components/edition/EditionHoverCard';
import { OriginalWorkHoverCard } from '@components/original-work/OriginalWorkHoverCard';
import { Avatar } from '@radix-ui/themes';
import { BeautifulMentionComponentProps } from 'lexical-beautiful-mentions';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { forwardRef, useMemo, useState } from 'react';
import { GiSecretBook } from 'react-icons/gi';
import { css } from 'styled-system/css';

interface Props extends Omit<BeautifulMentionComponentProps, 'data'> {
  data?: { [key: string]: string };
}

const CustomMentionComponent = forwardRef<HTMLSpanElement, Props>(
  ({ trigger, value, children, className, data, ...other }, ref) => {
    const locale = useLocale();

    const router = useRouter();

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

    const isItem = className.includes('item');

    return (
      <span
        {...other}
        ref={ref}
        className={css({
          color: trigger === '@' ? 'blue' : undefined,
          fontWeight: trigger !== undefined ? 'medium' : undefined,
          bgColor: isItem ? undefined : 'gray.200',
          cursor: isItem
            ? trigger === '@'
              ? 'pointer'
              : 'default'
            : undefined,

          _hover: {
            bgColor: 'gray.200',
          },

          padding: '2px',
          borderRadius: '4px',
        })}
        onClick={() => {
          if (trigger === '@') {
            router.push(`/user/${data?.id}`);
          }
        }}
      >
        {avatar}
        {locale === 'ko' ? valueInKor : valueInEng}
      </span>
    );
  }
);

CustomMentionComponent.displayName = 'CustomMentionComponent';

export default function CustomMentionComponentWithHoverCard(props: Props) {
  const [open, setOpen] = useState(false);

  if (props.data?.type === 'author') {
    return (
      <AuthorHoverCard.Root open={open} onOpenChange={setOpen}>
        <AuthorHoverCard.Trigger>
          <CustomMentionComponent {...props} />
        </AuthorHoverCard.Trigger>
        <AuthorHoverCard.Content
          authorId={Number(props.data.id)}
          open={open}
          side="top"
        />
      </AuthorHoverCard.Root>
    );
  }

  if (props.data?.type === 'original-work') {
    return (
      <OriginalWorkHoverCard.Root open={open} onOpenChange={setOpen}>
        <OriginalWorkHoverCard.Trigger>
          <CustomMentionComponent {...props} />
        </OriginalWorkHoverCard.Trigger>
        <OriginalWorkHoverCard.Content
          originalWorkId={Number(props.data.id)}
          open={open}
          side="top"
        />
      </OriginalWorkHoverCard.Root>
    );
  }

  if (props.data?.type === 'edition') {
    return (
      <EditionHoverCard.Root open={open} onOpenChange={setOpen}>
        <EditionHoverCard.Trigger>
          <CustomMentionComponent {...props} />
        </EditionHoverCard.Trigger>
        <EditionHoverCard.Content
          editionId={Number(props.data.id)}
          open={open}
          side="top"
        />
      </EditionHoverCard.Root>
    );
  }

  return <CustomMentionComponent {...props} />;
}
