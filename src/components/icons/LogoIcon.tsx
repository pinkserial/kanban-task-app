import SvgIcon from "@mui/material/SvgIcon";
import { ReactComponent as svg } from "@assets/logo-dark.svg";

export default function LogoIcon() {
  return (
    <SvgIcon
      sx={{ width: "153px", height: "26px" }}
      component={svg}
      inheritViewBox
    />
  );
}
