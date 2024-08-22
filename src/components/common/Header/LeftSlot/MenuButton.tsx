import { Button, ButtonProps } from '@radix-ui/themes';
import classNames from 'classnames';
import { css } from 'styled-system/css';

interface Props extends ButtonProps {}

export default function MenuButton({ children, className, ...props }: Props) {
  return (
    <Button
      asChild
      variant="ghost"
      size="3"
      className={classNames(
        css({
          color: 'black',
          fontWeight: 'medium',
        }),
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
