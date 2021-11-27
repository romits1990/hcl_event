if(process.env.NODE_ENV!=='production') {
    require('dotenv').config();
}

const debug = require('debug')('hcl:seed');

const dbConnection = require('../bin/dbConnection');
dbConnection.on('open', async () => {
    try{
        // db drop configure accordingly
        dbConnection.dropDatabase();
        debug(`Database connected successfully.`);
        debug('Seeding started');
        const BookModel = require(`../app/models/BookModel`);
        const seedSource = require('./seedSource.json');
        seedSource.forEach(async (item, index, mainList) => {
            const book = new BookModel(item);
            await book.save({validateBeforeSave: false});
            if(index+1===mainList.length) {
                process.exit();
            }
        });
    }
    catch(error) {
        debug(error);
        process.exit();
    }
});
