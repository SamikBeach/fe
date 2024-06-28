import { SidePeek } from '@elements/SidePeek';
import {
  Avatar,
  Box,
  Flex,
  ScrollArea,
  SegmentedControl,
  Separator,
  Text,
} from '@radix-ui/themes';
import { ComponentProps, Dispatch, SetStateAction, useState } from 'react';
import '@styles/globals.css';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';
import { hstack } from 'styled-system/patterns';
import { WritingSidePeek } from '@components/AuthorSidePeek/WritingSidePeek';
import { AuthorServerModel } from '@models/author';
import { useQuery } from '@tanstack/react-query';
import { getAuthorById } from '@apis/author';
import { format } from 'date-fns';
import { BookSidePeek } from './BookSidePeek';
import { HeartIcon } from '@radix-ui/react-icons';
import { AuthorAvatar } from '..';

interface Props extends ComponentProps<typeof SidePeek.Root> {
  authorId: number;
}

export default function AuthorSidePeek({
  children,
  authorId,
  open,
  onOpenChange,
  ...props
}: Props) {
  const [selectedWritingId, setSelectedWritingId] = useState<number | null>(
    null
  );
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

  const [selectedTab, setSelectedTab] = useState<'writing' | 'book'>('writing');

  const isOpenSidePeek = selectedWritingId !== null || selectedBookId !== null;

  const { data: author } = useQuery({
    queryKey: ['author', authorId],
    queryFn: () => getAuthorById({ id: authorId }),
    select: response => response.data,
    enabled: open,
  });

  return (
    <SidePeek.Root
      modal={false}
      open={open}
      onOpenChange={onOpenChange}
      {...props}
    >
      {children}
      <SidePeek.Portal>
        <SidePeek.Content
          className={css({
            width: '800px',
            height: 'calc(100vh - 64px - 24px)',
          })}
        >
          {isOpenSidePeek && (
            <div
              className={css({
                background: 'rgba(0 0 0 / 0.2)',
                position: 'fixed',
                zIndex: 1,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: '12px',
              })}
            />
          )}
          <Flex direction="column" gap="16px" height="100%">
            <AuthorInfo author={author} />
            <Separator orientation="horizontal" size="4" />
            <SegmentedControl.Root
              size="3"
              className={css({ width: '200px' })}
              onValueChange={value =>
                setSelectedTab(value as 'writing' | 'book')
              }
            >
              <SegmentedControl.Item value="writing">
                원전
              </SegmentedControl.Item>
              <SegmentedControl.Item value="book">번역서</SegmentedControl.Item>
            </SegmentedControl.Root>
            {selectedTab === 'writing' && (
              <WritingInfo
                selectedWritingId={selectedWritingId}
                setSelectedWritingId={setSelectedWritingId}
                writing={author?.writing}
              />
            )}
            {selectedTab === 'book' && (
              <BookInfo
                selectedBookId={selectedBookId}
                setSelectedBookId={setSelectedBookId}
                book={author?.book}
              />
            )}
          </Flex>
          <SidePeek.CloseButton />
        </SidePeek.Content>
      </SidePeek.Portal>
    </SidePeek.Root>
  );
}

function AuthorInfo({ author }: { author?: AuthorServerModel }) {
  const splitBornDate = author?.born_date?.split('-');
  const isValidBornDate =
    author?.born_date !== '' &&
    splitBornDate?.[1] !== '00' &&
    splitBornDate?.[2] !== '00';

  const splitDiedDate = author?.died_date?.split('-');
  const isValidDiedDate =
    author?.died_date !== '' &&
    splitDiedDate?.[1] !== '00' &&
    splitDiedDate?.[2] !== '00';

  return (
    <HStack gap="16px">
      <Avatar
        src={author?.image_url}
        fallback={author?.name ?? ''}
        size="9"
        radius="full"
      />
      <VStack alignItems="start" gap="0px">
        <Text
          weight="bold"
          className={css({ fontWeight: 'bold', fontSize: '20px' })}
        >
          {author?.name}
        </Text>
        <HStack>
          <Text size="2" color="gray">
            {author?.born_date_is_bc ? '기원전 ' : ''}
            {isValidBornDate && author?.born_date != null
              ? format(new Date(author.born_date), 'y년 M월 d일 ')
              : '???'}
            - {author?.died_date_is_bc ? '기원전 ' : ''}
            {isValidDiedDate && author?.died_date != null
              ? format(new Date(author.died_date), 'y년 M월 d일 ')
              : '???'}
          </Text>
        </HStack>
        <Text className={css({ fontSize: '14px' })}>Author 설명</Text>
        <HStack gap="20px">
          <VStack alignItems="start" gap="0">
            <Text size="1" color="gray">
              {author?.nationality?.nationality}
            </Text>
            <Text size="1">
              {author?.main_interest
                ?.map(mainInterest => mainInterest.main_interest)
                .join(', ')}
            </Text>
            <Text size="1">
              {author?.education
                ?.map(education => education.education)
                .join(', ')}
            </Text>
            <Text size="1">{author?.era?.map(era => era.era).join(', ')}</Text>
            <Text size="1">
              {author?.region?.map(region => region.region).join(', ')}
            </Text>
            <Text size="1">
              {author?.school?.map(school => school.school).join(', ')}
            </Text>
            <Text>Influenced By</Text>
            <HStack gap="2px">
              {author?.influenced_by.map(influencedBy => (
                <AuthorAvatar size="1" author={influencedBy} />
              ))}
            </HStack>
          </VStack>
          <VStack alignItems="start" gap="0">
            <Text>Influenced To</Text>
            <HStack gap="2px">
              {author?.influenced.map(influenced => (
                <AuthorAvatar size="1" author={influenced} />
              ))}
            </HStack>
          </VStack>
        </HStack>
      </VStack>
    </HStack>
  );
}

