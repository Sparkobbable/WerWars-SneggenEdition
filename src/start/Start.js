import "./Start.css";
import { useHistory } from "react-router";

export default function Start({updateGameCookie, game}) {
    const history = useHistory();
    return <>
        <div className="cover">
            <div className="startbutton" onClick={(e) => history.push("/game")}>
                Start
            </div>
        </div>
    </>;
}