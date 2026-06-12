import type { Request, Response } from "express";
declare const getGames: (_req: Request, res: Response) => Promise<void>;
declare const addPuzzle: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export { getGames, addPuzzle };
//# sourceMappingURL=puzzle.d.ts.map