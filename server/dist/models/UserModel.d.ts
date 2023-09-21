import * as mongoose from 'mongoose';
declare const _default: mongoose.Model<{
    date: Date;
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
    wallet?: {
        btc: number;
        eth: number;
        usdt: number;
        xrp: number;
        sol: number;
    } | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    date: Date;
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
    wallet?: {
        btc: number;
        eth: number;
        usdt: number;
        xrp: number;
        sol: number;
    } | undefined;
}> & {
    date: Date;
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
    wallet?: {
        btc: number;
        eth: number;
        usdt: number;
        xrp: number;
        sol: number;
    } | undefined;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    date: Date;
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
    wallet?: {
        btc: number;
        eth: number;
        usdt: number;
        xrp: number;
        sol: number;
    } | undefined;
}, mongoose.Document<unknown, {}, {
    date: Date;
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
    wallet?: {
        btc: number;
        eth: number;
        usdt: number;
        xrp: number;
        sol: number;
    } | undefined;
}> & {
    date: Date;
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
    wallet?: {
        btc: number;
        eth: number;
        usdt: number;
        xrp: number;
        sol: number;
    } | undefined;
} & {
    _id: mongoose.Types.ObjectId;
}>>;
export default _default;
