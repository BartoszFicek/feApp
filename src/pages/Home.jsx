import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import styled from "styled-components";
import { Grid, Col, Row } from "react-flexbox-grid";
import * as AuthService from "../utils/authService";
import * as API_DATA from "../api/groups";
import { useEffect } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { red } from "@material-ui/core/colors";
import GroupElement from "../components/GroupElement";
import useWindowSize from "../utils/useWindowSize";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  groupElement: {
    marginBottom: "20px",
  },
}));

export const Home = () => {
  const classes = useStyles();
  const [data, setData] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);
  const history = useHistory();
  const windowSize = useWindowSize();

  useEffect(() => {
    API_DATA.getGroupsData()
      .then(({ data }) => {
        setData(data);
        setDataLoading(false);
      })
      .catch((e) => console.log("error"));
  }, []);

  return (
    <Wrapper>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            FeApp
          </Typography>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => {
              AuthService.logout();
              history.push("/login");
            }}
            color="inherit"
          >
            <ExitToAppRoundedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Grid>
        {dataLoading ? (
          <LinearProgress />
        ) : (
          data &&
          data.groups &&
          data.groups.map((group) => (
            <>
              <Row key={group.id}>
                <SectionTitle>{group.title}</SectionTitle>
              </Row>
              <Row>
                {group.elements.map((element) => (
                  <Col
                    xs={12}
                    sm={6}
                    md={6}
                    lg={3}
                    className={classes.groupElement}
                  >
                    <GroupElement element={element} windowSize={windowSize} />
                  </Col>
                ))}
              </Row>
            </>
          ))
        )}
      </Grid>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  margin-top: 100px;
  padding-bottom: 50px;
`;

const SectionTitle = styled.span`
  font-size: 26px;
  font-weight: 500;
  margin-bottom: 20px;
`;
