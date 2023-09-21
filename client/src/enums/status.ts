export enum TRANSACTION_STATUS {
  PENDING = 0,
  SUCCESS = 1,
  DECLINED = 2
}

export const TRANSACTION_STATUS_TEXT = ['Pending', 'Success', 'Declined'];

export enum STAKING_STATUS {
  PROGRESS = 0,
  FINISHED = 1,
  EARNED = 2
}

export enum TRADING_STATUS {
  NO_OPEN = 0,
  OPENED = 1,
  EARNED = 2
}