import { BrowserRouter as Router, Switch } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import ProtectedRoute from "./utils/ProtectedRoute";
import LoginRoute from "./utils/LoginRoute";
import * as Pages from "./pages";
import "./App.css";

function App() {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <Router>
        <Switch>
          <LoginRoute path="/login" component={Pages.Login} />
          <ProtectedRoute path="/" component={Pages.Home} />
        </Switch>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
