import express from 'express';
import {
  getPullRequests,
  postPullRequests,
  searchPullRequests,
} from '../controllers/pullrequest.controller';

const router = express.Router();

// Get pull requests
router.get('/', getPullRequests);

// Post pull requests
router.post('/', postPullRequests);

// Search pull requests
router.get('/search', searchPullRequests);

export default router;
