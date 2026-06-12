import type { Request, Response } from "express";
export declare const getMyPredictions: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getPrediction: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const savePrediction: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=predict.d.ts.map