import Box from "@mui/material/Box";
import styled from "@mui/material/styles/styled";
import SunIcon from "@icons/SunIcon";
import Switch from "@mui/material/Switch";
import MoonIcon from "@icons/MoonIcon";
import useTheme from "@hooks/useTheme";

const ToggleBox = styled(Box)({
  mx: 2,
  p: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  borderRadius: "5px",
});

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  const handleChange = () => {
    toggle(theme.palette.mode);
  };

  return (
    <ToggleBox>
      <SunIcon />
      <Switch checked={theme.palette.mode === "dark"} onChange={handleChange} />
      <MoonIcon />
    </ToggleBox>
  );
}
