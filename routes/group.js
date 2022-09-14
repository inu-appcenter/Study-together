import express from 'express';
import {isAuth} from '../middleware/auth.js';

import * as groupController from '../controller/group.js';

const router = express.Router();
// url restful api 로 설계할 것!, controller는 상관 없음
// Get meeting list
router.get('/', isAuth, groupController.getGroupList);
// Create meeting
router.post('/create', isAuth, groupController.createGroup);
// Join meeting
router.post('/join', isAuth, groupController.joinGroup);

export default router;