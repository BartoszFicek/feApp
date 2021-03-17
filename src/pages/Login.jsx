import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import styled from "styled-components";
import * as yup from "yup";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Visibility from "@material-ui/icons/Visibility";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import * as AuthService from "../utils/authService";
import image from "../assets/login-page-image.svg";
import shape2 from "../assets/shape2.png";
import * as API from "../api/auth";

const useStyles = makeStyles((theme) => ({
  margin: {
    marginBottom: theme.spacing(3),
  },
  button: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
}));

const validationSchema = yup.object({
  login: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .matches(/[a-z]/, "At least one lowercase char required")
    .matches(/[A-Z]/, "At least one uppercase char required")
    .matches(
      /[a-zA-Z]+[^a-zA-Z\s]+/,
      "At least one special char required (@,!,#, etc)."
    )
    .required("Password is required"),
});

export const Login = () => {
  const classes = useStyles();
  const [showPassword, onShowPassword] = useState(false);
  const [authError, setAuthError] = useState(null);

  const { enqueueSnackbar } = useSnackbar();
  let history = useHistory();

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      API.userSignIn(values)
        .then((res) => {
          AuthService.login(res.data.userId);
          history.push("/");
          enqueueSnackbar(`Welcome back ${res.data.userName}`, {
            variant: "success",
          });
        })
        .catch((e) => {
          enqueueSnackbar("Something went wrong. Try again", {
            variant: "error",
          });
          setAuthError(e.response.data.errorMessage);
        });
    },
  });

  return (
    <Wrapper>
      <RightBottomCornerShape src={shape2} />
      <LeftContainer>
        <Title>FeApp</Title>
        <Image src={image} />
      </LeftContainer>
      <MainContainer>
        <FormWrapper onSubmit={formik.handleSubmit}>
          <Text> Sign in to FeApp </Text>
          <SecondaryText> Enter your credentials below </SecondaryText>
          <TextField
            id="login"
            name="login"
            className={classes.margin}
            value={formik.values.login}
            onChange={(val) => {
              if (authError) setAuthError(null);
              formik.handleChange(val);
            }}
            labelWidth={45}
            label={"Login"}
            variant="outlined"
            type={"text"}
            error={formik.touched.login && Boolean(formik.errors.login)}
            helperText={formik.touched.login && formik.errors.login}
          />
          <TextField
            id="password"
            name="password"
            className={classes.margin}
            value={formik.values.password}
            onChange={(val) => {
              if (authError) setAuthError(null);
              formik.handleChange(val);
            }}
            labelWidth={75}
            label={"Password"}
            variant="outlined"
            type={showPassword ? "text" : "password"}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => onShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {authError && <FormHelperText error>{authError}</FormHelperText>}

          <Button
            variant="contained"
            className={classes.button}
            color="primary"
            disabled={
              authError ||
              formik.values.login.length === 0 ||
              formik.values.password.length === 0 ||
              (formik.touched.login && Boolean(formik.errors.login)) ||
              (formik.touched.password && Boolean(formik.errors.password))
            }
            type="submit"
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

const RightBottomCornerShape = styled.img`
  position: absolute;
  z-index: 1;
  right: 0;
  bottom: 0;
  opacity: 0.6;
`;

const LeftContainer = styled.div`
  min-width: 200px;
  z-index: 5;
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
  z-index: 5;
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

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 20px;
  width: 70%;
  max-width: 700px;
  background: #fff;
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
