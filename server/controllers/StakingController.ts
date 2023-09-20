import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import StakingHistoryModel from "../models/StakingHistoryModel";
import { calculateEndDate } from "../utils/functions";
import { STAKING_STATUS } from "../enums/status";

export default class StakingController {
  static async getPositions(req: Request, res: Response) {
    const { email }: any = req.user;

    await StakingHistoryModel.find({ email })
      .then(histories => {
        if (histories) {
          res.status(200).json({
            success: true,
            histories
          });
        } else {
          res.status(200).json({
            success: false,
            message: "No open positions"
          });
        }
      })
  }

  static async addPosition(req: Request, res: Response) {
    const { username, email }: any = req.user;
    const { coin, deposit, rate, earning, time } = req.body;

    await UserModel.findOne({ email })
      .then(user => {
        if (user) {
          const newHistory: any = new StakingHistoryModel({
            username,
            email,
            coin,
            deposit,
            rate,
            earning,
            endDate: calculateEndDate(time)
          });

          newHistory.save().then((history: any) => {
            res.status(200).json({
              success: true,
              message: "The position was added successfully.",
              history
            });
          })
            .catch((error: Error) => console.log(error));
        } else {
          res.status(404).json({
            success: false,
            message: "Cannot find the wallet for the user."
          });
        }
      });
  }

  static async setPositionReady(req: Request, res: Response) {
    await StakingHistoryModel.findById(req.body.id)
      .then(history => {
        if (history) {
          history.status = STAKING_STATUS.FINISHED;

          history.save()
            .then(() => {
              res.status(200).json({
                success: true,
                message: "The position is finished."
              });
            })
            .catch((error: Error) => console.log(error));
        } else {
          res.status(404).json({
            success: false,
            message: "Cannot find the history with that ID."
          });
        }
      });
  }

  static async getMoney(req: Request, res: Response) {
    const { email }: any = req.user;

    await UserModel.findOne({ email })
      .then(async (user: any) => {
        if (user) {
          await StakingHistoryModel.findById(req.body.id)
            .then(history => {
              if (history) {
                if (history.status === STAKING_STATUS.EARNED) {
                  res.status(200).json({
                    success: false,
                    message: "You've already got the money."
                  });
                } else {
                  user.wallet[history.coin.toLowerCase()] = user.wallet[history.coin.toLowerCase()] + history.earning;
                  history.status = STAKING_STATUS.EARNED
  
                  user.save()
                    .then((savedUser: any) => {
                      history.save().then(() => {
                        res.status(200).json({
                          success: true,
                          message: "Great! You've earned the money.",
                          user: savedUser
                        });
                      }).catch((error: Error) => console.log(error));
                    })
                    .catch((error: Error) => console.log(error));
                }
              } else {
                res.status(404).json({
                  success: false,
                  message: "Cannot find the history with that ID."
                });
              }
            });
        } else {
          res.status(404).json({
            success: false,
            message: "Cannot find the wallet for the user."
          });
        }
      });
  }
}