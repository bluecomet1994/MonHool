import { Request, Response } from "express";
import * as _ from 'lodash';
import UserModel from "../models/UserModel";
import TransactionHistoryModel from "../models/TransactionHistoryModel";
import { STAKING_STATUS, TRADING_STATUS, TRANSACTION_STATUS } from "../enums/status";
import { TRANSACTION_TYPE } from "../enums/type";
import StakingHistoryModel from "../models/StakingHistoryModel";
import TradingHistoryModel from "../models/TradingHistoryModel";

export default class TransactionController {
  static async dashboard(req: Request, res: Response) {
    const { username, email }: any = req.user;
    const { range } = req.body;

    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - range);
    const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const futureDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + range);

    let allEarning: number[] = [0, 0];
    let staking: number[] = [0, 0];
    let trading: number[] = [0, 0];

    await StakingHistoryModel.find({ email, date: { $gte: startDate, $lt: endDate } })
      .then(lastHistories => {
        lastHistories.map(history => {
          if (history.status === STAKING_STATUS.EARNED) {
            staking[0] += history.usd;
          }
        });
      });

    await StakingHistoryModel.find({ email, date: { $gte: endDate, $lt: futureDate } })
      .then(histories => {
        histories.map(history => {
          if (history.status === STAKING_STATUS.EARNED) {
            staking[1] += history.usd;
          }
        });
      });

    await TradingHistoryModel.find({ email, date: { $gte: startDate, $lt: endDate } })
      .then(lastHistories => {
        lastHistories.map(history => {
          if (history.status === TRADING_STATUS.EARNED) {
            trading[0] += history.amount;
          }
        });
      });

    await TradingHistoryModel.find({ email, date: { $gte: endDate, $lt: futureDate } })
      .then(histories => {
        histories.map(history => {
          if (history.status === TRADING_STATUS.EARNED) {
            trading[1] += history.amount;
          }
        });
      });

    allEarning[0] = staking[0] + trading[0];
    allEarning[1] = staking[1] + trading[1];

    res.status(200).json({
      success: true,
      valid: true,
      message: "Dashboard data loaded.",
      result: {
        allEarning,
        staking,
        trading
      }
    });
  }

  static async exchange(req: Request, res: Response) {
    const { username, email }: any = req.user;
    const { sendCoin, sendAmount, getCoin, getAmount } = req.body;

    await UserModel.findOne({ email })
      .then((user: any) => {
        if (user) {
          let updatedCoin: number = 0;
          let isAllowed: boolean = false;

          Object.keys(user.wallet).map(key => {
            if (key === sendCoin.toLowerCase()) {
              if (user.wallet[key] < sendAmount) {
                res.status(200).json({
                  success: false,
                  valid: true,
                  message: "You do not have enough coin to exchange."
                });
              } else {
                user.wallet[key] -= sendAmount;
                updatedCoin = user.wallet[key];
                isAllowed = true;
              }
            }
            if (key === getCoin.toLowerCase()) {
              user.wallet[key] += getAmount;
            }
          });

          if (isAllowed) {
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
                    valid: true,
                    message: "Successfully exchanged.",
                    user: _.pick(user, ['username', 'email', 'wallet', 'date'])
                  });
                });
              })
              .catch((error: Error) => {
                console.log(error);
              });
          }
        } else {
          res.status(404).json({
            success: false,
            valid: true,
            message: "Cannot find the wallet for the user."
          });
        }
      });
  }

  static async deposit(req: Request, res: Response) {
    const { username, email }: any = req.user;
    const { coin, amount, usd, hash } = req.body;

    await UserModel.findOne({ email })
      .then(user => {
        if (user) {
          const newDepositHistory: any = new TransactionHistoryModel({
            username,
            email,
            type: 1,
            address: hash,
            coin,
            amount,
            usd
          });

          newDepositHistory.save()
            .then(() => {
              res.status(200).json({
                success: true,
                valid: true,
                message: "You successfully requested the deposit."
              });
            })
            .catch((error: Error) => console.log(error));
        } else {
          res.status(404).json({
            success: false,
            valid: true,
            message: "Cannot find the wallet for the user."
          });
        }
      });
  }

  static async withdrawal(req: Request, res: Response) {
    const { username, email }: any = req.user;
    const { coin, amount, usd, address } = req.body;

    await UserModel.findOne({ email })
      .then((user: any) => {
        if (user) {
          if (user.wallet[coin.toLowerCase()] < amount) {
            res.status(200).json({
              success: false,
              valid: true,
              message: "You do not have enough coin to exchange."
            });
          } else {
            const newWithdrawalHistory: any = new TransactionHistoryModel({
              username,
              email,
              type: 2,
              address,
              coin,
              amount,
              usd
            });

            newWithdrawalHistory.save()
              .then(() => {
                res.status(200).json({
                  success: true,
                  valid: true,
                  message: "You successfully requested the withdrawal."
                });
              })
              .catch((error: Error) => console.log(error));
          }
        } else {
          res.status(404).json({
            success: false,
            valid: true,
            message: "Cannot find the wallet for the user."
          });
        }
      });
  }

  static async getHistory(req: Request, res: Response) {
    const { email }: any = req.user;

    await TransactionHistoryModel.find({ email, status: TRANSACTION_STATUS.SUCCESS }).sort({ date: -1 })
      .then(history => {
        res.status(200).json({
          success: true,
          valid: true,
          history
        });
      })
  }

  static async getDepositHistory(req: Request, res: Response) {
    const { email }: any = req.user;

    await TransactionHistoryModel.find({ email, type: TRANSACTION_TYPE.DEPOSIT }).sort({ date: -1 })
      .then(history => {
        res.status(200).json({
          success: true,
          valid: true,
          history
        });
      })
  }

  static async getWithdrawalHistory(req: Request, res: Response) {
    const { email }: any = req.user;

    await TransactionHistoryModel.find({ email, type: TRANSACTION_TYPE.WITHDRAWAL }).sort({ date: -1 })
      .then(history => {
        res.status(200).json({
          success: true,
          valid: true,
          history
        });
      })
  }
}