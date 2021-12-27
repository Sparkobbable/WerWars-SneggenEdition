/* eslint-disable eqeqeq */
import './App.css';
import AppRouter from './AppRouter';
import { useCookies } from "react-cookie";
import { GameModel } from './model/gamemodel';

function App() {
  const [cookies, setCookies] = useCookies(["game"]);
  var items = ["bananenbrot","kekse","kugeln","lasagne","milchreis","reste","salzstangen","sandwich","zimtsneggen"];
  const animals = ["eva","giraffe","maschka","merle","ver","patrick","rasselkalle","spongebob","theo","siri"];
  var game = cookies.game;
  console.log("initial cookie:");
  console.log(game);
  console.log(window.location.pathname);
  if (window.location.pathname == "/") {
    game = new GameModel();
    game.round = 0;
    game.foundItems = [];
    game.itemsForAnimals = randomizeItemsAndAnimals();
    game.itemsWantedByAnimals = randomizeItemsAndAnimals();
    game.thief = pickRandThief();
    game.hintsForAnimals = setHintsByThief(game.thief);
    game.keyCount = 0;
    updateGameCookie(game);
    console.log("new game:");
    console.log(game);
  }
  function updateGameCookie(gameModel) {
    setCookies("game", gameModel, {path: "/"});
    console.log("cookies:");
    console.log(cookies.game);
  }


  function setHintsByThief(thief) {
    var hintsByAnimals = {};
    var hints;
    switch (thief) {
      case "eva":
        hints = ["ist klein", "ist dünn", "ist frau", "schwarze schuhe", "trägt kopfbedeckung"];
        break;
      case "giraffe":
        hints = ["ist groß", "ist dünn", "ist mann", "schwarze schuhe"];
        break;
      case "maschka":
        hints = ["ist groß", "ist dick", "ist frau", "schwarze schuhe", "trägt kopfbedeckung"];
        break;
      case "merle":
        hints = ["ist groß", "ist dick", "ist mann", "schwarze schuhe", "trägt kopfbedeckung"];
        break;
      case "ver":
        hints = ["ist groß", "ist dünn", "ist mann", "trägt kopfbedeckung"];
        break;
      case "patrick":
        hints = ["ist groß", "ist dünn", "ist mann", "schwarze schuhe", "trägt kopfbedeckung"];
        break;
      case "rasselkalle":
        hints = ["ist groß", "ist dünn", "ist frau", "trägt kopfbedeckung"];
        break;
      case "siri":
        hints = ["ist groß", "ist dünn", "ist frau", "schwarze schuhe", "trägt kopfbedeckung"];
        break;
      case "spongebob":
        hints = ["ist groß", "ist dünn", "ist frau", "schwarze schuhe"];
        break;
      case "theo":
        hints = ["ist klein", "ist dünn", "ist mann", "schwarze schuhe", "trägt kopfbedeckung"];
        break;
      default:
        break;
    }
    hints.forEach((hint) => setItemForKey(animals.splice(Math.floor(Math.random() * animals.length), 1)[0], hint, hintsByAnimals));
    return hintsByAnimals;
  }

  function pickRandThief() {
    return animals[Math.floor(Math.random() * animals.length)];
  }
  
  function randomizeItemsAndAnimals() {
    var itemsByAnimals = {};
    let itemsClone = [...items];
    animals.forEach((animal) => animal == "siri" ? console.log("siri") : setItemForKey(animal, items.splice(Math.floor(Math.random() * items.length), 1)[0], itemsByAnimals));
    console.log(itemsByAnimals);
    items = itemsClone
    return itemsByAnimals;
  }

  function setItemForKey(key, value, array) {
    array[key] = value;
  }

  return (
    <div className="App">
      <AppRouter updateGameCookie={updateGameCookie} game={game}></AppRouter>
    </div>
  );
}

export default App;
