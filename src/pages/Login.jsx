import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import image from "../assets/login-page-image.svg";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import * as API from "../api/auth";
import * as AuthService from "../utils/authService";

const useStyles = makeStyles((theme) => ({
  margin: {
    marginBottom: theme.spacing(3),
  },
  button: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
}));

export const Login = () => {
  const classes = useStyles();
  const [loginValue, setLoginValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [showPassword, onShowPassword] = useState(false);
  const [loginError, onLoginError] = useState(false);
  const [passwordError, onPasswordError] = useState(false);

  let history = useHistory();

  return (
    <Wrapper>
      <LeftContainer>
        <Title>FeApp</Title>
        <Image src={image} />
      </LeftContainer>
      <MainContainer>
        <FormWrapper>
          <Text> Sign in to FeApp </Text>
          <SecondaryText> Enter your credentials below </SecondaryText>
          <FormControl variant="outlined" error={loginError}>
            <InputLabel htmlFor="outlined-adornment-password">Login</InputLabel>
            <OutlinedInput
              className={classes.margin}
              id="outlined-adornment-password"
              value={loginValue}
              onChange={(event) => {
                const newValue = event.target.value;
                setLoginValue(newValue);
              }}
              labelWidth={45}
            />
          </FormControl>
          <FormControl variant="outlined" error={passwordError}>
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              className={classes.margin}
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={passwordValue}
              onChange={(event) => {
                const newValue = event.target.value;
                setPasswordValue(newValue);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => onShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={75}
            />
          </FormControl>

          <Button
            variant="contained"
            className={classes.button}
            color="primary"
            disabled={
              loginValue.length === 0 ||
              passwordValue.length === 0 ||
              loginError ||
              passwordError
            }
            onClick={() => {
              API.userSignIn({
                login: loginValue,
                password: passwordValue,
              })
                .then((res) => {
                  AuthService.login("token");
                })
                .catch((e) => {
                  AuthService.login("errorToken");
                  history.push("/");
                });
            }}
          >
            Sign in
          </Button>
        </FormWrapper>
      </MainContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const LeftContainer = styled.div`
  min-width: 200px;
  width: 35%;
  padding: 0px 40px 0px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-right: 14px solid rgba(214, 214, 214, 0.4);
  @media (max-width: 700px) {
    display: none;
  }
`;

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Title = styled.span`
  font-size: 32px;
  margin-bottom: 40px;
  font-weight: 500;
`;

const Image = styled.img`
  width: 100%;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 20px;
  width: 70%;
  max-width: 700px;
`;

const Text = styled.span`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 6px;
`;
const SecondaryText = styled.span`
  font-size: 16px;
  margin-bottom: 32px;
`;
