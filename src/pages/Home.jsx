import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Grid, Col, Row } from "react-flexbox-grid";
import styled from "styled-components";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import GroupElement from "../components/GroupElement";
import * as AuthService from "../utils/authService";
import useWindowSize from "../utils/useWindowSize";
import * as API_DATA from "../api/groups";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
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
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    API_DATA.getGroupsData()
      .then(({ data }) => {
        setData(data);
        setDataLoading(false);
      })
      .catch((e) =>
        enqueueSnackbar("Get data error. Reload page", {
          variant: "error",
        })
      );
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
            <div key={group.id}>
              <Row key={group.id}>
                <Col xs={12}>
                  <SectionTitle>{group.title}</SectionTitle>
                </Col>
              </Row>
              <Row>
                {group.elements.map((element) => (
                  <Col
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    className={classes.groupElement}
                    key={element.id}
                  >
                    <GroupElement
                      element={element}
                      windowSize={windowSize}
                      groupTitle={group.title}
                      appName={data.appName}
                    />
                  </Col>
                ))}
              </Row>
            </div>
          ))
        )}
      </Grid>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  margin-top: 80px;
`;

const SectionTitle = styled.div`
  font-size: 26px;
  font-weight: 500;
  margin-top: 20px;
  margin-bottom: 20px;
`;
