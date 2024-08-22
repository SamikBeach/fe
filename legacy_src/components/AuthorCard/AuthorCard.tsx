import { AuthorServerModel } from 'legacy_src/models/author';
import { Card } from '@radix-ui/themes';
import classNames from 'classnames';
import { ComponentProps } from 'react';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';
import AuthorAdditionalInfo from './AuthorAdditionalInfo';
import AuthorBasicInfo from './AuthorBasicInfo';

interface Props extends ComponentProps<typeof Card> {
  author: AuthorServerModel;
}

function AuthorCard({ author, className, ...props }: Props) {
  if (author === undefined) {
    return null;
  }

  return (
    <Card
      className={classNames(
        css({
          width: '460px',
          height: '290px',
          padding: '20px',
        }),
        className
      )}
      {...props}
    >
      <HStack alignItems="start" gap="20px">
        <VStack alignItems="start" gap="16px" width="100%">
          <AuthorBasicInfo author={author} />
          <AuthorAdditionalInfo author={author} />
        </VStack>
      </HStack>
    </Card>
  );
}

export default AuthorCard;
