import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { formatDate } from "@fullcalendar/react";
import { IEvent } from "../../interfaces/calendar.interface";
import { tokens } from "../../styles/theme";

interface Props {
  currentProjects: IEvent[];
}

const ProjectListItem = ({ currentProjects } : Props) => {
  const theme = useTheme();

  const colors = tokens(theme.palette.mode);

  return (
    <List>
      {
        currentProjects.map((event: IEvent) => (
          <ListItem
            key={event.id}
            sx={{
              backgroundColor: colors.greenAccent[500],
              margin: "10px 0",
              borderRadius: "2px",
            }}
          >
            <ListItemText
              primary={event.title}
              secondary={
                <Typography>
                  {formatDate(event.start, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </Typography>
              }
            />
          </ListItem>
        ))
      }
    </List>
  );
};

export default ProjectListItem;
