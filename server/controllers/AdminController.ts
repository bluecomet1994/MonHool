import { Request, Response } from "express";
import TransactionHistoryModel from "../models/TransactionHistoryModel";
import { TRANSACTION_STATUS } from "../enums/status";
import { TRANSACTION_TYPE } from "../enums/type";
import UserModel from "../models/UserModel";

export default class AdminController {
  static async getDepositRequests(req: Request, res: Response) {
    const { email, isAdmin }: any = req.user;

    await UserModel.findOne({ email })
      .then(async user => {
        if (user) {
          if (isAdmin) {
            await TransactionHistoryModel.find({ type: TRANSACTION_TYPE.DEPOSIT, status: TRANSACTION_STATUS.PENDING }).sort({ date: -1 })
              .then(histories => {
                res.status(200).json({
                  success: true,
                  valid: true,
                  message: "Deposit requests loaded.",
                  histories
                });
              });
          } else {
            res.status(403).json({
              success: false,
              valid: true,
              message: "You are not an administrator."
            });
          }
        } else {
          res.status(404).json({
            success: false,
            valid: true,
            message: "The user does not exist."
          });
        }
      });
  }

  static async getWithdrawalRequests(req: Request, res: Response) {
    const { email, isAdmin }: any = req.user;

    await UserModel.findOne({ email })
      .then(async user => {
        if (user) {
          if (isAdmin) {
            await TransactionHistoryModel.find({ type: TRANSACTION_TYPE.WITHDRAWAL, status: TRANSACTION_STATUS.PENDING }).sort({ date: -1 })
              .then(histories => {
                res.status(200).json({
                  success: true,
                  valid: true,
                  message: "Withdrawal requests loaded.",
                  histories
                });
              });
          } else {
            res.status(403).json({
              success: false,
              valid: true,
              message: "You are not an administrator."
            });
          }
        } else {
          res.status(404).json({
            success: false,
            valid: true,
            message: "The user does not exist."
          });
        }
      });
  }

  static async accessTransaction(req: Request, res: Response) {
    const { id, status } = req.body;

    await TransactionHistoryModel.findById(id)
      .then(async history => {
        if (history) {
          const email = history.email;

          await UserModel.findOne({ email })
            .then((user: any) => {
              if (user) {
                console.log(history.type);

                if (history.type === TRANSACTION_TYPE.DEPOSIT) {
                  user.wallet[history.coin.toLowerCase()] += history.amount;
                } else if (history.type === TRANSACTION_TYPE.WITHDRAWAL) {
                  if (user.wallet[history.coin.toLowerCase()] < history.amount) {
                    res.status(200).json({
                      success: false,
                      valid: true,
                      message: "The user doesn't have enough coin to withdraw."
                    });
                  } else {
                    user.wallet[history.coin.toLowerCase()] -= history.amount;
                  }
                }

                history.status = status;
                history.total = user.wallet[history.coin.toLowerCase()];

                user.save()
                  .then(() => {
                    history.save()
                      .then(() => res.status(200).json({
                        success: true,
                        valid: true,
                        message: "The access was succeed."
                      })).catch(error => console.log(error));
                  }).catch((error: Error) => console.log(error));

              } else {
                res.status(404).json({
                  success: false,
                  valid: true,
                  message: "Cannot find the user for this access."
                });
              }
            });
        } else {
          res.status(404).json({
            success: false,
            valid: true,
            message: "Cannot find the record by the ID."
          });
        }
      })
  }
}