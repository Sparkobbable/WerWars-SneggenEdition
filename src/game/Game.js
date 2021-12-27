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
import { useHistory } from "react-router";
import beep from '../assets/audio/beep-29.wav';
import knarren from '../assets/audio/knarren.mp3';
import gewonnen from '../assets/audio/wer_wars/tiger/tiger gewonnen.wav';
import falscheTruhe from '../assets/audio/wer_wars/tiger/tiger falsche truhe.wav';
import haZauberer from '../assets/audio/wer_wars/zauberer/zauberer ha ich bin der zauberer.wav';
import zauberer6uhr from '../assets/audio/wer_wars/zauberer/zauberer um 6 uhr.wav';
import dreiuhr from '../assets/audio/wer_wars/tiger/3 Uhr.wav';
import glocke from '../assets/audio/glocke.wav';
import zGewonnen from '../assets/audio/wer_wars/zauberer/zauberer gewonnen.wav';
import geistAnfangsRaum from '../assets/audio/wer_wars/geist/geist alle wieder in den raum.wav';
import geistAnfang from '../assets/audio/wer_wars/geist/geist anfang.wav';
import geistZugende from '../assets/audio/wer_wars/geist/geist dein zug ist zu ende.wav';
import geistRaum from '../assets/audio/wer_wars/geist/geist Ich gehe in deinen raum.wav';
import feeAnfang from '../assets/audio/wer_wars/fee/fee anfang.wav';
import feeWeitererZug from '../assets/audio/wer_wars/fee/fee mache einen weiteren zug.wav';
import feeSchluessel from '../assets/audio/wer_wars/fee/fee nimm einen schlüssel.wav';


export default function Game({updateGameCookie, game}) {
    console.log("started game with model:");
    console.log(game);
    const [selectedAnimal, setSelectedAnimal] = useState("");
    const [asked, setAsked] = useState(false);
    const history = useHistory();

    const beepAudio = new Audio(beep);
    const knarrAudio = new Audio(knarren);
    const glockeAudio = new Audio(glocke);

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

    async function audioForNoItemAndAnimal() {
        let audioImport = await import(`../assets/audio/wer_wars/${selectedAnimal}/${selectedAnimal} hier findest du nichts.wav`);
        let audio = new Audio(audioImport.default);
        audio.play();
        return audio.duration;
    }

    async function ichHabeFolgendesGesehen() {
        let audioImport = await import(`../assets/audio/wer_wars/${selectedAnimal}/${selectedAnimal} folgendes gesehen.wav`);
        let audio = new Audio(audioImport.default);
        audio.play();
        return audio.duration;
    }

    async function hintAudioForAnimal(hint) {
        let audioImport = await import(`../assets/audio/wer_wars/${selectedAnimal}/${selectedAnimal} merkmale/${selectedAnimal} dieb ${hint}.wav`);
        let audio = new Audio(audioImport.default);
        audio.play();
        return audio.duration;
    }

    async function onActionClick(action) {
        let chanceNumber = Math.floor(Math.random() * 100);

        if (chanceNumber > 0 && chanceNumber < 8) {
            new Audio(geistAnfang).play();
            await sleep(4);
            new Audio(geistZugende).play();
            await sleep(4);
            game.round = game.round + 1;
            updateGameCookie(game);
            return;
        }

        let item;
        switch(action) {
            case "eye":
                if (selectedAnimal == "siri") {break}
                item = game.itemsForAnimals[selectedAnimal];
                if (!item) {
                    audioForNoItemAndAnimal();
                    await sleep(2);
                    return;
                }
                game.itemsForAnimals[selectedAnimal] = null;
                audioForFoundItem(item);
                game.foundItems.push(item);
                game.round = game.round + 1;
                updateGameCookie(game);
                await sleep(2);
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
                game.round = game.round + 1;
                updateGameCookie(game);
                await sleep(2);
                break;
            case "hand":
                if (selectedAnimal == "siri") {break}
                if (asked) {
                    item = game.itemsWantedByAnimals[selectedAnimal];
                    if (game.foundItems.includes(item)) {
                        let hint = game.hintsForAnimals[selectedAnimal];
                        if (hint) {
                            ichHabeFolgendesGesehen();
                            await sleep(2);
                            hintAudioForAnimal(hint);
                            await sleep(2);
                            //TODO: gut gemacht audios
                        }
                        //TODO: kein hint
                        game.round = game.round + 1;
                        updateGameCookie(game);
                    }
                } else {
                    //TODO: nicht gefragt
                }
                break;
            case "star":
                break;
            case "chest":
                if (game.keyCount > 0) {
                    game.keyCount = game.keyCount - 1;
                    knarrAudio.play();
                    await sleep(1);
                    if (game.thief == selectedAnimal) {
                        new Audio(gewonnen).play();
                        await sleep(5);
                        history.push("/");
                        return;
                    } else {
                        new Audio(falscheTruhe).play();
                        await sleep(4);
                        game.round = game.round + 1;
                        updateGameCookie(game);
                    }
                }
                break;
            default:
                break;
        }
        await checkClock()
        //TODO: Random Actions here
        if (chanceNumber > 7 && chanceNumber < 16) {
            new Audio(geistAnfang).play();
            await sleep(4);
            new Audio(geistAnfangsRaum).play();
            await sleep(4);
        } else if (chanceNumber > 15 && chanceNumber < 24) {
            new Audio(geistAnfang).play();
            await sleep(4);
            new Audio(geistRaum).play();
            await sleep(5);
        } else if (chanceNumber > 23 && chanceNumber < 32) {
            new Audio(feeAnfang).play();
            await sleep(3);
            new Audio(feeSchluessel).play();
            game.keyCount++;
            updateGameCookie(game);
            await sleep(3);
        } else if (chanceNumber > 31 && chanceNumber < 40) {
            new Audio(feeAnfang).play();
            await sleep(3);
            new Audio(feeWeitererZug).play();
            await sleep(2);
        }
    }

    async function checkClock() {
        switch (game.round) {
            case 4:
                glockeAudio.play();
                await sleep(3);
                break;
            case 8:
                glockeAudio.play();
                await sleep(3);                
                glockeAudio.play();
                await sleep(3);
                break;
            case 12: 
                glockeAudio.play();
                await sleep(3);
                glockeAudio.play();
                await sleep(3);
                glockeAudio.play();
                await sleep(3);
                new Audio(haZauberer).play();
                await sleep(7);
                new Audio(zauberer6uhr).play();
                await sleep(6);
                new Audio(dreiuhr).play()
                await sleep(5);
                break;
            case 16:
                glockeAudio.play();
                await sleep(3);
                glockeAudio.play();
                await sleep(3);
                glockeAudio.play();
                await sleep(3);
                glockeAudio.play();
                await sleep(3);
                break;
            case 20:
                glockeAudio.play();
                await sleep(3);
                glockeAudio.play();
                await sleep(3);
                glockeAudio.play();
                await sleep(3);
                glockeAudio.play();
                await sleep(3);
                glockeAudio.play();
                await sleep(3);
                break;
            case 24:
                glockeAudio.play();
                await sleep(3);
                glockeAudio.play();
                await sleep(3);
                glockeAudio.play();
                await sleep(3);
                glockeAudio.play();
                await sleep(3);
                glockeAudio.play();
                await sleep(3);
                glockeAudio.play();
                await sleep(3);
                new Audio(haZauberer).play();
                await sleep(7);
                new Audio(zGewonnen).play();
                await sleep(8);
                history.push("/")
                return;
            default:
                break;
        }
        return new Promise(res => {res()});
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