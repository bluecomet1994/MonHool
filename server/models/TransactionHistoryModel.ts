import * as mongoose from 'mongoose';
import { TRANSACTION_STATUS } from '../enums/status';

const TransactionHistorySchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  type: {
    type: Number,
    required: true
  },
  address: {
    type: String
  },
  status: {
    type: Number,
    default: TRANSACTION_STATUS.PENDING
  },
  coin: {
    type: String,
    required: true
  },
  isExchange: {
    type: Boolean,
    default: false
  },
  exchangeCoin: {
    type: String
  },
  amount: {
    type: Number,
    default: 0
  },
  usd: {
    type: Number,
    default: 0
  },
  total: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('transactionHistory', TransactionHistorySchema);