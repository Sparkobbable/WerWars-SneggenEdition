import "./Start.css";
import { useHistory } from "react-router";
import startingAudioFile from '../assets/audio/wer_wars/tiger/tiger_anfang.wav';
import zaubererHa from '../assets/audio/wer_wars/zauberer/zauberer ha ich bin der zauberer.wav';
import zauberer6 from '../assets/audio/wer_wars/zauberer/zauberer um 6 uhr.wav';

export default function Start({updateGameCookie, game}) {
    const history = useHistory();
    const startingAudio = new Audio(startingAudioFile);
    const zaubererAudio = new Audio(zaubererHa);
    const zauberer6uhrAudio = new Audio(zauberer6);

    async function startGame() {
        var body = document.body;
        if (body.requestFullscreen) {
            body.requestFullscreen();
        } else if (body.mozRequestFullScreen) {
            body.mozRequestFullScreen();
        } else if (body.webkitRequestFullscreen) {
            body.webkitRequestFullscreen();
        }
        startingAudio.play();
        history.push("/game");
        await sleep(11);
        zaubererAudio.play();
        await sleep(7);
        zauberer6uhrAudio.play();
    }

    function sleep(s) {
        return new Promise(res => {
            setTimeout(res, s*1000);
        });
    }

    return <>
        <div className="cover">
            <div className="startbutton" onClick={(e) => startGame()}>
                Start
            </div>
        </div>
    </>;
}