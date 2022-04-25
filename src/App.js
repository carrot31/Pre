import logo from "./logo.svg";
import "./App.css";
import Location from "./Location";
import { Route } from "react-router-dom";
import StopWatch from "./StopWatch/StopWatch";
import Point from "./Point";
import Test from "./Test";
import CountDown from "./Countdown";
import MyLoca from "./MyLoca";
import Length from "./Length";
import Login from "./Login";

function App() {
  return (
    <div>
      <Route path="/" exact component={Location} />
      <Route path="/length" exact component={Length} />
      <Route path="/myloca" exact component={MyLoca} />
      <Route path="/point" exact component={Point} />
      <Route path="/stop" exact component={StopWatch} />
      <Route path="/count" exact component={CountDown} />
      <Route path="/login" exact component={Login} />
      <Route path="/test" exact component={Test} />
    </div>
  );
}

export default App;
