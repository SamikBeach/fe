import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

interface Props
  extends DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {}

export default function Logo({ width = 60, ...props }: Props) {
  return (
    <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4-o3irRd7LPhII83VTHDk_SeHLXeD6FNWdQ&s"
      alt="Logo"
      width={width}
      {...props}
    />
  );
}
