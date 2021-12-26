/* eslint-disable eqeqeq */
/* eslint-disable no-redeclare */
import { Grid } from "@mui/material";
import "./Game.css";
import snegge from "../assets/media/Download.png";
import eye from "../assets/media/eye.png";
import mouth from "../assets/media/mouth.png";
import hand from "../assets/media/hand.png";
import star from "../assets/media/star.png";
import chest from "../assets/media/chest.png";
import { useState } from "react";
import beep from '../assets/audio/beep-29.wav';


export default function Game({updateGameCookie, game}) {
    console.log("started game with model:");
    console.log(game);
    const [selectedAnimal, setSelectedAnimal] = useState("");
    const [asked, setAsked] = useState(false);

    // const duFindestAudio = new Audio("url");
    const ichHabeFolgendesGesehenAudio = new Audio("url");
    const gutGemachtAudio = new Audio("url");
    const verdaechtigeAusschliessen = new Audio("url");
    const beepAudio = new Audio(beep);

    function onAnimalClick(animal) {
        beepAudio.play()
        setAsked(false);
        setSelectedAnimal(animal);
    }

    async function audioForAnimalAndItem(animal, item) {
        var audioImport = await import(`../assets/audio/wer_wars/${animal}/${animal} essen/${animal} ${item}.wav`);
        new Audio(audioImport.default).play();
    }

    function introAudioForAnimal(animal) {
        if (animal == "siri") { return }
        let audioImport = import(`../assets/audio/wer_wars/${animal}/${animal} anfang.wav`);
        new Audio(audioImport.default).play();
    }

    function onActionClick(action) {
        switch(action) {
            case "eye":
                if (selectedAnimal == "siri") {break}
                //TODO: empty search
                var item = game.itemsForAnimals[selectedAnimal];
                // todo: aufnehmen: duFindestAudio.play();
                audioForAnimalAndItem(selectedAnimal, item);
                game.round++;
                break;
            case "mouth": 
                if (selectedAnimal == "siri") {break}
                introAudioForAnimal(selectedAnimal);
                if (selectedAnimal != "theo" && selectedAnimal != "rasselkalle") {
                    var ichMoechteAudio = import(`../assets/audio/wer_wars/${selectedAnimal}/${selectedAnimal} ich möchte.wav`);
                    new Audio(ichMoechteAudio.default).play();
                }
                var item = game.itemsWantedByAnimals[selectedAnimal];
                audioForAnimalAndItem(selectedAnimal, item).play();
                setAsked(true);
                game.round++;
                break;
            case "hand":
                if (selectedAnimal == "siri") {break}
                if (asked) {
                    var item = game.itemsWantedByAnimals[selectedAnimal];
                    if (game.foundItems.contains(item)) {
                        ichHabeFolgendesGesehenAudio.play();
                        game.hintAudioForAnimals[selectedAnimal].play();
                        gutGemachtAudio.play();
                        verdaechtigeAusschliessen.play();
                        game.round++;
                    }
                } else {
                    //todo
                }
                break;
            case "star":
                break;
            case "chest":
                break;
            default:
                break;
        }
        checkClock()
        //Random Actions here
    }

    function checkClock() {
        
    }

    return <>
        <div className="background">
            <Grid container spacing={0}>
                <Grid className="griditem" item xs={4} onClick={(e) => onActionClick("eye")}>
                    <div className="itemspacer white">
                        <img src={eye} alt="eye" className="rotate buttonimg" style={{height: "9vh"}}/>
                    </div>
                </Grid>
                <Grid className="griditem" item xs={4} onClick={(e) => onAnimalClick("eva")}>
                    <img src={snegge} alt="eva" className="rotate buttonimg" />
                </Grid>
                <Grid className="griditem" item xs={4} onClick={(e) => onAnimalClick("giraffe")}>
                    <img src={snegge} alt="giraffe" className="rotate buttonimg" />
                </Grid>
                <Grid className="griditem" item xs={4} onClick={(e) => onActionClick("mouth")}>
                    <div className="itemspacer white">
                        <img src={mouth} alt="mouth" className="rotate buttonimg" />
                    </div>
                </Grid>
                <Grid className="griditem" item xs={4} onClick={(e) => onAnimalClick("maschka")}>
                    <img src={snegge} alt="maschka" className="rotate buttonimg" />
                </Grid>
                <Grid className="griditem" item xs={4} onClick={(e) => onAnimalClick("merle")}>
                    <img src={snegge} alt="merle" className="rotate buttonimg" />
                </Grid>
                <Grid className="griditem" item xs={4} onClick={(e) => onActionClick("hand")}>
                    <div className="itemspacer white">
                        <img src={hand} alt="hand" className="rotate buttonimg" style={{height: "14vh"}}/>
                    </div>
                </Grid>
                <Grid className="griditem" item xs={4} onClick={(e) => onAnimalClick("ver")}>
                    <img src={snegge} alt="ver" className="rotate buttonimg" />
                </Grid>
                <Grid className="griditem" item xs={4} onClick={(e) => onAnimalClick("patrick")}>
                    <img src={snegge} alt="patrick" className="rotate buttonimg" />
                </Grid>
                <Grid className="griditem" item xs={4} onClick={(e) => onActionClick("star")}>
                    <div className="itemspacer star">
                        <img src={star} alt="star" className="rotate buttonimg" />
                    </div>
                </Grid>
                <Grid className="griditem" item xs={4} onClick={(e) => onAnimalClick("rasselkalle")}>
                    <img src={snegge} alt="rasselkalle" className="rotate buttonimg" />
                </Grid>
                <Grid className="griditem" item xs={4} onClick={(e) => onAnimalClick("siri")}>
                    <img src={snegge} alt="siri" className="rotate buttonimg" />
                </Grid>
                <Grid className="griditem" item xs={4} onClick={(e) => onActionClick("chest")}>
                    <div className="itemspacer box">
                        <img src={chest} alt="chest" className="rotate buttonimg"  style={{height: "13vh"}}/>
                    </div>
                </Grid>
                <Grid className="griditem" item xs={4} onClick={(e) => onAnimalClick("theo")}>
                    <img src={snegge} alt="theo" className="rotate buttonimg" />
                </Grid>
                <Grid className="griditem" item xs={4} onClick={(e) => onAnimalClick("spongebob")}>
                    <img src={snegge} alt="spongebob" className="rotate buttonimg" />
                </Grid>
            </Grid>
        </div>
    </>;
}