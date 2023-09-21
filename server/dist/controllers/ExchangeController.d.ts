import { Request, Response } from "express";
export default class ExchangeController {
    static exchange(req: Request, res: Response): Promise<void>;
}
