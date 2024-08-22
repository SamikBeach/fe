import * as Dialog from '@radix-ui/react-dialog';
import { ReactNode } from 'react';
import CloseButton from './CloseButton';
import Content from './Content';
import Overlay from './Overlay';

import './side-peek.css';

interface Props {
  children: ReactNode;
}

export default function SidePeek({ children }: Props) {
  return children;
}

SidePeek.Overlay = Overlay;
SidePeek.Content = Content;
SidePeek.CloseButton = CloseButton;
SidePeek.Root = Dialog.Root;
SidePeek.Trigger = Dialog.Trigger;
SidePeek.Portal = Dialog.Portal;
SidePeek.Close = Dialog.Close;
SidePeek.Title = Dialog.Title;
SidePeek.Description = Dialog.Description;
