import * as mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    wallet: {
        btc: {
            type: Number,
            default: 0
        },
        eth: {
            type: Number,
            default: 0
        },
        usdt: {
            type: Number,
            default: 0
        },
        xrp: {
            type: Number,
            default: 0
        },
        sol: {
            type: Number,
            default: 0
        },
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('users', UserSchema);