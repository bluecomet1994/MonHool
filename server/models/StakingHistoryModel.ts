import * as mongoose from 'mongoose';
import { STAKING_STATUS } from '../enums/status';

const StakingHistorySchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  coin: {
    type: String,
    required: true
  },
  deposit: {
    type: Number,
    required: true
  },
  rate: {
    type: Number,
    required: true
  },
  earning: {
    type: Number,
    required: true
  },
  endDate: {
    type: Number,
    required: true
  },
  status: {
    type: Number,
    default: STAKING_STATUS.PROGRESS
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('stakinghistories', StakingHistorySchema);