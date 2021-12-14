// import logo from './logo.svg'
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Customers from "./component/CustomersPage";
import Orders from "./component/OrdersPage";
import AppBar from "./component/AppBar";
function App() {
  return (
    <div className="App">
      <Router>
        <AppBar />
          <Routes>
            <Route exact path="/Customers" component={Customers}></Route>
            <Route exact path="/Orders" component={Orders}></Route>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
