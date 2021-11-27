if(process.env.NODE_ENV!=='production') {
    require('dotenv').config();
}

const debug = require('debug')('erm:seed');

const dbConnection = require('../bin/dbConnection');
dbConnection.on('open', async () => {
    try{
        // db drop configure accordingly
        dbConnection.dropDatabase();
        debug(`Database connected successfully.`);
        debug('Seeding started');
        await startSeeding();
        debug('Seeding finished');
        dbConnection.close();
    }
    catch(error) {
        debug(error);
        process.exit();
    }
});
dbConnection.once('error', () => { debug('Database connection error.'); });
dbConnection.on('disconnected', () => { debug('Database disconnected successfully.'); });

function startSeeding() {
    return new Promise((resolve, reject) => {
        const seedSource = require('./seedSource.json');
        let userRole;
        seedSource.forEach((seedItem, seedIndex) => {
            const currentSeedItemIndex = seedIndex + 1;
            const model = require(`../app/models/${seedItem.model}Model`);
            const data = seedItem.data;
            data.forEach(async (item, index) => {
                let currentIndex = index + 1;
                try {

                    if(typeof userRole!=='undefined' && seedItem.model==='user') {
                        item.role = userRole._id;
                    }

                    const newData = new model(item);

                    if(seedItem.model==='role') {
                        userRole = newData;
                    }
                    
                    await newData.save({validateBeforeSave: false});

                    if(currentIndex===data.length) {
                        debug(`${data.length} ${seedItem.model} seeded`);
                        if(currentSeedItemIndex===seedSource.length) {
                            resolve();
                        }
                    }
                }
                catch(error) {
                    debug(error);
                    resolve();
                }
            });
        });
    })
}
