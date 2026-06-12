import type { Request, Response } from "express";
declare const addTournament: (req: Request, res: Response) => Promise<void>;
declare const updateTournament: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const getTournament: (req: Request, res: Response) => Promise<void>;
declare const associateTeamToTournament: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const getTournamentTeams: (req: Request, res: Response) => Promise<void>;
declare const updateTournamentTeam: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export { getTournament, addTournament, updateTournament, associateTeamToTournament, getTournamentTeams, updateTournamentTeam };
//# sourceMappingURL=tournament.d.ts.map