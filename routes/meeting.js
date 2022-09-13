import express from 'express';
import {isAuth} from '../middleware/auth.js';

import * as meetController from '../controller/meeting.js';

const router = express.Router();
// url restful api 로 설계할 것!, controller는 상관 없음
// Get meeting list
router.get('/', isAuth, meetController.getMeetingList);
// Create meeting
router.post('/create', isAuth, meetController.createMeeting);
// Join meeting
router.post('/join', isAuth, meetController.joinMeeting);

export default router;