import { Request, Response } from "express";
import axios from 'axios';
import TradingHistoryModel from "../models/TradingHistoryModel";
import { TRADING_STATUS } from "../enums/status";
import { calculateEndDate } from "../utils/functions";
import UserModel from "../models/UserModel";

export default class TradingBotController {
  static async getCryptoCurrency(req: Request, res: Response) {
    const currencyApi: string = 'https://data.binance.com/api/v3/ticker?symbols=["BTCUSDT","ETHUSDT","BUSDUSDT","XRPUSDT","SOLUSDT"]';
    
    axios.get(currencyApi)
      .then(response => {
        res.status(200).json({
          success: true,
          data: response.data
        });
      });
  }

  static async getPosition(req: Request, res: Response) {
    const { email }: any = req.user;

    await TradingHistoryModel.findOne({ email, status: TRADING_STATUS.OPENED })
      .then(history => {
        if (history) {
          res.status(200).json({
            success: true,
            valid: true,
            status: TRADING_STATUS.OPENED,
            message: "The position is open.",
            history
          });
        } else {
          res.status(200).json({
            success: true,
            valid: true,
            status: TRADING_STATUS.NO_OPEN,
            message: "No opened positon."
          });
        }
      })
  }

  static async openPosition(req: Request, res: Response) {
    const { username, email }: any = req.user;
    const { amount, hit, time, balance } = req.body;

    await UserModel.findOne({ email })
      .then(async (user: any) => {
        await TradingHistoryModel.findOne({ email, status: TRADING_STATUS.OPENED })
          .then(history => {
            if (history) {
              res.status(200).json({
                success: false,
                valid: true,
                status: TRADING_STATUS.OPENED,
                message: "There is already opened position."
              });
            } else {
              if (balance === false) {
                res.status(200).json({
                  success: false,
                  valid: true,
                  message: "You do not have enough money in your wallet."
                });
              } else {
                Object.keys(balance).map(key => {
                  user.wallet[key.toLowerCase()] -= balance[key];
                });

                const newTradingHistory: any = new TradingHistoryModel({
                  username,
                  email,
                  amount,
                  hit,
                  time,
                  endDate: calculateEndDate(time)
                });

                user.save().then((user: any) => {
                  newTradingHistory.save()
                    .then((history: any) => {
                      res.status(200).json({
                        success: true,
                        valid: true,
                        message: "You opened the position successfully!",
                        history,
                        user
                      });
                    }).catch((error: Error) => console.log(error));
                })
              }
            }
          });
      })
  }

  static async getEarning(req: Request, res: Response) {
    const { email }: any = req.user;

    await UserModel.findOne({ email })
      .then(async (user: any) => {
        if (user) {
          await TradingHistoryModel.findById(req.body.id)
            .then(history => {
              if (history) {
                const remainTime = history.endDate - new Date().getTime();

                if (remainTime > 0) {
                  res.status(200).json({
                    success: false,
                    valid: true,
                    message: "The position is not ready yet."
                  });
                } else {
                  user.wallet.usdt += (history.amount * history.hit);
                  history.status = TRADING_STATUS.EARNED;

                  user.save()
                    .then((user: any) => {
                      history.save().then(() => {
                        res.status(200).json({
                          success: true,
                          valid: true,
                          message: "Great! You've earned the money!",
                          user
                        });
                      }).catch((error: Error) => console.log(error));
                    })
                }
              } else {
                res.status(404).json({
                  success: false,
                  valid: true,
                  message: "Cannot find the position with that ID."
                })
              }
            });
        } else {
          res.status(200).json({
            success: false,
            valid: true,
            message: "Cannot find the wallet for this user."
          })
        }
      })
  }
}