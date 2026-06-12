// @ts-ignore
import express, {Request, Response} from "express";
import type {Tournament} from "./Entity";
// @ts-ignore
import pool from "./db";
// @ts-ignore
import cookieParser from "cookie-parser";
// @ts-ignore
import {addTeam, getTeams, updateTeam} from "./team";
// @ts-ignore
import {addTournament, getTournament, updateTournament, associateTeamToTournament, getTournamentTeams, updateTournamentTeam} from "./tournament";
// @ts-ignore
import {getMatches, addMatch, updateMatch} from "./match";
// @ts-ignore
import {getPrediction, savePrediction, getMyPredictions, getMatchPredictions, getUserPredictions} from "./predict";
// @ts-ignore
import {getUsers, addUser, updateUser} from "./user";
// @ts-ignore
import {login, logout, me, requireAuth, signup} from "./auth";
// @ts-ignore
import {getGames, addPuzzle} from "./puzzle";


const cors = require('cors');

const app = express();
const PORT = 4000;
const API_PREFIX = "/api";
app.set("trust proxy", true);


app.use(cors({
    origin: 'http://localhost:3000',  // ✅ allow frontend
    credentials: true                // ✅ if using cookies/auth
}));

app.use(express.json());                // for JSON
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Public auth endpoints
app.post(API_PREFIX+"/auth/login", login);
app.post(API_PREFIX+"/auth/logout", logout);
app.get(API_PREFIX+"/auth/me", me);
app.post(API_PREFIX+"/auth/signup", signup);

// Everything below requires authentication
app.use(requireAuth);

app.get(API_PREFIX+"/matches", getMatches);

// @ts-ignore
app.get(API_PREFIX+"/team", getTeams);
app.get(API_PREFIX+"/tournament", getTournament);

app.post(API_PREFIX+"/tournament", addTournament);
app.put(API_PREFIX+"/tournament/:id", updateTournament);
app.post(API_PREFIX+"/team", addTeam);
app.put(API_PREFIX+"/team/:id", updateTeam);
app.post(API_PREFIX+"/tournament/team", associateTeamToTournament);
app.get(API_PREFIX+"/tournament/:id/team", getTournamentTeams);
app.put(API_PREFIX+"/tournament/team/:assocId", updateTournamentTeam);

app.post(API_PREFIX+"/match", addMatch);
app.put(API_PREFIX+"/match/:id", updateMatch);

app.get(API_PREFIX+"/predict/:matchId", getPrediction);
app.get(API_PREFIX+"/predict/:matchId/all", getMatchPredictions);
app.post(API_PREFIX+"/predict/:matchId", savePrediction);
app.get(API_PREFIX+"/my-predictions", getMyPredictions);

app.get(API_PREFIX+"/user", getUsers);
app.post(API_PREFIX+"/user", addUser);
app.put(API_PREFIX+"/user/:userId", updateUser);
app.get(API_PREFIX+"/user/:userId/predictions", getUserPredictions);

app.get(API_PREFIX+"/puzzle/game", getGames);
app.post(API_PREFIX+"/puzzle", addPuzzle);


app.listen(PORT, () => {
    console.log("Backend running on port "+PORT);
});
``
