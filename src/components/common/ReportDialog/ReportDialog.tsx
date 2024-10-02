import { postReport } from '@apis/report';
import { currentUserAtom } from '@atoms/user';
import { AuthorServerModel } from '@models/author';
import { EditionServerModel } from '@models/edition';
import { OriginalWorkServerModel } from '@models/original-work';
import {
  AlertDialog,
  Button,
  Text,
  RadioCards,
  TextArea,
} from '@radix-ui/themes';
import { useMutation } from '@tanstack/react-query';
import { getTypeIdByType } from '@utils/common';
import { getJosaPicker } from 'josa';
import { useAtomValue } from 'jotai';
import { useTranslations } from 'next-intl';
import { ComponentProps, useState } from 'react';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';

const AUTHOR_REPORT_RADIO_CARD_ITEMS = [
  {
    tKey: 'report_dialog_radio_cards_item_author_info_description',
    value: 'author',
  },
  {
    tKey: 'report_dialog_radio_cards_item_original_work_description',
    value: 'original-work',
  },
  {
    tKey: 'report_dialog_radio_cards_item_edition_description',
    value: 'edition',
  },
];

const ORIGINAL_WORK_REPORT_RADIO_CARD_ITEMS = [
  {
    tKey: 'report_dialog_radio_cards_item_original_work_description',
    value: 'original-work',
  },
  {
    tKey: 'report_dialog_radio_cards_item_edition_description',
    value: 'edition',
  },
];

const EDITION_REPORT_RADIO_CARD_ITEMS = [
  {
    tKey: 'report_dialog_radio_cards_item_edition_description',
    value: 'edition',
  },
  {
    tKey: 'report_dialog_radio_cards_item_original_work_description',
    value: 'original-work',
  },
];

interface Props extends ComponentProps<typeof AlertDialog.Root> {
  onReport?: () => void;
  author?: AuthorServerModel;
  originalWork?: OriginalWorkServerModel;
  edition?: EditionServerModel;
}

export default function ReportDialog({
  onReport,
  author,
  originalWork,
  edition,
  ...props
}: Props) {
  const t = useTranslations('Common');

  const [reportText, setReportText] = useState('');

  const isAuthorReportDialog = author !== undefined;
  const isOriginalWorkReportDialog = originalWork !== undefined;
  const isEditionReportDialog = edition !== undefined;
  const originType = isAuthorReportDialog
    ? 'author'
    : isOriginalWorkReportDialog
      ? 'original-work'
      : 'edition';

  const [selectedReportType, setSelectedReportType] = useState<
    'author' | 'original-work' | 'edition'
  >(
    isAuthorReportDialog
      ? 'author'
      : isOriginalWorkReportDialog
        ? 'original-work'
        : 'edition'
  );

  const targetInKr = isAuthorReportDialog
    ? author?.name_in_kor
    : isOriginalWorkReportDialog
      ? originalWork?.title_in_kor
      : edition?.title;

  const target = isAuthorReportDialog
    ? author?.name
    : isOriginalWorkReportDialog
      ? originalWork?.title
      : edition?.title;

  const currentUser = useAtomValue(currentUserAtom);

  const { mutate: mutatePostReport } = useMutation({
    mutationFn: () => {
      if (currentUser === null) {
        throw new Error('User is not logged in');
      }

      return postReport({
        user_id: currentUser.id,
        origin_type_id: getTypeIdByType(originType),
        type_id: getTypeIdByType(selectedReportType),
        description: reportText === '' ? undefined : reportText,
      });
    },
    onSuccess: () => {
      props.onOpenChange?.(false);
      setReportText('');
    },
  });

  return (
    <AlertDialog.Root {...props}>
      <AlertDialog.Content maxWidth="600px">
        <AlertDialog.Title>
          {t.rich('report_dialog_title', {
            targetInKr,
            target,
            Josa: () => targetInKr != null && getJosaPicker('와')(targetInKr),
          })}
        </AlertDialog.Title>
        <AlertDialog.Description />
        <VStack alignItems="start" width="100%" py="10px" gap="20px">
          <RadioCards.Root
            defaultValue={selectedReportType}
            onValueChange={value =>
              setSelectedReportType(
                value as 'author' | 'original-work' | 'edition'
              )
            }
          >
            <VStack alignItems="start" gap="4px" width="100%">
              {isAuthorReportDialog &&
                AUTHOR_REPORT_RADIO_CARD_ITEMS.map(item => (
                  <RadioCards.Item
                    key={item.value}
                    value={item.value}
                    className={css({ cursor: 'pointer', padding: '10px' })}
                  >
                    {t(item.tKey)}
                  </RadioCards.Item>
                ))}
              {isOriginalWorkReportDialog &&
                ORIGINAL_WORK_REPORT_RADIO_CARD_ITEMS.map(item => (
                  <RadioCards.Item
                    key={item.value}
                    value={item.value}
                    className={css({ cursor: 'pointer', padding: '10px' })}
                  >
                    {t(item.tKey)}
                  </RadioCards.Item>
                ))}
              {isEditionReportDialog &&
                EDITION_REPORT_RADIO_CARD_ITEMS.map(item => (
                  <RadioCards.Item
                    key={item.value}
                    value={item.value}
                    className={css({ cursor: 'pointer', padding: '10px' })}
                  >
                    {t(item.tKey)}
                  </RadioCards.Item>
                ))}
            </VStack>
          </RadioCards.Root>
          <VStack gap="4px" alignItems="start" width="100%">
            <Text size="2">{t('report_dialog_text_area_description')}</Text>
            <TextArea
              value={reportText}
              onChange={e => setReportText(e.currentTarget.value)}
              className={css({ width: '100%' })}
            />
          </VStack>
        </VStack>
        <HStack mt="30px" justify="end">
          <AlertDialog.Action onClick={e => e.preventDefault()}>
            <Button
              onClick={() => {
                mutatePostReport();
                onReport?.();
              }}
              className={css({ cursor: 'pointer' })}
            >
              {t('report')}
            </Button>
          </AlertDialog.Action>
          <AlertDialog.Cancel>
            <Button
              variant="outline"
              onClick={() => {
                props.onOpenChange?.(false);
              }}
              className={css({ cursor: 'pointer' })}
            >
              {t('cancel')}
            </Button>
          </AlertDialog.Cancel>
        </HStack>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
