import { Route, Redirect } from "react-router-dom";
import * as AuthService from "./authService";

const LoginRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        AuthService.isAuthenticated() === false ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default LoginRoute;
