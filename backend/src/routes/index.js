import express from 'express';
import config from '../config';
import initDb from '../db';
import middleware from '../middleware';
import { authenticate } from '../middleware/authMiddleware';

import languageCtrl from '../controllers/language';
import countryCtrl from '../controllers/country';
import userCtrl from '../controllers/user';
import authCtrl from '../controllers/auth';

let router = express();

// connect to db
initDb(db => {

    // internal middleware
    router.use(middleware({ config, db }));

    //  api routes v1 (/v1)
	router.use('/languages', authenticate, languageCtrl({ config, db }));
	router.use('/countries', authenticate, countryCtrl({ config, db }));
	router.use('/users', userCtrl({ config, db }));
	router.use('/auth', authCtrl({ config, db }));
});

export default router;