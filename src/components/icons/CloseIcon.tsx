import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";
import { ReactComponent as svg } from "@assets/icon-cross.svg";

export default function CloseIcon(props: SvgIconProps) {
  return <SvgIcon component={svg} viewBox="0 0 15 15" {...props} />;
}
