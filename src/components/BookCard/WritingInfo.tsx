import { Text } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';

export default function WritingInfo() {
  const router = useRouter();

  return (
    <>
      <Text weight="bold">related writings</Text>
      <HStack
        className={css({ cursor: 'pointer' })}
        onClick={() => router.push(`/writing/${3}`)}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Also_sprach_Zarathustra._Ein_Buch_f%C3%BCr_Alle_und_Keinen._In_drei_Theilen.jpg/440px-Also_sprach_Zarathustra._Ein_Buch_f%C3%BCr_Alle_und_Keinen._In_drei_Theilen.jpg"
          height={50}
          width={40}
        />
        <Text>Also Sprach Zarathustra</Text>
      </HStack>
    </>
  );
}
