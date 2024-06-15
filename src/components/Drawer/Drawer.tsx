import { ComponentProps } from 'react';
import ReactModernDrawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';

interface Props extends ComponentProps<typeof ReactModernDrawer> {}

export default function Drawer(props: Props) {
  return (
    <ReactModernDrawer overlayColor="transparent" duration={300} {...props} />
  );
}
