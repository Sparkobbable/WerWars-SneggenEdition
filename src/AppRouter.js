import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Start from "./start/Start";

export default function AppRouter({updateGameCookie, game}) {
    return <>
        <Router>
            <Switch>
                <Route path="/">
                    <Start updateGameCookie={updateGameCookie} game={game}></Start>
                </Route>
            </Switch>
        </Router>
    </>;
}