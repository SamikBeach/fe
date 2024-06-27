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
              {[1, 2, 3].map(v => (
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Also_sprach_Zarathustra._Ein_Buch_f%C3%BCr_Alle_und_Keinen._In_drei_Theilen.jpg/440px-Also_sprach_Zarathustra._Ein_Buch_f%C3%BCr_Alle_und_Keinen._In_drei_Theilen.jpg"
                  width={23}
                  height={30}
                />
              ))}
              <Text size="1">{author.writing.length} writings</Text>
            </HStack>
            <HStack>
              {[1, 2, 3].map(v => (
                <img
                  src="data:image/webp;base64,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"
                  width={23}
                  height={30}
                />
              ))}
              <Text size="1">{author.book.length} books</Text>
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
