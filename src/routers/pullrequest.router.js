import express from 'express';
import {
  getPullRequests,
  postPullRequests,
} from '../controllers/pullrequest.controller';

const router = express.Router();

// Get pull requests
router.get('/', getPullRequests);

// Post pull requests
router.post('/', postPullRequests);

export default router;
