import { Grid } from "@mui/material";
import "./Game.css";
import snegge from "../assets/media/Download.png";
import eye from "../assets/media/eye.png";
import mouth from "../assets/media/mouth.png";
import hand from "../assets/media/hand.png";
import star from "../assets/media/star.png";
import chest from "../assets/media/chest.png";

export default function Game({updateGameCookie, game}) {
    return <>
        <div className="background">
            <Grid container spacing={0}>
                <Grid className="griditem" item xs={4}>
                    <div className="itemspacer white">
                        <img src={eye} alt="eye" className="rotate buttonimg" style={{height: "9vh"}}/>
                    </div>
                </Grid>
                <Grid className="griditem" item xs={4}>
                    <img src={snegge} alt="snegge" className="rotate buttonimg" />
                </Grid>
                <Grid className="griditem" item xs={4}>
                    <img src={snegge} alt="snegge" className="rotate buttonimg" />
                </Grid>
                <Grid className="griditem" item xs={4}>
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
                <Grid className="griditem" item xs={4}>
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
                <Grid className="griditem" item xs={4}>
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
                <Grid className="griditem" item xs={4}>
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