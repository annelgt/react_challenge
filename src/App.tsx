import React from 'react';
import './App.css';
import BriefForm from "./components/BriefForm";
import BriefList from "./components/BriefList";
import {Grid} from "@material-ui/core";

function App() {
    return (
        <div>
            <div>
                <Grid container>
                    <Grid item xs={4}>
                        <BriefForm/>
                    </Grid>
                    <Grid item xs={8}>
                        <BriefList/>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default App;
