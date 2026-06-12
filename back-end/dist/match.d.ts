import type { Request, Response } from "express";
export declare const getMatches: (req: Request, res: Response) => Promise<void>;
export declare const addMatch: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateMatch: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=match.d.ts.map