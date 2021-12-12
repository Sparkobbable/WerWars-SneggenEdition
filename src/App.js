import './App.css';
import AppRouter from './AppRouter';
import { useCookies } from "react-cookie";
import { GameModel } from './model/gamemodel';

function App() {
  const [cookies, setCookies] = useCookies(["game"]);
  const items = ["item1","item2","item3","item4","item5","item6","item7","item8","item9","item10"];
  if (cookies.game) {
    let game = new GameModel();
    game.round = 0;
    game.foundItems = [];
    game.itemsForAnimals = randomizeItemsAndAnimals();
    game.itemsWantedByAnimals = randomizeItemsAndAnimals();
    game.audioForItems = setAudiosForItems();
    setCookies("game", game, {path: "/"});
  }
  function updateGameCookie(game) {
    setCookies("game", game, {path: "/"});
  }

  function setAudiosForItems() {
    var audiosByItems = {};
    items.forEach((item) => setItemForKey(item, new Audio("url" + item), audiosByItems));
    return audiosByItems;
  }
  
  function randomizeItemsAndAnimals() {
    var itemsByAnimals = {};
    var animals = ["animal1","animal2","animal3","animal4","animal5","animal6","animal7","animal8","animal9","animal10"];
    animals.forEach((animal) => setItemForKey(animal, items.splice(Math.floor(Math.random() * items.length), 1)[0], itemsByAnimals))
    console.log(itemsByAnimals);
    return itemsByAnimals;
  }

  function setItemForKey(key, value, array) {
    array[key] = value;
  }

  return (
    <div className="App">
      <AppRouter updateGameCookie={updateGameCookie} game={cookies.game}></AppRouter>
    </div>
  );
}

export default App;
