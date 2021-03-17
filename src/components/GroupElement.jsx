import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import clsx from "clsx";
import CardContent from "@material-ui/core/CardContent";

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
    maxWidth: "calc(100vw - 70px)",
  },
  longText: {
    whiteSpace: "normal",
    overflow: "hidden",
  },
  photo: {
    width: "100%",
    maxHeight: "calc(100vh - 80px)",
  },
}));

const GroupElement = ({ element, windowSize, groupTitle, appName }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const { title, description, details } = element;
  const { url, openInNewTab } = details;

  const windowWidth = windowSize.width;
  const imageUrl =
    windowWidth > 700 ? details.images.desktop : details.images.mobile;

  return (
    <Box>
      <Content>
        {imageUrl && (
          <img
            alt={`${appName} - ${groupTitle} - ${title}`}
            src={`http://${imageUrl}`}
            className={classes.photo}
          />
        )}

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
      </Content>
      <Inner></Inner>
    </Box>
  );
};

export default GroupElement;
const Content = styled.div`
  position: relative;
  z-index: 2000;
  background: transparent;
`;
const Inner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all 0.3s;
  opacity: 0;
  background-image: linear-gradient(
    180deg,
    rgba(194, 209, 237, 1) 0%,
    rgba(222, 176, 247, 0.5) 48%,
    rgba(108, 99, 255, 0.024247198879551846) 100%
  );
`;

const Box = styled.div`
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  position: relative;
  overflow: hidden;

  z-index: 1;
  width: 100%;
  transition: all 0.3s;

  ::before {
    position: absolute;
    content: "";
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 15px;
    background-image: linear-gradient(
      0,
      rgba(194, 209, 237, 1) 0%,
      rgba(222, 176, 247, 0.5) 48%,
      rgba(108, 99, 255, 0.024247198879551846) 100%
    );
    z-index: 1;
    opacity: 1;
    transition: all 0.3s;
  }

  &:hover {
    ::before {
      opacity: 0;
    }
    ${Inner} {
      opacity: 1;
    }
  }

  :hover {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px,
      rgba(0, 0, 0, 0.1) 0px 2px 4px 0px,
      rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
    transform: translateY(-10px);
  }
`;
