import { OriginalWorkServerModel } from '@models/original-work';
import { ChatBubbleIcon, HeartFilledIcon } from '@radix-ui/react-icons';
import { Avatar, Tooltip, Text } from '@radix-ui/themes';
import Link from 'next/link';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';

interface Props {
  originalWork: OriginalWorkServerModel;
}

export default function OringinalWorkItemInner({ originalWork }: Props) {
  const {
    title,
    title_in_eng,
    author,
    publication_date,
    publication_date_is_bc,
  } = originalWork;

  return (
    <HStack gap="20px">
      <Link href={`/original-work/${originalWork.id}`}>
        <Avatar
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Also_sprach_Zarathustra._Ein_Buch_f%C3%BCr_Alle_und_Keinen._In_drei_Theilen.jpg/440px-Also_sprach_Zarathustra._Ein_Buch_f%C3%BCr_Alle_und_Keinen._In_drei_Theilen.jpg"
          fallback="폴백"
          size="7"
        />
      </Link>
      <VStack alignItems="start" gap="4px">
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
              weight="medium"
              className={css({
                color: 'gray.700',
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
        </VStack>

        <HStack gap="4px">
          <Avatar
            src={author.image_url ?? undefined}
            fallback={author.name[0]}
            size="1"
            radius="full"
          />
          <Text size="2" color="gray">
            {author.name}
          </Text>
        </HStack>

        <HStack gap="8px">
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
