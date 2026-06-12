"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const express_1 = __importStar(require("express"));
// @ts-ignore
const db_1 = __importDefault(require("./db"));
// @ts-ignore
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// @ts-ignore
const team_1 = require("./team");
// @ts-ignore
const tournament_1 = require("./tournament");
// @ts-ignore
const match_1 = require("./match");
// @ts-ignore
const predict_1 = require("./predict");
// @ts-ignore
const user_1 = require("./user");
// @ts-ignore
const auth_1 = require("./auth");
// @ts-ignore
const puzzle_1 = require("./puzzle");
const cors = require('cors');
const app = (0, express_1.default)();
const PORT = 4000;
const API_PREFIX = "/api";
app.set("trust proxy", true);
app.use(cors({
    origin: 'http://localhost:3000', // ✅ allow frontend
    credentials: true // ✅ if using cookies/auth
}));
app.use(express_1.default.json()); // for JSON
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// Public auth endpoints
app.post(API_PREFIX + "/auth/login", auth_1.login);
app.post(API_PREFIX + "/auth/logout", auth_1.logout);
app.get(API_PREFIX + "/auth/me", auth_1.me);
app.post(API_PREFIX + "/auth/signup", auth_1.signup);
// Everything below requires authentication
app.use(auth_1.requireAuth);
app.get(API_PREFIX + "/matches", match_1.getMatches);
// @ts-ignore
app.get(API_PREFIX + "/team", team_1.getTeams);
app.get(API_PREFIX + "/tournament", tournament_1.getTournament);
app.post(API_PREFIX + "/tournament", tournament_1.addTournament);
app.put(API_PREFIX + "/tournament/:id", tournament_1.updateTournament);
app.post(API_PREFIX + "/team", team_1.addTeam);
app.put(API_PREFIX + "/team/:id", team_1.updateTeam);
app.post(API_PREFIX + "/tournament/team", tournament_1.associateTeamToTournament);
app.get(API_PREFIX + "/tournament/:id/team", tournament_1.getTournamentTeams);
app.put(API_PREFIX + "/tournament/team/:assocId", tournament_1.updateTournamentTeam);
app.post(API_PREFIX + "/match", match_1.addMatch);
app.put(API_PREFIX + "/match/:id", match_1.updateMatch);
app.get(API_PREFIX + "/predict/:matchId", predict_1.getPrediction);
app.post(API_PREFIX + "/predict/:matchId", predict_1.savePrediction);
app.get(API_PREFIX + "/my-predictions", predict_1.getMyPredictions);
app.get(API_PREFIX + "/user", user_1.getUsers);
app.post(API_PREFIX + "/user", user_1.addUser);
app.put(API_PREFIX + "/user/:userId", user_1.updateUser);
app.get(API_PREFIX + "/puzzle/game", puzzle_1.getGames);
app.post(API_PREFIX + "/puzzle", puzzle_1.addPuzzle);
app.listen(PORT, () => {
    console.log("Backend running on port " + PORT);
});
``;
//# sourceMappingURL=app.js.map