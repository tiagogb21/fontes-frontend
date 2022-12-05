import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../../styles/theme";

interface IHeader {
    title: string;
    subtitle: string;
}

const ProjectHeader = (props: IHeader) => {
  const { title, subtitle } = props;

  const theme = useTheme();

  const colors = tokens(theme.palette.mode);

  return (
    <Box mb="30px">
      <Typography
        variant="h2"
        color="#2C3E50"
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography
        variant="h5"
        color={colors.greenAccent[400]}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

export default ProjectHeader;
