import { AlertDialog, Button } from '@radix-ui/themes';
import { ComponentProps } from 'react';
import { css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';

interface Props extends ComponentProps<typeof AlertDialog.Root> {
  onDelete?: () => void;
}

export default function DeleteConfirmDialog({ onDelete, ...props }: Props) {
  return (
    <AlertDialog.Root {...props}>
      <AlertDialog.Content maxWidth="400px">
        <AlertDialog.Title>Are you sure you want to delete?</AlertDialog.Title>
        <AlertDialog.Description>
          Deleted comments cannot be restored.
        </AlertDialog.Description>
        <HStack mt="30px" justify="end">
          <AlertDialog.Action>
            <Button
              onClick={() => {
                props.onOpenChange?.(false);
                onDelete?.();
              }}
              className={css({ cursor: 'pointer' })}
            >
              Delete
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
              Cancel
            </Button>
          </AlertDialog.Cancel>
        </HStack>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
