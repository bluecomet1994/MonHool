import { Request, Response } from "express";
export default class TradingBotController {
    static getCryptoCurrency(req: Request, res: Response): Promise<void>;
    static getPosition(req: Request, res: Response): Promise<void>;
    static openPosition(req: Request, res: Response): Promise<void>;
    static getEarning(req: Request, res: Response): Promise<void>;
}
