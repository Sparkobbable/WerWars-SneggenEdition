import './App.css';
import AppRouter from './AppRouter';
import { useCookies } from "react-cookie";
import { GameModel } from './model/gamemodel';

function App() {
  const [cookies, setCookies] = useCookies(["game"]);
  const items = ["item1","item2","item3","item4","item5","item6","item7","item8","item9","item10"];
  const animals = ["animal1","animal2","animal3","animal4","animal5","animal6","animal7","animal8","animal9","animal10"];
  if (cookies.game) {
    let game = new GameModel();
    game.round = 0;
    game.foundItems = [];
    game.audioForItems = setAudiosForItems();
    game.itemsForAnimals = randomizeItemsAndAnimals();
    game.itemsWantedByAnimals = randomizeItemsAndAnimals();
    game.thief = pickRandThief();
    game.hintAudioForAnimals(setHintsByThief(game.thief));
    setCookies("game", game, {path: "/"});
  }
  function updateGameCookie(game) {
    setCookies("game", game, {path: "/"});
  }

  function setHintsByThief(thief) {
    var hintsByAnimals = {};
    switch (thief) {
      case "animal1":
        var hints = [new Audio("hint1"), new Audio("hint2"), new Audio("hint3"), new Audio("hint4"), new Audio("hint5"), new Audio("hint6"), new Audio("hint7"), new Audio("hint8"), new Audio("hint9"), new Audio("hint10")];
        animals.forEach((animal) => setItemForKey(animal, hints.splice(Math.floor(Math.random() * animals.length), 1)[0], hintsByAnimals));
        return hintsByAnimals;
      case "animal2":
        break;
      case "animal3":
        break;
      case "animal4":
        break;
      case "animal5":
        break;
      case "animal6":
        break;
      case "animal7":
        break;
      case "animal8":
        break;
      case "animal9":
        break;
      case "animal10":
        break;
      default:
        break;
    }
    return null;
  }

  function pickRandThief() {
    return animals[Math.floor(Math.random() * animals.length)];
  }

  function setAudiosForItems() {
    var audiosByItems = {};
    items.forEach((item) => setItemForKey(item, new Audio("url" + item), audiosByItems));
    return audiosByItems;
  }
  
  function randomizeItemsAndAnimals() {
    var itemsByAnimals = {};
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
