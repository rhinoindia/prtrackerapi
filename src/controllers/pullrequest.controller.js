import { postPullRequestData } from '../toolboxes/pullrequest.toolboxes';

import {
  getData,
} from '../db/services/pullrequest.service';

export const postPullRequests = async (req, res) => {
  await postPullRequestData();
  res.json('successfully done!');
};

export const getPullRequests = async (req, res) => {
  const status = req.query;
  const data = await getData(status).then((result) => result);
  return res.json(data);
};
