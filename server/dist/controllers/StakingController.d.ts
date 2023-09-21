import { Request, Response } from "express";
export default class StakingController {
    static getPositions(req: Request, res: Response): Promise<void>;
    static addPosition(req: Request, res: Response): Promise<void>;
    static setPositionReady(req: Request, res: Response): Promise<void>;
    static getMoney(req: Request, res: Response): Promise<void>;
}
