import { HStack, VStack, VstackProps } from 'styled-system/jsx';
import { Text, Tooltip } from '@radix-ui/themes';
import { css } from 'styled-system/css';
import { useQuery } from '@tanstack/react-query';
import { getEditionById } from '@apis/edition';
import { useParams } from 'next/navigation';
import EditionBasicInfoSkeleton from './EditionBasicInfoSectionSkeleton';
import { AuthorAvatar } from '@components/author/AuthorAvatar';
import Link from 'next/link';
import { GiSecretBook } from 'react-icons/gi';
import { format } from 'date-fns';
import { useLocale, useTranslations } from 'next-intl';
import { OriginalWorkHoverCard } from '@components/original-work/OriginalWorkHoverCard';
import { useState } from 'react';
import { AiOutlineAlert } from 'react-icons/ai';
import { ReportDialog } from '@components/common/ReportDialog';
import { LoginAlertDialog } from '@components/common/LoginAlertDialog';

interface Props extends VstackProps {
  isOverThreshold: boolean;
}

export default function EditionBasicInfoSection({
  isOverThreshold,
  ...props
}: Props) {
  const locale = useLocale();

  const t = useTranslations('Common');

  const params = useParams();
  const editionId = Number(params.id);

  const [openReportDialog, setOpenReportDialog] = useState(false);
  const [openLoginAlertDialog, setOpenLoginAlertDialog] = useState(false);

  const { data: edition, isLoading: isLoadingEdition } = useQuery({
    queryKey: ['edition', params.id],
    queryFn: () => getEditionById({ id: editionId }),
    select: response => response.data,
  });

  const {
    title,
    publication_date,
    publisher,
    author,
    image_url,
    original_works = [],
  } = edition ?? {
    id: 0,
    title: '',
    image_url: '',
    publication_date: '',
    publisher: '',
  };

  if (isLoadingEdition) {
    return <EditionBasicInfoSkeleton />;
  }

  return (
    <>
      <VStack alignItems="start" gap="20px" width="100%" px="10px" {...props}>
        <VStack alignItems="start" gap="4px">
          <VStack alignItems="start" gap="0px">
            <HStack>
              <HStack gap={isOverThreshold ? '8px' : '0px'}>
                <img
                  src={image_url ?? undefined}
                  className={css({
                    margin: '0 auto',
                    cursor: 'pointer',

                    height: isOverThreshold ? '30px' : '0px',

                    _hover: {
                      scale: 1.05,
                    },

                    transition:
                      'height 0.2s ease-in-out, scale 0.2s ease-in-out',
                  })}
                />
                <Text size="6" weight="bold">
                  {title}
                </Text>
              </HStack>
              <Tooltip content={t('report_incorrect_information')}>
                <span>
                  <AiOutlineAlert
                    size="20px"
                    cursor="pointer"
                    className={css({
                      color: 'gray.500',
                    })}
                    onClick={() => setOpenReportDialog(true)}
                  />
                </span>
              </Tooltip>
            </HStack>

            <Text size="3" color="gray">
              {publisher}
            </Text>
            <Text size="3" color="gray">
              {format(
                new Date(publication_date),
                locale === 'ko' ? 'yyyy년 M월 d일' : 'yyyy-MM-dd'
              )}
            </Text>
            {author !== undefined && (
              <AuthorAvatar
                author={author}
                withName
                size="2"
                className={css({
                  mt: '4px',
                })}
                textProps={{ size: '2', color: 'gray', weight: 'regular' }}
              />
            )}
          </VStack>

          <HStack flexWrap="wrap" gap="4px">
            {original_works.map(originalWork => (
              <OriginalWorkHoverCard.Root key={originalWork.id}>
                <OriginalWorkHoverCard.Trigger>
                  <Link
                    href={`/original-work/${originalWork.id}`}
                    onClick={e => e.stopPropagation()}
                    className={css({
                      cursor: 'pointer',
                    })}
                  >
                    <GiSecretBook
                      color="gray"
                      className={css({
                        display: 'inline',
                        cursor: 'pointer',
                        color: 'gray.500',
                        mr: '2px',
                      })}
                      size="20px"
                    />
                    <Text
                      size="2"
                      color="gray"
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
          </HStack>
        </VStack>
      </VStack>
      <ReportDialog
        open={openReportDialog}
        onOpenChange={setOpenReportDialog}
        edition={edition}
      />
      <LoginAlertDialog
        open={openLoginAlertDialog}
        onOpenChange={setOpenLoginAlertDialog}
      />
    </>
  );
}
