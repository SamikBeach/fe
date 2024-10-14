import { HStack, VStack } from 'styled-system/jsx';
import { Avatar, Text, Tooltip } from '@radix-ui/themes';
import { css } from 'styled-system/css';
import { useQuery } from '@tanstack/react-query';
import { getOriginalWorkById } from '@apis/original-work';
import { useParams } from 'next/navigation';
import OriginalWorkBasicInfoSectionSkeleton from './OriginalWorkBasicInfoSectionSkeleton';
import { getPublicationDateText } from '@utils/original-work';
import { useLocale, useTranslations } from 'next-intl';
import { AuthorAvatar } from '@components/author/AuthorAvatar';
import { useState } from 'react';
import { AiOutlineAlert } from 'react-icons/ai';
import { ReportDialog } from '@components/common/ReportDialog';
import { LoginAlertDialog } from '@components/common/LoginAlertDialog';
import { GiSecretBook } from 'react-icons/gi';

export default function OriginalWorkBasicInfoSection({
  isOverThreshold,
}: {
  isOverThreshold: boolean;
}) {
  const locale = useLocale();

  const t = useTranslations('Common');

  const params = useParams();
  const originalWorkId = Number(params.id);

  const [openReportDialog, setOpenReportDialog] = useState(false);
  const [openLoginAlertDialog, setOpenLoginAlertDialog] = useState(false);

  const { data: originalWork, isLoading: isLoadingOriginalWork } = useQuery({
    queryKey: ['original-work', params.id],
    queryFn: () => getOriginalWorkById({ id: originalWorkId }),
    select: response => response.data,
  });

  const { title, title_in_kor, title_in_eng, author } = originalWork ?? {
    title: '',
    title_in_eng: '',
    publication_date: '',
    publication_date_is_bc: 0,
  };

  if (isLoadingOriginalWork) {
    return <OriginalWorkBasicInfoSectionSkeleton />;
  }

  return (
    <>
      <VStack alignItems="start" gap="2px" width="100%" px="10px">
        <HStack>
          <HStack gap={isOverThreshold ? '8px' : '0px'}>
            <Avatar
              radius="full"
              fallback={
                <GiSecretBook
                  className={css({
                    color: 'gray.500',
                  })}
                  size="16px"
                />
              }
              className={css({
                width: isOverThreshold ? '30px' : '0px',
                height: isOverThreshold ? '30px' : '0px',

                transition: 'width 0.2s ease-in-out',
              })}
            />
            <Text size="6" weight="bold">
              {title_in_kor}
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

        <Text size="3">{title_in_eng}</Text>
        <Text size="3" color="gray">
          {title}
        </Text>
        {originalWork !== undefined && (
          <Text size="3" color="gray">
            {getPublicationDateText({ originalWork, locale })}
          </Text>
        )}
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
      <ReportDialog
        open={openReportDialog}
        onOpenChange={setOpenReportDialog}
        originalWork={originalWork}
      />
      <LoginAlertDialog
        open={openLoginAlertDialog}
        onOpenChange={setOpenLoginAlertDialog}
      />
    </>
  );
}
