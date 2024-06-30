import { HStack } from 'styled-system/jsx';
import { Text } from '@radix-ui/themes';
import { WritingServerModel } from '@models/writing';

interface Props {
  writings?: WritingServerModel[];
}

export default function WritingList({ writings = [] }: Props) {
  return (
    <HStack>
      {[1, 2, 3].map(() => (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Also_sprach_Zarathustra._Ein_Buch_f%C3%BCr_Alle_und_Keinen._In_drei_Theilen.jpg/440px-Also_sprach_Zarathustra._Ein_Buch_f%C3%BCr_Alle_und_Keinen._In_drei_Theilen.jpg"
          width={23}
          height={30}
        />
      ))}
      <Text size="1">{writings.length} writings</Text>
    </HStack>
  );
}
