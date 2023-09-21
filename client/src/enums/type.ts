export enum TRANSACTION_TYPE {
  EXCHANGE = 0,
  DEPOSIT = 1,
  WITHDRAWAL = 2
}

export const TRANSACTION_TYPE_TEXT = ['Exchange', 'Deposit', 'Withdrawal'];

export enum DASHBOARD_TYPE {
  DAY = 1,
  WEEK = 7,
  MONTH = 180,
  YEAR = 365,
  ALL = 0
}