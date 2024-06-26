import AuthorHoverCard from '@components/AuthorHoverCard/AuthorHoverCard';
import { AuthorServerModel } from '@models/author';
import { Avatar, Card, Text } from '@radix-ui/themes';
import classNames from 'classnames';
import { format } from 'date-fns';
import { ComponentProps } from 'react';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';

interface Props extends ComponentProps<typeof Card> {
  author: AuthorServerModel;
}

function AuthorCard({ author, className, ...props }: Props) {
  const splitBornDate = author.born_date?.split('-');
  // TODO: 수정 필요
  const isValidBornDate =
    author.born_date !== '' &&
    splitBornDate?.[0].length !== undefined &&
    splitBornDate?.[0].length > 2 &&
    splitBornDate?.[1] !== '00' &&
    splitBornDate?.[2] !== '00';

  const splitDiedDate = author.died_date?.split('-');
  const isValidDiedDate =
    author.died_date !== '' &&
    splitDiedDate?.[0].length !== undefined &&
    splitDiedDate?.[0].length > 2 &&
    splitDiedDate?.[1] !== '00' &&
    splitDiedDate?.[2] !== '00';

  return (
    <Card
      className={classNames(
        css({
          height: '300px',
          padding: '20px',
          cursor: 'pointer',
        }),
        className
      )}
      {...props}
    >
      <HStack alignItems="start" gap="20px">
        <Avatar src={author.image_url} fallback="폴백" radius="full" size="7" />
        <VStack alignItems="start" gap="0">
          <Text size="4" weight="bold">
            {author.name}
          </Text>
          <Text size="3">{author.name_in_kor}</Text>
          <HStack>
            <Text size="2" color="gray">
              {author.born_date_is_bc ? '기원전 ' : ''}
              {isValidBornDate && author.born_date != null
                ? format(new Date(author.born_date), 'y년 M월 d일 ')
                : '???'}
              - {author.died_date_is_bc ? '기원전 ' : ''}
              {isValidDiedDate && author.died_date != null
                ? format(new Date(author.died_date), 'y년 M월 d일 ')
                : '???'}
            </Text>
          </HStack>
          <Text color="gray">{author.nationality?.nationality}</Text>
          <Text>
            {author.main_interest
              ?.map(mainInterest => mainInterest.main_interest)
              .join(', ')}
          </Text>
          <Text>
            {author.education?.map(education => education.education).join(', ')}
          </Text>
          <Text>{author.era?.map(era => era.era).join(', ')}</Text>
          <Text>{author.region?.map(region => region.region).join(', ')}</Text>
          <VStack gap="10px" alignItems="start">
            {author.influenced.length > 0 && (
              <VStack gap="4px" alignItems="start">
                <Text size="1" color="gray">
                  Influenced to
                </Text>
                <HStack>
                  {author.influenced.slice(0, 3).map(influenced => (
                    <AuthorHoverCard.Root>
                      <AuthorHoverCard.Trigger>
                        <Avatar
                          size="2"
                          radius="full"
                          src={
                            influenced.image_url ??
                            'https://upload.wikimedia.org/wikipedia/ko/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png'
                          }
                          fallback={influenced.name[0]}
                        />
                      </AuthorHoverCard.Trigger>
                      <AuthorHoverCard.Content author={influenced} />
                    </AuthorHoverCard.Root>
                  ))}
                  +{author.influenced.slice(3).length}
                </HStack>
              </VStack>
            )}
            {author.influenced_by.length > 0 && (
              <VStack gap="4px" alignItems="start">
                <Text size="1" color="gray">
                  Influenced by
                </Text>
                <HStack gap="6px">
                  {author.influenced_by.slice(0, 3).map(influenced => (
                    <AuthorHoverCard.Root>
                      <AuthorHoverCard.Trigger>
                        <Avatar
                          size="2"
                          radius="full"
                          src={
                            influenced.image_url ??
                            'https://upload.wikimedia.org/wikipedia/ko/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png'
                          }
                          fallback={influenced.name[0]}
                        />
                      </AuthorHoverCard.Trigger>
                      <AuthorHoverCard.Content author={influenced} />
                    </AuthorHoverCard.Root>
                  ))}

                  {author.influenced_by.slice(3).length > 0
                    ? `+${author.influenced_by.slice(3).length}`
                    : ''}
                </HStack>
              </VStack>
            )}
          </VStack>
        </VStack>
      </HStack>
    </Card>
  );
}

export default AuthorCard;
