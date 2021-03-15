import { BrowserRouter as Router, Switch } from "react-router-dom";
import * as Pages from "./pages";
import "./App.css";
import ProtectedRoute from "./utils/ProtectedRoute";
import LoginRoute from "./utils/LoginRoute";

function App() {
  return (
    <Router>
      <Switch>
        <LoginRoute path="/login" component={Pages.Login} />
        <ProtectedRoute path="/" component={Pages.Home} />
      </Switch>
    </Router>
  );
}

export default App;
