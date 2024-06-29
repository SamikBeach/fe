import { PlusIcon } from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';

function PlusButtonNode() {
  return (
    <IconButton
      onClick={() => {
        console.log('clicked');
      }}
    >
      <PlusIcon />
    </IconButton>
  );
}

export default PlusButtonNode;
