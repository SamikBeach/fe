import { UserServerModel } from '@models/user';
import { Avatar, AvatarProps, Text, TextProps } from '@radix-ui/themes';
import classNames from 'classnames';
import Link from 'next/link';
import { useMemo } from 'react';
import { css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';

interface Props extends Omit<AvatarProps, 'fallback'> {
  user: UserServerModel;
  withName?: boolean;
  onlyName?: boolean;
  textProps?: TextProps;
}

function UserAvatar({
  user,
  withName = false,
  onlyName = false,
  textProps,
  ...props
}: Props) {
  const nickname = useMemo(
    () => (
      <Link href={`/user/${user.id}`} className={css({ lineHeight: '16.5px' })}>
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
          {user.nickname}
        </Text>
      </Link>
    ),
    [user, textProps]
  );

  return (
    <HStack display="inline" onClick={e => e.stopPropagation()}>
      {!onlyName && (
        <>
          <Link href={`/user/${user.id}`}>
            <Avatar
              size="2"
              radius="full"
              //   src={user.image_url ?? undefined}
              fallback={user.nickname?.[0] ?? ''}
              {...props}
            />
          </Link>{' '}
        </>
      )}
      {withName && nickname}
    </HStack>
  );
}

export default UserAvatar;
