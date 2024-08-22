import { OriginalWorkServerModel } from '@models/original_work';
import { Avatar, HoverCard, Text, Tooltip } from '@radix-ui/themes';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { ComponentProps } from 'react';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';

interface OriginalWorkHoverCardContentProps
  extends ComponentProps<typeof HoverCard.Content> {
  originalWork: OriginalWorkServerModel;
}

function OriginalWorkHoverCardContent({
  originalWork,
  className,
  ...props
}: OriginalWorkHoverCardContentProps) {
  const { id, title, title_in_eng, author, publication_date } = originalWork;

  const router = useRouter();

  return (
    <HoverCard.Content
      className={classNames(
        css({
          padding: '20px',
          cursor: 'pointer',
          width: '400px',
        }),
        className
      )}
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();

        router.push(`/original_work/${id}`);
      }}
      {...props}
    >
      <HStack alignItems="start" gap="20px">
        <Avatar
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Also_sprach_Zarathustra._Ein_Buch_f%C3%BCr_Alle_und_Keinen._In_drei_Theilen.jpg/440px-Also_sprach_Zarathustra._Ein_Buch_f%C3%BCr_Alle_und_Keinen._In_drei_Theilen.jpg"
          fallback="폴백"
          size="7"
        />
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
                className={css({ color: 'gray.700' })}
              >
                {title_in_eng}
              </Text>
            </Tooltip>
            <Text size="2" color="gray">
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
        </VStack>
      </HStack>
    </HoverCard.Content>
  );
}

function OriginalWorkHoverCard() {
  return <></>;
}

OriginalWorkHoverCard.Content = OriginalWorkHoverCardContent;
OriginalWorkHoverCard.Trigger = HoverCard.Trigger;
OriginalWorkHoverCard.Root = HoverCard.Root;

export default OriginalWorkHoverCard;
