import { OriginalWorkServerModel } from '@models/original_work';
import { ChatBubbleIcon, HeartFilledIcon } from '@radix-ui/react-icons';
import { Avatar, Text, Tooltip } from '@radix-ui/themes';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';

interface Props {
  originalWork: OriginalWorkServerModel;
}

export default function OriginalWorkItem({ originalWork }: Props) {
  const {
    title,
    title_in_eng,
    author,
    publication_date,
    publication_date_is_bc,
  } = originalWork;

  return (
    <HStack
      gap="20px"
      border="1px solid"
      borderColor="gray.200"
      padding="16px"
      borderRadius="8px"
      width="386px"
      height="130px"
      className={css({ cursor: 'pointer' })}
    >
      <Avatar
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Also_sprach_Zarathustra._Ein_Buch_f%C3%BCr_Alle_und_Keinen._In_drei_Theilen.jpg/440px-Also_sprach_Zarathustra._Ein_Buch_f%C3%BCr_Alle_und_Keinen._In_drei_Theilen.jpg"
        fallback="폴백"
        size="7"
      />
      <VStack alignItems="start" gap="0">
        <VStack alignItems="start" gap="0">
          <Tooltip content={title}>
            <Text
              size="3"
              weight="bold"
              className={css({
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                maxWidth: '240px',
              })}
            >
              {title}
            </Text>
          </Tooltip>
          <Tooltip content={title_in_eng}>
            <Text
              size="2"
              color="gray"
              className={css({
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                maxWidth: '240px',
              })}
            >
              {title_in_eng}
            </Text>
          </Tooltip>
          <Text size="2" color="gray">
            {publication_date_is_bc === 1 ? 'BC' : ''}
            {publication_date}
          </Text>
          <Text size="2" color="gray">
            {author.name}
          </Text>
        </VStack>
        <HStack>
          <Text size="2" color="gray">
            25 editions
          </Text>
          <HStack gap="3px">
            <Text size="2" color="gray">
              351
            </Text>
            <HeartFilledIcon color="gray" />
          </HStack>
          <HStack gap="3px">
            <Text size="2" color="gray">
              12
            </Text>
            <ChatBubbleIcon color="gray" />
          </HStack>
        </HStack>
      </VStack>
    </HStack>
  );
}