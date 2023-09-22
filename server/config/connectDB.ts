import * as mongoose from 'mongoose';

export default async () => {
    const mongoURI: string = "mongodb+srv://bluecomet:qkrwlstjd1994@mmastrangelo1120.zooqm3j.mongodb.net/";

    await mongoose.connect(mongoURI)
        .then(() => console.log('MongoDB Connected.'))
        .catch(error => console.log(error));
}