import { WritingServerModel } from 'legacy_src/models/writing';
import { HstackProps, VStack } from 'styled-system/jsx';
import { Text } from '@radix-ui/themes';
import { css } from 'styled-system/css';
import { AuthorHoverCard } from 'legacy_src/components/AuthorHoverCard';
import { useRouter } from 'next/navigation';

interface Props extends HstackProps {
  writing: WritingServerModel;
}

export default function WritingInfo({ writing, ...props }: Props) {
  const router = useRouter();

  const { title, title_in_kor, title_in_eng, author, publication_date } =
    writing;

  return (
    <VStack gap="20px" alignItems="start" px="20px" {...props}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Also_sprach_Zarathustra._Ein_Buch_f%C3%BCr_Alle_und_Keinen._In_drei_Theilen.jpg/440px-Also_sprach_Zarathustra._Ein_Buch_f%C3%BCr_Alle_und_Keinen._In_drei_Theilen.jpg"
        width={200}
        className={css({ margin: '0 auto' })}
      />
      <VStack alignItems="start" gap="0px">
        <Text size="6" weight="bold">
          {title}
        </Text>
        <Text size="4">{title_in_eng}</Text>
        <Text size="4">{title_in_kor}</Text>
        <AuthorHoverCard.Root>
          <AuthorHoverCard.Trigger>
            <Text
              size="3"
              color="gray"
              className={css({
                cursor: 'pointer',
                _hover: {
                  textDecoration: 'underline',
                },
              })}
              onClick={() => router.push(`/author/${author.id}`)}
            >
              {author.name}
            </Text>
          </AuthorHoverCard.Trigger>
          <AuthorHoverCard.Content author={author} side="right" />
        </AuthorHoverCard.Root>
        <Text size="3" color="gray">
          {publication_date}
        </Text>
      </VStack>
    </VStack>
  );
}
