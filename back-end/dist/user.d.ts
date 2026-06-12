import type { Request, Response } from "express";
export declare const getUsers: (req: Request, res: Response) => Promise<void>;
export declare const addUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=user.d.ts.map