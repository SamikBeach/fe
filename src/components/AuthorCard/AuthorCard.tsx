import { AuthorAvatar } from '@components/AuthorAvatar';
import { AuthorServerModel } from '@models/author';
import { HeartIcon } from '@radix-ui/react-icons';
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

  const bornCentury = isValidBornDate
    ? Math.floor(Number(splitBornDate?.[0]) / 100) + 1
    : null;

  const diedCentury = isValidDiedDate
    ? Math.floor(Number(splitDiedDate?.[0]) / 100) + 1
    : null;

  const activeCenturyText =
    bornCentury === diedCentury
      ? `${bornCentury}세기`
      : `${bornCentury}세기, ${diedCentury}세기`;

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
        <VStack alignItems="start" gap="0" width="100%">
          <HStack width="100%" justify="space-between">
            <Text size="4" weight="bold">
              {author.name}
            </Text>
            <HStack>
              <HStack gap="0">
                <Text>123</Text>
                <HeartIcon color="red" />
              </HStack>
              <Text>362 comments</Text>
            </HStack>
          </HStack>
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
            <Text>{activeCenturyText}</Text>
          </HStack>
          <Text size="1" color="gray">
            {author.nationality?.nationality}
          </Text>
          <Text size="1">
            {author.main_interest
              ?.map(mainInterest => mainInterest.main_interest)
              .join(', ')}
          </Text>
          <Text size="1">
            {author.education?.map(education => education.education).join(', ')}
          </Text>
          <Text size="1">{author.era?.map(era => era.era).join(', ')}</Text>
          <Text size="1">
            {author.region?.map(region => region.region).join(', ')}
          </Text>
          <Text size="1">
            {author.school?.map(school => school.school).join(', ')}
          </Text>
          <VStack alignItems="start">
            <HStack>
              {[1, 2, 3].map(() => (
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Also_sprach_Zarathustra._Ein_Buch_f%C3%BCr_Alle_und_Keinen._In_drei_Theilen.jpg/440px-Also_sprach_Zarathustra._Ein_Buch_f%C3%BCr_Alle_und_Keinen._In_drei_Theilen.jpg"
                  width={23}
                  height={30}
                />
              ))}
              <Text size="1">{author.writing?.length} writings</Text>
            </HStack>
            <HStack>
              {[1, 2, 3].map(() => (
                <img
                  src="https://image.yes24.com/goods/426994/XL"
                  width={23}
                  height={30}
                />
              ))}
              <Text size="1">{author.book?.length} books</Text>
            </HStack>
          </VStack>
          <VStack gap="10px" alignItems="start">
            {author.influenced.length > 0 && (
              <VStack gap="4px" alignItems="start">
                <Text size="1" color="gray">
                  Influenced to
                </Text>
                <HStack gap="4px">
                  {author.influenced.slice(0, 3).map(influenced => (
                    <AuthorAvatar size="1" author={influenced} />
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
                <HStack gap="4px">
                  {author.influenced_by.slice(0, 3).map(influencedBy => (
                    <AuthorAvatar size="1" author={influencedBy} />
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
