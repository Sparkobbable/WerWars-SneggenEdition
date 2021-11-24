import './App.css';
import AppRouter from './AppRouter';
import { useCookies } from "react-cookie";

function App() {
  const [cookies, setCookies] = useCookies(["game"]);
  if (cookies.game === undefined) {
    setCookies("game", {/*TODO game status here*/}, {path: "/"});
  }
  function updateGameCookie(game) {
    setCookies("game", game, {path: "/"});
  }

  return (
    <div className="App">
      <AppRouter updateGameCookie={updateGameCookie} game={cookies.game}></AppRouter>
    </div>
  );
}

export default App;
