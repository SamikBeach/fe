import { HStack, VStack } from 'styled-system/jsx';
import { Avatar, Text, Tooltip } from '@radix-ui/themes';
import { css } from 'styled-system/css';
import { HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  addOriginalWorkLike,
  getOriginalWorkById,
  getOriginalWorkLikeCount,
  getMyOriginalWorkLikeExist,
  removeOriginalWorkLike,
} from '@apis/original-work';
import { useAtomValue } from 'jotai';
import { currentUserAtom } from '@atoms/user';
import { useParams } from 'next/navigation';
import OriginalWorkBasicInfoSkeleton from './OriginalWorkBasicInfoSkeleton';
import { getPublicationDateText } from '@utils/original-work';
import { useLocale, useTranslations } from 'next-intl';
import { GiSecretBook } from 'react-icons/gi';
import { AuthorAvatar } from '@components/author/AuthorAvatar';
import { useState } from 'react';
import { AiOutlineAlert } from 'react-icons/ai';
import { ReportDialog } from '@components/common/ReportDialog';
import { LoginAlertDialog } from '@components/common/LoginAlertDialog';

export default function OriginalWorkInfo() {
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

  const { id, title, title_in_kor, title_in_eng, author } = originalWork ?? {
    id: 0,
    title: '',
    title_in_eng: '',
    publication_date: '',
    publication_date_is_bc: 0,
  };

  const currentUser = useAtomValue(currentUserAtom);

  const { mutate: addLike } = useMutation({
    mutationFn: () => {
      if (currentUser === null) {
        throw new Error('User is not logged in');
      }

      return addOriginalWorkLike({
        originalWorkId: id,
        userId: currentUser.id,
      });
    },
    onSuccess: () => {
      refetchOriginalWorkLike();
      refetchOriginalWorkAllLikes();
    },
  });

  const { mutate: removeLike } = useMutation({
    mutationFn: () => {
      if (currentUser === null) {
        throw new Error('User is not logged in');
      }

      return removeOriginalWorkLike({
        originalWorkId: id,
        userId: currentUser.id,
      });
    },
    onSuccess: () => {
      refetchOriginalWorkLike();
      refetchOriginalWorkAllLikes();
    },
  });

  const {
    data: originalWorkLike,
    isLoading: isLoadingOriginalWorkLike,
    refetch: refetchOriginalWorkLike,
  } = useQuery({
    queryKey: ['original-work-like', id],
    queryFn: () => {
      if (currentUser === null) {
        throw new Error('User is not logged in');
      }

      return getMyOriginalWorkLikeExist({
        originalWorkId: id,
        userId: currentUser.id,
      });
    },
    enabled: currentUser != null,
    select: response => response.data,
  });

  console.log({ originalWorkLike });
  const {
    data: originalWorkAllLikes,
    isLoading: isLoadingOriginalWorkAllLikes,
    refetch: refetchOriginalWorkAllLikes,
  } = useQuery({
    queryKey: ['original-work-like/count', id],
    queryFn: () => getOriginalWorkLikeCount({ originalWorkId: id }),
    select: response => response.data.count,
  });

  const isLoading =
    isLoadingOriginalWork ||
    isLoadingOriginalWorkLike ||
    isLoadingOriginalWorkAllLikes;

  console.log({
    isLoading,
    isLoadingOriginalWork,
    isLoadingOriginalWorkLike,
    isLoadingOriginalWorkAllLikes,
  });

  if (isLoading) {
    return <OriginalWorkBasicInfoSkeleton />;
  }

  return (
    <>
      <VStack alignItems="start" gap="20px" width="100%">
        <VStack position="relative" width="100%">
          <Avatar
            radius="full"
            fallback={
              <GiSecretBook
                className={css({
                  color: 'gray.500',
                })}
                size="40px"
              />
            }
            size="9"
          />
          <HStack
            className={css({
              zIndex: 2,
              position: 'absolute',
              right: '20px',
              bottom: '0px',
            })}
            gap="2px"
          >
            <Text size="5" color="gray" className={css({ userSelect: 'none' })}>
              {originalWorkAllLikes}
            </Text>
            {originalWorkLike?.isExist ? (
              <HeartFilledIcon
                color="gray"
                width="22px"
                height="22px"
                cursor="pointer"
                onClick={() => removeLike()}
              />
            ) : (
              <HeartIcon
                color="gray"
                width="22px"
                height="22px"
                cursor="pointer"
                onClick={() => {
                  if (currentUser === null) {
                    setOpenLoginAlertDialog(true);

                    return;
                  }

                  addLike();
                }}
              />
            )}
          </HStack>
        </VStack>
        <VStack alignItems="start" gap="2px">
          <HStack>
            <Text size="6" weight="bold">
              {title_in_kor}
            </Text>
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
