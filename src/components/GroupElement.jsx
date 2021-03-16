import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import * as API_DATA from "../api/groups";
import { useEffect } from "react";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  groupElement: {
    marginBottom: "20px",
  },
  shortText: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  longText: {
    whiteSpace: "normal",
    overflow: "hidden",
  },
  card: {
    transition: "all 1s ease-out",
  },
}));

const GroupElement = ({ element, windowSize }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const { id, title, description, details } = element;
  const { url, openInNewTab, images } = details;

  const windowWidth = windowSize.width;
  const imageUrl = `http://${
    windowWidth > 700 ? details.images.desktop : details.images.mobile
  }`;

  return (
    <Card>
      <CardMedia
        className={classes.media}
        image={imageUrl}
        title="Paella dish"
      />
      <CardContent>
        <Typography
          variant="body1"
          color="textPrimary"
          component={url ? "a" : "span"}
          href={url ? url : null}
          target={openInNewTab ? "_blank" : "_self"}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          onClick={() => setExpanded(!expanded)}
          component="p"
          className={clsx(
            expanded ? classes.longText : classes.shortText,
            classes.card
          )}
        >
          {description}
        </Typography>
      </CardContent>
      {/* <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions> */}
    </Card>
  );
};

export default GroupElement;
