import type { Request, Response, NextFunction } from "express";
export declare const login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const logout: (_req: Request, res: Response) => void;
export declare const signup: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const me: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare function requireAuth(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
export declare function requireRole(role: string): (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare function hashPassword(plain: string): Promise<string>;
//# sourceMappingURL=auth.d.ts.map