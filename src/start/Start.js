import "./Start.css";
import { useHistory } from "react-router";

export default function Start({updateGameCookie, game}) {
    const history = useHistory();
    const startingAudio = new Audio("url");

    function startGame() {
        startingAudio.play();
        history.push("/game");
    }

    return <>
        <div className="cover">
            <div className="startbutton" onClick={(e) => startGame()}>
                Start
            </div>
        </div>
    </>;
}