interface WritingInfoProps {
  selectedWritingId: number | null;
  setSelectedWritingId: Dispatch<SetStateAction<number | null>>;
  writing?: AuthorServerModel['writing'];
}

function WritingInfo({
  selectedWritingId,
  setSelectedWritingId,
  writing,
}: WritingInfoProps) {
  return (
    <>
      <ScrollArea type="always" scrollbars="vertical">
        <VStack alignItems="flex-start" height="100%">
          {writing?.map(_writing => (
            <Box
              height="160px"
              className={hstack({
                alignItems: 'flex-start',
              })}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Also_sprach_Zarathustra._Ein_Buch_f%C3%BCr_Alle_und_Keinen._In_drei_Theilen.jpg"
                className={css({ height: '100%', cursor: 'pointer' })}
                onClick={() => setSelectedWritingId(_writing.id)}
              />
              <VStack alignItems="flex-start" gap="0">
                <HStack>
                  <Text
                    size="2"
                    align="center"
                    weight="bold"
                    className={css({ cursor: 'pointer' })}
                    onClick={() => setSelectedWritingId(_writing.id)}
                  >
                    {_writing.title}
                  </Text>
                  <HStack>
                    <HStack gap="0">
                      <Text>123</Text>
                      <HeartIcon color="red" />
                    </HStack>
                    <Text>362 comments</Text>
                  </HStack>
                </HStack>
                <Text>영문 타이틀:{_writing.title_in_eng}</Text>
                <Text>국문 타이틀:{_writing.title_in_kor}</Text>
                <Text className={css({ fontSize: '14px' })}>
                  {_writing.publication_date} 년
                </Text>
                <Text size="2" color="gray">
                  Ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                  consectetur.
                </Text>
                <Text>{_writing?.book?.length} books</Text>
              </VStack>
            </Box>
          ))}
        </VStack>
      </ScrollArea>
      <WritingSidePeek
        writingId={selectedWritingId ?? 0}
        open={selectedWritingId !== null}
        onOpenChange={open =>
          setSelectedWritingId(open ? selectedWritingId : null)
        }
      />
    </>
  );
}

interface BookInfoProps {
  selectedBookId: number | null;
  setSelectedBookId: Dispatch<SetStateAction<number | null>>;
  book?: AuthorServerModel['book'];
}

function BookInfo({ selectedBookId, setSelectedBookId, book }: BookInfoProps) {
  console.log({ book });
  return (
    <>
      <ScrollArea type="always" scrollbars="vertical">
        <VStack alignItems="flex-start" height="100%">
          {book?.map(_book => (
            <Box
              height="160px"
              className={hstack({
                alignItems: 'flex-start',
              })}
            >
              <img
                src="https://image.yes24.com/momo/TopCate139/MidCate08/13872556.jpg"
                className={css({ height: '100%', cursor: 'pointer' })}
                onClick={() => setSelectedBookId(_book.id)}
              />
              <VStack alignItems="flex-start" gap="0">
                <Text>도덕의 계보학</Text>
                <Text>번역: 홍길동</Text>
                <Text>출판사: 민음사</Text>
                <Text
                  size="2"
                  align="center"
                  weight="bold"
                  className={css({ cursor: 'pointer' })}
                  onClick={() => setSelectedBookId(_book.id)}
                >
                  {_book.isbn}
                </Text>
                <HStack>
                  <HStack gap="0">
                    <Text>123</Text>
                    <HeartIcon color="red" />
                  </HStack>
                  <Text>362 comments</Text>
                </HStack>
              </VStack>
            </Box>
          ))}
        </VStack>
      </ScrollArea>
      <BookSidePeek
        bookId={selectedBookId ?? 0}
        open={selectedBookId !== null}
        onOpenChange={open => setSelectedBookId(open ? selectedBookId : null)}
      />
    </>
  );
}
