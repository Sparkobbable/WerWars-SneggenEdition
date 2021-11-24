import { Grid } from "@mui/material";

export default function Game({updateGameCookie, game}) {
    return <>
        <div className="background">
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    Tier 1
                </Grid>
                <Grid item xs={4}>
                    Tier 2
                </Grid>
                <Grid item xs={4}>
                    Tier 3
                </Grid>
                <Grid item xs={4}>
                    Tier 4
                </Grid>
                <Grid item xs={4}>
                    Tier 5
                </Grid>
                <Grid item xs={4}>
                    Tier 6
                </Grid>
                <Grid item xs={4}>
                    Tier 7
                </Grid>
                <Grid item xs={4}>
                    Tier 8
                </Grid>
                <Grid item xs={4}>
                    Tier 9
                </Grid>
                <Grid item xs={4}>
                    Tier 10
                </Grid>
                <Grid item xs={4}>
                    Tier 11
                </Grid>
                <Grid item xs={4}>
                    Tier 12
                </Grid>
            </Grid>
        </div>
    </>;
}