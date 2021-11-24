import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Game from "./game/Game";
import Start from "./start/Start";

export default function AppRouter({updateGameCookie, game}) {
    return <>
        <Router>
            <Switch>
                <Route path="/game">
                    <Game updateGameCookie={updateGameCookie} game={game} />
                </Route>
                <Route path="/">
                    <Start updateGameCookie={updateGameCookie} game={game}></Start>
                </Route>
            </Switch>
        </Router>
    </>;
}