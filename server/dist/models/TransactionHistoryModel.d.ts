import * as mongoose from 'mongoose';
declare const _default: mongoose.Model<{
    type: number;
    date: Date;
    status: number;
    username: string;
    email: string;
    coin: string;
    isExchange: boolean;
    amount: number;
    usd: number;
    address?: string | undefined;
    exchangeCoin?: string | undefined;
    total?: number | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    type: number;
    date: Date;
    status: number;
    username: string;
    email: string;
    coin: string;
    isExchange: boolean;
    amount: number;
    usd: number;
    address?: string | undefined;
    exchangeCoin?: string | undefined;
    total?: number | undefined;
}> & {
    type: number;
    date: Date;
    status: number;
    username: string;
    email: string;
    coin: string;
    isExchange: boolean;
    amount: number;
    usd: number;
    address?: string | undefined;
    exchangeCoin?: string | undefined;
    total?: number | undefined;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    type: number;
    date: Date;
    status: number;
    username: string;
    email: string;
    coin: string;
    isExchange: boolean;
    amount: number;
    usd: number;
    address?: string | undefined;
    exchangeCoin?: string | undefined;
    total?: number | undefined;
}, mongoose.Document<unknown, {}, {
    type: number;
    date: Date;
    status: number;
    username: string;
    email: string;
    coin: string;
    isExchange: boolean;
    amount: number;
    usd: number;
    address?: string | undefined;
    exchangeCoin?: string | undefined;
    total?: number | undefined;
}> & {
    type: number;
    date: Date;
    status: number;
    username: string;
    email: string;
    coin: string;
    isExchange: boolean;
    amount: number;
    usd: number;
    address?: string | undefined;
    exchangeCoin?: string | undefined;
    total?: number | undefined;
} & {
    _id: mongoose.Types.ObjectId;
}>>;
export default _default;
