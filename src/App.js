import './App.css';
import AppRouter from './AppRouter';
import { useCookies } from "react-cookie";
import { GameModel } from './model/gamemodel';

function App() {
  const [cookies, setCookies] = useCookies(["game"]);
  const items = ["bananenbrot","kekse","kugel","lasagne","milchreis","reste","salzstangen","sandwich","zimtsneggen"];
  const animals = ["eva","giraffe","maschka","merle","ver","patrick","rasselkalle","siri","spongebob","theo"];
  if (cookies.game) {
    let game = new GameModel();
    game.round = 0;
    game.foundItems = [];
    game.itemsForAnimals = randomizeItemsAndAnimals();
    game.audioForItems = setAudiosForItems(game);
    game.itemsWantedByAnimals = randomizeItemsAndAnimals();
    game.thief = pickRandThief();
    game.hintAudioForAnimals = setHintsByThief(game.thief);
    updateGameCookie(game);
  }
  function updateGameCookie(game) {
    setCookies("game", game, {path: "/"});
    setCookies("game", game, {path: "/game"});
  }

  function setHintsByThief(thief) {
    var hintsByAnimals = {};
    switch (thief) {
      case "eva":
        var hints = [new Audio("hint1"), new Audio("hint2"), new Audio("hint3"), new Audio("hint4"), new Audio("hint5"), new Audio("hint6"), new Audio("hint7"), new Audio("hint8"), new Audio("hint9"), new Audio("hint10")];
        animals.forEach((animal) => setItemForKey(animal, hints.splice(Math.floor(Math.random() * animals.length), 1)[0], hintsByAnimals));
        return hintsByAnimals;
      case "giraffe":
        break;
      case "maschka":
        break;
      case "merle":
        break;
      case "ver":
        break;
      case "patrick":
        break;
      case "rasselkalle":
        break;
      case "siri":
        break;
      case "spongebob":
        break;
      case "theo":
        break;
      default:
        break;
    }
    return null;
  }

  function pickRandThief() {
    return animals[Math.floor(Math.random() * animals.length)];
  }

  function setAudiosForItems(game) {
    var audiosByItems = {};
    let i = 0;
    items.forEach((item) => {
      var itemAudioFile = import('./assets/audio/wer_wars/' + animals[i] + '/' + animals[i] + ' essen/' + animals[i] + ' ' + item + '.wav');
      setItemForKey(item, new Audio(itemAudioFile), audiosByItems);
    });
    return audiosByItems;
  }
  
  function randomizeItemsAndAnimals() {
    var itemsByAnimals = {};
    // eslint-disable-next-line
    animals.forEach((animal) => animal == "siri" ? console.log("siri") : setItemForKey(animal, items.splice(Math.floor(Math.random() * items.length), 1)[0], itemsByAnimals));
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
