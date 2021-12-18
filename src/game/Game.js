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

export default function Game({updateGameCookie, game}) {
    const [selectedAnimal, setSelectedAnimal] = useState("");

    const duFindestAudio = new Audio("url");
    const ichMoechteAudio = new Audio("url");
    const ichHabeFolgendesGesehenAudio = new Audio("url");
    const gutGemachtAudio = new Audio("url");
    const verdaechtigeAusschliessen = new Audio("url");

    function onAnimalClick(animal) {
        setSelectedAnimal(animal);
    }

    function onActionClick(action) {
        switch(action) {
            case "eye":
                //TODO: empty search
                var item = game.itemsForAnimals[selectedAnimal];
                duFindestAudio.play();
                game.audioForItems[item].play();
                game.increaseRound();
                break;
            case "mouth": 
                ichMoechteAudio.play();
                var item = game.itemsWantedByAnimals[selectedAnimal];
                game.audioForItems[item].play();
                break;
            case "hand":
                var item = game.itemsWantedByAnimals[selectedAnimal];
                if (game.foundItems.contains(item)) {
                    ichHabeFolgendesGesehenAudio.play();
                    game.hintAudioForAnimals[selectedAnimal].play();
                    gutGemachtAudio.play();
                    verdaechtigeAusschliessen.play();
                    game.increaseRound();
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
                <Grid className="griditem" item xs={4} onClick={(e) => onAnimalClick("animal1")}>
                    <img src={snegge} alt="snegge" className="rotate buttonimg" />
                </Grid>
                <Grid className="griditem" item xs={4}>
                    <img src={snegge} alt="snegge" className="rotate buttonimg" />
                </Grid>
                <Grid className="griditem" item xs={4} onClick={(e) => onActionClick("mouth")}>
                    <div className="itemspacer white">
                        <img src={mouth} alt="snegge" className="rotate buttonimg" />
                    </div>
                </Grid>
                <Grid className="griditem" item xs={4}>
                    <img src={snegge} alt="snegge" className="rotate buttonimg" />
                </Grid>
                <Grid className="griditem" item xs={4}>
                    <img src={snegge} alt="snegge" className="rotate buttonimg" />
                </Grid>
                <Grid className="griditem" item xs={4} onClick={(e) => onActionClick("hand")}>
                    <div className="itemspacer white">
                        <img src={hand} alt="snegge" className="rotate buttonimg" style={{height: "14vh"}}/>
                    </div>
                </Grid>
                <Grid className="griditem" item xs={4}>
                    <img src={snegge} alt="snegge" className="rotate buttonimg" />
                </Grid>
                <Grid className="griditem" item xs={4}>
                    <img src={snegge} alt="snegge" className="rotate buttonimg" />
                </Grid>
                <Grid className="griditem" item xs={4} onClick={(e) => onActionClick("star")}>
                    <div className="itemspacer star">
                        <img src={star} alt="snegge" className="rotate buttonimg" />
                    </div>
                </Grid>
                <Grid className="griditem" item xs={4}>
                    <img src={snegge} alt="snegge" className="rotate buttonimg" />
                </Grid>
                <Grid className="griditem" item xs={4}>
                    <img src={snegge} alt="snegge" className="rotate buttonimg" />
                </Grid>
                <Grid className="griditem" item xs={4} onClick={(e) => onActionClick("chest")}>
                    <div className="itemspacer box">
                        <img src={chest} alt="snegge" className="rotate buttonimg"  style={{height: "13vh"}}/>
                    </div>
                </Grid>
                <Grid className="griditem" item xs={4}>
                    <img src={snegge} alt="snegge" className="rotate buttonimg" />
                </Grid>
                <Grid className="griditem" item xs={4}>
                    <img src={snegge} alt="snegge" className="rotate buttonimg" />
                </Grid>
            </Grid>
        </div>
    </>;
}