import * as mongoose from 'mongoose';
import { TRADING_STATUS } from '../enums/status';

const TradingHistorySchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  hit: {
    type: Number,
    required: true
  },
  time: {
    type: Number,
    required: true
  },
  endDate: {
    type: Number,
    required: true
  },
  status: {
    type: Number,
    default: TRADING_STATUS.OPENED
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('tradinghistories', TradingHistorySchema);