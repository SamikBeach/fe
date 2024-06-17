import { SidePeek } from '@elements/SidePeek';
import { Text } from '@radix-ui/themes';
import { ComponentProps, ReactNode } from 'react';

interface Props extends ComponentProps<typeof SidePeek.Root> {
  children: ReactNode;
}

export default function AuthorSidePeek({ children, ...props }: Props) {
  return (
    <SidePeek.Root modal={false} {...props}>
      {children}
      <SidePeek.Portal>
        <SidePeek.Content>
          <img
            src="https://t2.gstatic.com/licensed-image?q=tbn:ANd9GcS3F15vW2p-W1vemKEkViypH0pjICfqHDzzuhC87bVXDYeysTmfYY9tD-M5-UyBr-Uo"
            width={100}
          />
          <Text>니체</Text>
        </SidePeek.Content>
      </SidePeek.Portal>
    </SidePeek.Root>
  );
}

AuthorSidePeek.Trigger = SidePeek.Trigger;
