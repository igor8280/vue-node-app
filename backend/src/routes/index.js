import express from 'express';
import config from '../config';
import initDb from '../db';
import middleware from '../middlewares';
import { authenticate } from '../middlewares/authMiddleware';

import languageCtrl from '../controllers/language';
import countryCtrl from '../controllers/country';
import userCtrl from '../controllers/user';
import authCtrl from '../controllers/auth';
import imageCtrl from '../controllers/image';

let router = express();

// connect to db
initDb(db => {

    // internal middlewares
    router.use(middleware({ config, db }));

    //  api routes v1 (/v1)
	router.use('/languages', authenticate, languageCtrl({ config, db }));
	router.use('/countries', authenticate, countryCtrl({ config, db }));
	router.use('/auth', authCtrl({ config, db }));
	router.use('/users', userCtrl({ config, db })); // SHOULD HAVE AUTH ALSO!!!
	router.use('/images', authenticate, imageCtrl({ config, db }));
});

export default router;
