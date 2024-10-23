import { HStack, VStack, VstackProps } from 'styled-system/jsx';
import { Avatar, Text, Tooltip } from '@radix-ui/themes';
import { getBornAndDiedDateText } from '@utils/author';
import { css } from 'styled-system/css';
import { useQuery } from '@tanstack/react-query';
import { getAuthorById } from '@apis/author';
import { useParams } from 'next/navigation';
import AuthorBasicInfoSectionSkeleton from './AuthorBasicInfoSectionSkeleton';
import { useLocale, useTranslations } from 'next-intl';
import { AiOutlineAlert } from 'react-icons/ai';
import { ReportDialog } from '@components/common/ReportDialog';
import { useState } from 'react';
import { LoginAlertDialog } from '@components/common/LoginAlertDialog';

interface Props extends VstackProps {
  isOverThreshold: boolean;
}

export default function AuthorBasicInfoSection({
  isOverThreshold,
  ...props
}: Props) {
  const locale = useLocale();

  const t = useTranslations('Common');

  const [openReportDialog, setOpenReportDialog] = useState(false);
  const [openLoginAlertDialog, setOpenLoginAlertDialog] = useState(false);

  const params = useParams();
  const authorId = Number(params.id);

  const { data: author, isLoading: isLoadingAuthor } = useQuery({
    queryKey: ['author', params.id],
    queryFn: () => getAuthorById({ id: authorId }),
    select: response => response.data,
  });

  const {
    name,
    name_in_kor,
    image_url,
    born_date,
    died_date,
    born_date_is_bc,
    died_date_is_bc,
  } = author ?? {
    name: '',
    name_in_kor: '',
    image_url: '',
    born_date: '',
    died_date: '',
    born_date_is_bc: 0,
    died_date_is_bc: 0,
  };

  if (isLoadingAuthor) {
    return <AuthorBasicInfoSectionSkeleton py="1px" />;
  }

  return (
    <>
      <VStack alignItems="start" gap="2px" width="100%" px="10px" {...props}>
        <HStack>
          <HStack gap={isOverThreshold ? '8px' : '0px'}>
            <Avatar
              radius="full"
              src={image_url ?? undefined}
              fallback={name}
              className={css({
                width: isOverThreshold ? '30px' : '0px',
                height: isOverThreshold ? '30px' : '0px',

                transition: 'width 0.2s ease-in-out',
              })}
            />
            <Text size="6" weight="bold">
              {name_in_kor}
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

        <Text size="3">{name}</Text>

        <Text size="3" color="gray">
          {getBornAndDiedDateText({
            bornDate: born_date,
            diedDate: died_date,
            bornDateIsBc: born_date_is_bc === 1,
            diedDateIsBc: died_date_is_bc === 1,
            locale,
          })}
        </Text>
      </VStack>

      <ReportDialog
        open={openReportDialog}
        onOpenChange={setOpenReportDialog}
        author={author}
      />
      <LoginAlertDialog
        open={openLoginAlertDialog}
        onOpenChange={setOpenLoginAlertDialog}
      />
    </>
  );
}
