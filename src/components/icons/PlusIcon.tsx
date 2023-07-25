import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";
import { ReactComponent as svg } from "@assets/icon-add-task-mobile.svg";

export default function PlusIcon(props: SvgIconProps) {
  return <SvgIcon component={svg} viewBox="0 0 12 12" {...props} />;
}
