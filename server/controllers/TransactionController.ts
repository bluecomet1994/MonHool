import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import TransactionHistoryModel from "../models/TransactionHistoryModel";

export default class TransactionController {
  static async exchange(req: Request, res: Response) {
    const { username, email }: any = req.user;
    const { sendCoin, sendAmount, getCoin, getAmount } = req.body;

    await UserModel.findOne({ email })
      .then((user: any) => {
        if (user) {
          let updatedCoin: number = 0;

          Object.keys(user.wallet).map(key => {
            if (key === sendCoin.toLowerCase()) {
              user.wallet[key] -= sendAmount;
              updatedCoin = user.wallet[key];
            }
            if (key === getCoin.toLowerCase()) {
              user.wallet[key] -= getAmount;
            }
          });

          user.save()
            .then((user: any) => {
              const newHistory: any = new TransactionHistoryModel({
                username,
                email,
                type: 0,
                status: 1,
                coin: sendCoin,
                isExchange: true,
                exchangeCoin: getCoin,
                total: updatedCoin
              });

              newHistory.save().then(() => {
                res.status(200).json({
                  success: true,
                  message: "Successfully exchanged.",
                  user
                });
              });
            })
            .catch((error: Error) => {
              console.log(error);
            });
        } else {
          res.status(404).json({
            success: false,
            message: "Cannot find the wallet for the user."
          });
        }
      });
  }

  static async deposit(req: Request, res: Response) {
    const { username, email }: any = req.user;
    const { coin, amount, hash } = req.body;

    await UserModel.findOne({ email })
      .then(user => {
        if (user) {
          const newDepositHistory: any = new TransactionHistoryModel({
            username,
            email,
            type: 1,
            address: hash,
            coin,
            amount
          });

          newDepositHistory.save()
            .then(() => {
              res.status(200).json({
                success: true,
                message: "You successfully requested the deposit."
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

  static async withdrawal(req: Request, res: Response) {
    const { username, email }: any = req.user;
    const { coin, amount, address } = req.body;

    await UserModel.findOne({ email })
      .then(user => {
        if (user) {
          const newWithdrawalHistory: any = new TransactionHistoryModel({
            username,
            email,
            type: 2,
            address,
            coin,
            amount
          });

          newWithdrawalHistory.save()
            .then(() => {
              res.status(200).json({
                success: true,
                message: "You successfully requested the withdrawal."
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
}