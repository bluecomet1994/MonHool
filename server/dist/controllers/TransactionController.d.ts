import { Request, Response } from "express";
export default class TransactionController {
    static dashboard(req: Request, res: Response): Promise<void>;
    static exchange(req: Request, res: Response): Promise<void>;
    static deposit(req: Request, res: Response): Promise<void>;
    static withdrawal(req: Request, res: Response): Promise<void>;
    static getHistory(req: Request, res: Response): Promise<void>;
    static getDepositHistory(req: Request, res: Response): Promise<void>;
    static getWithdrawalHistory(req: Request, res: Response): Promise<void>;
}
