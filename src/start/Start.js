import "./Start.css";
import { useHistory } from "react-router";
import startingAudioFile from '../assets/audio/wer_wars/Tiger/tiger_anfang.wav';

export default function Start({updateGameCookie, game}) {
    const history = useHistory();
    const startingAudio = new Audio(startingAudioFile);

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