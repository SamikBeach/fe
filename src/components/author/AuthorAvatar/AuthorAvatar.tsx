import { AuthorHoverCard } from '@components/author/AuthorHoverCard';
import { AuthorServerModel } from '@models/author';
import { Avatar, AvatarProps, Text, TextProps } from '@radix-ui/themes';
import classNames from 'classnames';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { useMemo } from 'react';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';

interface Props extends Omit<AvatarProps, 'fallback'> {
  author: AuthorServerModel;
  withName?: boolean;
  withSubName?: boolean;
  textProps?: TextProps;
}

function AuthorAvatar({
  author,
  withName = false,
  withSubName = false,
  textProps,
  ...props
}: Props) {
  const locale = useLocale();

  const name = useMemo(
    () => (
      <Link
        href={`/author/${author.id}`}
        className={css({ lineHeight: '16.5px' })}
      >
        <Text
          weight="medium"
          className={classNames(
            css({
              cursor: 'pointer',
              lineHeight: '16.5px',

              _hover: {
                textDecoration: 'underline',
              },
            }),
            textProps?.className
          )}
          {...textProps}
        >
          {locale === 'ko' ? author.name_in_kor : author.name}
        </Text>
      </Link>
    ),
    [author, locale, textProps]
  );

  const subName = useMemo(
    () => (
      <Link
        href={`/author/${author.id}`}
        className={css({
          lineHeight: '14px',
        })}
      >
        <Text
          weight="medium"
          className={classNames(
            css({
              cursor: 'pointer',
              color: 'gray.500',
              fontSize: '11px',
              lineHeight: '14px',

              _hover: {
                textDecoration: 'underline',
              },
            }),
            textProps?.className
          )}
          {...textProps}
        >
          {author.name}
        </Text>
      </Link>
    ),
    [author, textProps]
  );

  return (
    <AuthorHoverCard.Root>
      <AuthorHoverCard.Trigger>
        <HStack display={withSubName ? 'inline-flex' : 'inline'}>
          <Link href={`/author/${author.id}`}>
            <Avatar
              size="2"
              radius="full"
              src={author.image_url ?? undefined}
              fallback={author.name[0]}
              {...props}
            />
          </Link>{' '}
          {withName && withSubName && (
            <VStack alignItems="start" gap="0px">
              {name}
              {locale === 'ko' && subName}
            </VStack>
          )}
          {withName && !withSubName && name}
        </HStack>
      </AuthorHoverCard.Trigger>
      <AuthorHoverCard.Content author={author} side="top" />
    </AuthorHoverCard.Root>
  );
}

export default AuthorAvatar;
