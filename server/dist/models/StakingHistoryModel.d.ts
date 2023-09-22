import * as mongoose from 'mongoose';
declare const _default: mongoose.Model<{
    date: Date;
    status: number;
    username: string;
    email: string;
    coin: string;
    usd: number;
    deposit: number;
    rate: number;
    earning: number;
    endDate: number;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    date: Date;
    status: number;
    username: string;
    email: string;
    coin: string;
    usd: number;
    deposit: number;
    rate: number;
    earning: number;
    endDate: number;
}> & Omit<{
    date: Date;
    status: number;
    username: string;
    email: string;
    coin: string;
    usd: number;
    deposit: number;
    rate: number;
    earning: number;
    endDate: number;
} & {
    _id: mongoose.Types.ObjectId;
}, never>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    date: Date;
    status: number;
    username: string;
    email: string;
    coin: string;
    usd: number;
    deposit: number;
    rate: number;
    earning: number;
    endDate: number;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    date: Date;
    status: number;
    username: string;
    email: string;
    coin: string;
    usd: number;
    deposit: number;
    rate: number;
    earning: number;
    endDate: number;
}>> & Omit<mongoose.FlatRecord<{
    date: Date;
    status: number;
    username: string;
    email: string;
    coin: string;
    usd: number;
    deposit: number;
    rate: number;
    earning: number;
    endDate: number;
}> & {
    _id: mongoose.Types.ObjectId;
}, never>>>;
export default _default;
