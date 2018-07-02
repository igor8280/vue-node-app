import express from 'express';
import config from '../config';
import initDb from '../db';
import middleware from '../middleware';
import testCtrl from '../controllers/testCtrl';
import countryCtrl from '../controllers/countryCtrl';

let router = express();

// connect to db
initDb(db => {

    // internal middleware
    router.use(middleware({ config, db }));

    //  api routes v1 (/v1)
	router.use('/testApi', testCtrl({ config, db }));
	router.use('/countries', countryCtrl({ config, db }));
});

export default router;