import { Request, Response } from "express";
export default class AdminController {
    static getDepositRequests(req: Request, res: Response): Promise<void>;
    static getWithdrawalRequests(req: Request, res: Response): Promise<void>;
    static accessTransaction(req: Request, res: Response): Promise<void>;
}
