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
        const UserBookModel = require(`../app/models/UserBookModel`);
        const seedSource = require('./seedSource.json');
        seedSource.forEach(async (item, index, mainList) => {
            let { title, author, fee, status } = item;
            let book = {
                title: title,
                author: author,
                fee: fee
            }
            const bookModel = new BookModel(book);
            await bookModel.save({validateBeforeSave: false});
            if(status==='borrowed') {
                const userbookModel = new UserBookModel({
                    user: 'dummy',
                    book: bookModel._id,
                    due: new Date()
                });
                await userbookModel.save({validateBeforeSave: false});
                bookModel.borrowedStatus = true;
                await bookModel.save({validateBeforeSave: false});
            }
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
