/* eslint-disable eqeqeq */
/* eslint-disable no-redeclare */
import { Grid } from "@mui/material";
import "./Game.css";
import eva from "../assets/media/animals/eva.png";
import giraffe from "../assets/media/animals/giraffe.png";
import maschka from "../assets/media/animals/maschka.png";
import merle from "../assets/media/animals/merle.png";
import patrick from "../assets/media/animals/patrick.png";
import rasselkalle from "../assets/media/animals/rasselkalle.png";
import sb from "../assets/media/animals/sb.png";
import siri from "../assets/media/animals/siri.png";
import theo from "../assets/media/animals/theo.png";
import ver from "../assets/media/animals/ver.png";
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

    function sleep(s) {
        return new Promise(res => {
            setTimeout(res, s*1000);
        });
    }

    async function audioForAnimalAndItem(animal, item) {
        var audioImport = await import(`../assets/audio/wer_wars/${animal}/${animal} essen/${animal} ${item}.wav`);
        let audio = new Audio(audioImport.default);
        audio.play();
        return audio.duration;
    }

    async function introAudioForAnimal(animal) {
        if (animal == "siri") { return }
        let audioImport = await import(`../assets/audio/wer_wars/${animal}/${animal} anfang.wav`);
        let audio = new Audio(audioImport.default);
        audio.play();
        return audio.duration;
    }

    async function audioForFoundItem(item) {
        let audioImport = await import(`../assets/audio/wer_wars/tiger/du findest/${item}.wav`);
        let audio = new Audio(audioImport.default);
        audio.play();
        return audio.duration;
    }

    async function onActionClick(action) {
        let item;
        switch(action) {
            case "eye":
                if (selectedAnimal == "siri") {break}
                //TODO: empty search
                item = game.itemsForAnimals[selectedAnimal];
                audioForFoundItem(item);
                game.foundItems.push(item);
                updateGameCookie(game);
                game.round++;
                break;
            case "mouth": 
                if (selectedAnimal == "siri") {break}
                introAudioForAnimal(selectedAnimal);
                if (selectedAnimal == "eva" || selectedAnimal == "merle" || selectedAnimal == "spongebob") {
                    await sleep(5);
                } else if (selectedAnimal == "ver") {
                    await sleep(2);
                } else {
                    await sleep(3);
                }
                if (selectedAnimal != "theo" && selectedAnimal != "rasselkalle") {
                    var ichMoechteAudio = await import(`../assets/audio/wer_wars/${selectedAnimal}/${selectedAnimal} ich möchte.wav`);
                    let audio = new Audio(ichMoechteAudio.default);
                    audio.play();
                    if (selectedAnimal == "giraffe") {
                        await sleep(2);
                    }
                    await sleep(1);
                }
                item = game.itemsWantedByAnimals[selectedAnimal];
                audioForAnimalAndItem(selectedAnimal, item);
                setAsked(true);
                game.round++;
                break;
            case "hand":
                if (selectedAnimal == "siri") {break}
                if (asked) {
                    item = game.itemsWantedByAnimals[selectedAnimal];
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
                    <img src={eva} alt="eva" className="rotate buttonimg" />
                </Grid>
                <Grid className="griditem" item xs={4} onClick={(e) => onAnimalClick("giraffe")}>
                    <img src={giraffe} alt="giraffe" className="rotate buttonimg" />
                </Grid>
                <Grid className="griditem" item xs={4} onClick={(e) => onActionClick("mouth")}>
                    <div className="itemspacer white">
                        <img src={mouth} alt="mouth" className="rotate buttonimg" style={{height: "15vh"}}/>
                    </div>
                </Grid>
                <Grid className="griditem" item xs={4} onClick={(e) => onAnimalClick("maschka")}>
                    <img src={maschka} alt="maschka" className="rotate buttonimg" />
                </Grid>
                <Grid className="griditem" item xs={4} onClick={(e) => onAnimalClick("merle")}>
                    <img src={merle} alt="merle" className="rotate buttonimg" />
                </Grid>
                <Grid className="griditem" item xs={4} onClick={(e) => onActionClick("hand")}>
                    <div className="itemspacer white">
                        <img src={hand} alt="hand" className="rotate buttonimg" style={{height: "14vh"}}/>
                    </div>
                </Grid>
                <Grid className="griditem" item xs={4} onClick={(e) => onAnimalClick("ver")}>
                    <img src={ver} alt="ver" className="rotate buttonimg" />
                </Grid>
                <Grid className="griditem" item xs={4} onClick={(e) => onAnimalClick("patrick")}>
                    <img src={patrick} alt="patrick" className="rotate buttonimg" />
                </Grid>
                <Grid className="griditem" item xs={4} onClick={(e) => onActionClick("star")}>
                    <div className="itemspacer star">
                        <img src={star} alt="star" className="rotate buttonimg" />
                    </div>
                </Grid>
                <Grid className="griditem" item xs={4} onClick={(e) => onAnimalClick("rasselkalle")}>
                    <img src={rasselkalle} alt="rasselkalle" className="rotate buttonimg" />
                </Grid>
                <Grid className="griditem" item xs={4} onClick={(e) => onAnimalClick("siri")}>
                    <img src={siri} alt="siri" className="rotate buttonimg" />
                </Grid>
                <Grid className="griditem" item xs={4} onClick={(e) => onActionClick("chest")}>
                    <div className="itemspacer box">
                        <img src={chest} alt="chest" className="rotate buttonimg"  style={{height: "13vh"}}/>
                    </div>
                </Grid>
                <Grid className="griditem" item xs={4} onClick={(e) => onAnimalClick("theo")}>
                    <img src={theo} alt="theo" className="rotate buttonimg" />
                </Grid>
                <Grid className="griditem" item xs={4} onClick={(e) => onAnimalClick("spongebob")}>
                    <img src={sb} alt="spongebob" className="rotate buttonimg" />
                </Grid>
            </Grid>
        </div>
    </>;
}