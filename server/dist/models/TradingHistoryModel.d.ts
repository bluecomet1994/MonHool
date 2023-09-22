import * as mongoose from 'mongoose';
declare const _default: mongoose.Model<{
    date: Date;
    status: number;
    username: string;
    email: string;
    amount: number;
    endDate: number;
    hit: number;
    time: number;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    date: Date;
    status: number;
    username: string;
    email: string;
    amount: number;
    endDate: number;
    hit: number;
    time: number;
}> & Omit<{
    date: Date;
    status: number;
    username: string;
    email: string;
    amount: number;
    endDate: number;
    hit: number;
    time: number;
} & {
    _id: mongoose.Types.ObjectId;
}, never>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    date: Date;
    status: number;
    username: string;
    email: string;
    amount: number;
    endDate: number;
    hit: number;
    time: number;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    date: Date;
    status: number;
    username: string;
    email: string;
    amount: number;
    endDate: number;
    hit: number;
    time: number;
}>> & Omit<mongoose.FlatRecord<{
    date: Date;
    status: number;
    username: string;
    email: string;
    amount: number;
    endDate: number;
    hit: number;
    time: number;
}> & {
    _id: mongoose.Types.ObjectId;
}, never>>>;
export default _default;
