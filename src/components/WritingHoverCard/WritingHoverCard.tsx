import { WritingServerModel } from '@models/writing';
import { Avatar, HoverCard, Text } from '@radix-ui/themes';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { ComponentProps } from 'react';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';

interface WritingHoverCardContentProps
  extends ComponentProps<typeof HoverCard.Content> {
  writing: WritingServerModel;
}

function WritingHoverCardContent({
  writing,
  className,
  ...props
}: WritingHoverCardContentProps) {
  const { id, title, title_in_eng, title_in_kor, publication_date } = writing;

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
      side="top"
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();

        router.push(`/writing/${id}`);
      }}
      {...props}
    >
      <HStack alignItems="start" gap="20px">
        <Avatar
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Also_sprach_Zarathustra._Ein_Buch_f%C3%BCr_Alle_und_Keinen._In_drei_Theilen.jpg/440px-Also_sprach_Zarathustra._Ein_Buch_f%C3%BCr_Alle_und_Keinen._In_drei_Theilen.jpg"
          fallback="폴백"
          size="7"
        />
        <VStack alignItems="start" gap="0">
          <Text size="3" weight="bold">
            {title}
          </Text>
          <Text size="2" color="gray">
            {title_in_kor}
          </Text>
          <Text size="2" color="gray">
            {title_in_eng}
          </Text>
          <Text size="2" color="gray">
            {publication_date}
          </Text>
        </VStack>
      </HStack>
    </HoverCard.Content>
  );
}

function WritingHoverCard() {
  return <></>;
}

WritingHoverCard.Content = WritingHoverCardContent;
WritingHoverCard.Trigger = HoverCard.Trigger;
WritingHoverCard.Root = HoverCard.Root;

export default WritingHoverCard;
