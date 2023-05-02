import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/UI/navbar/Navbar";
import Landing from "./pages/Landing/Index";
import Login from "./pages/Authentication/Login";
import Signup from "./pages/Authentication/SignUp";
import Home from "./pages/Home/Home";
import Game from "./pages/Games/Game";
import Results from "./pages/Result/Results";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import Details from "./pages/Details/Details";
import IndividualDetails from "./pages/Details/IndividualDetails";
import { useUserData } from "./store/user";

function App() {
  const { token } = useUserData((state) => ({
    token: state.token,
  }));

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" Component={Landing} />
        <Route path="/login" Component={Login} />
        <Route path="/signup" Component={Signup} />
        <Route path="/home" Component={token != "" ? Home : Login} />
        <Route path="/game/:id" Component={token != "" ? Game : Login} />
        <Route path="/results" Component={token != "" ? Results : Login} />
        <Route
          path="/leaderboard"
          Component={token != "" ? Leaderboard : Login}
        />
        <Route path="/details" Component={token != "" ? Details : Login} />
        <Route
          path="/individualDetails/:id"
          Component={token != "" ? IndividualDetails : Login}
        />
      </Routes>
    </>
  );
}

export default App;
