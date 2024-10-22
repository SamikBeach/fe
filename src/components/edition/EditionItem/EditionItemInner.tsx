import { searchOriginalWorks } from '@apis/original-work';
import { AuthorAvatar } from '@components/author/AuthorAvatar';
import { EditionServerModel } from '@models/edition';
import { ChatBubbleIcon, HeartFilledIcon } from '@radix-ui/react-icons';
import { Tooltip, Text } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { GiSecretBook } from 'react-icons/gi';
import { css } from 'styled-system/css';
import { HStack, HstackProps, VStack } from 'styled-system/jsx';
import { OriginalWorkHoverCard } from '@components/original-work/OriginalWorkHoverCard';

interface Props extends HstackProps {
  edition: EditionServerModel;
  isMobile?: boolean;
}

export default function EditionItemInner({
  edition,
  isMobile = false,
  ...props
}: Props) {
  const locale = useLocale();

  const {
    title,
    author,
    image_url,
    like_count,
    comment_count,
    publisher,
    original_works,
  } = edition;

  const { data: originalWorksFromQuery } = useQuery({
    queryKey: ['edition/search', edition.id],
    queryFn: () =>
      searchOriginalWorks({ editionId: edition.id, limit: 500, locale }),
    enabled: original_works === undefined,
    select: data => data.data.data,
  });

  const originalWorks = original_works ?? originalWorksFromQuery ?? [];

  return (
    <HStack gap="20px" width="100%" height="100%" {...props}>
      <div className={css({ maxWidth: '80px', minWidth: '80px' })}>
        <Link href={`/edition/${edition.id}`}>
          <img
            src={image_url ?? undefined}
            className={css({
              minHeight: '110px',
              maxHeight: '110px',
            })}
          />
        </Link>
      </div>

      <VStack alignItems="start" justify="space-between" height="100%">
        <VStack alignItems="start" gap="0px">
          <Tooltip content={`${title} - ${publisher}`}>
            <Link
              href={`/edition/${edition.id}`}
              className={css({
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',

                maxWidth: isMobile ? '60vw' : '260px',
                lineHeight: '19px',
                color: 'gray.500',

                cursor: 'pointer',
                _hover: {
                  textDecoration: 'underline',
                },
              })}
            >
              <Text
                size="3"
                weight="bold"
                className={css({
                  lineHeight: '19px',
                  color: 'black',
                })}
              >
                {title}
              </Text>{' '}
              <Text
                size="2"
                className={css({
                  fontSize: '13px',
                })}
              >
                {publisher}
              </Text>
            </Link>
          </Tooltip>

          {/* <Text size="1" color="gray">
            {format(
              new Date(publication_date),
              locale === 'ko' ? 'yyyy년 M월 d일' : 'yyyy-MM-dd'
            )}
          </Text> */}
          <AuthorAvatar
            author={author}
            withName
            size="1"
            textProps={{ size: '1', color: 'gray' }}
          />

          <span
            className={css({
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '230px',
              color: 'gray.600',
            })}
          >
            {originalWorks.map(originalWork => (
              <OriginalWorkHoverCard.Root key={originalWork.id}>
                <OriginalWorkHoverCard.Trigger>
                  <Link
                    href={`/original-work/${originalWork.id}`}
                    onClick={e => e.stopPropagation()}
                    className={css({
                      cursor: 'pointer',
                      mr: '4px',
                    })}
                  >
                    <GiSecretBook
                      className={css({
                        display: 'inline',
                        cursor: 'pointer',
                        color: 'gray.500',
                        mr: '2px',
                      })}
                      size="16px"
                    />
                    <Text
                      size="1"
                      className={css({
                        _hover: {
                          textDecoration: 'underline',
                        },
                      })}
                    >
                      {originalWork.title_in_kor}
                    </Text>
                  </Link>
                </OriginalWorkHoverCard.Trigger>
                <OriginalWorkHoverCard.Content
                  originalWork={originalWork}
                  side="top"
                />
              </OriginalWorkHoverCard.Root>
            ))}
          </span>
        </VStack>

        <HStack gap="10px" width="100%" alignItems="start">
          <HStack gap="3px">
            <HeartFilledIcon
              width="16px"
              height="16px"
              className={css({
                color: 'gray.500',
              })}
            />
            <Text size="2" color="gray">
              {like_count}
            </Text>
          </HStack>
          <HStack gap="3px">
            <ChatBubbleIcon
              width="16px"
              height="16px"
              className={css({
                color: 'gray.500',
              })}
            />
            <Text size="2" color="gray">
              {comment_count}
            </Text>
          </HStack>
        </HStack>
      </VStack>
    </HStack>
  );
}
