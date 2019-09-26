import * as fetch from 'node-fetch';
import formatDistanceStrict from 'date-fns/formatDistanceStrict';
import parseISO from 'date-fns/parseISO';
import dotenv from 'dotenv';
import {
  postData,
} from '../db/services/pullrequest.service';
import { fetchNumbersFromString } from '../helpers/datahelpers';

dotenv.config();
const apiKey = process.env.GITHUB_ACCESS_TOKEN;

const getpr = (value) => {
  const link = fetch(`https://api.github.com/repos/rhinogram/${value}/pulls?state=all&access_token=${apiKey}`)
    .then((res) => res.json());
  return link;
};

export const getReviewers = async (component, value) => {
  const link = await fetch(`https://api.github.com/repos/rhinogram/${component}/pulls/${value}/reviews?access_token=${apiKey}`)
    .then((res) => res.json());
  return link;
};

export const getComments = async (component, value) => {
  const link = await fetch(`https://api.github.com/repos/rhinogram/${component}/pulls/${value}/comments?access_token=${apiKey}`)
    .then((res) => res.json());
  return link;
};

export const getprcheck = async () => {
  const getAllPrData = await Promise.all([getpr('rhinofront'), getpr('rhinoapi'), getpr('rhinostyle'), getpr('rhinoaudit'), getpr('rhinopay'), getpr('rhinomatic'), getpr('rhinoaudit-client'), getpr('rhinotilities'), getpr('rhinocron')])
    .then((res) => res)
    .catch((e) => e);
  return getAllPrData;
};

const formatReviewersData = (reviewersData) => {
  const reviewers = reviewersData.map((item) => ({
    username: item.user.login,
    state: item.state,
    body: item.body,
    date: item.submitted_at,
  }));
  return reviewers;
};

const formatCommentsData = (reviewersData) => {
  const comments = reviewersData.map((item) => ({
    username: item.user.login,
    body: item.body,
    date: item.created_at,
  }));
  return comments;
};

export const formatPrData = async () => {
  const data = await getprcheck();
  const totalData = [];
  for (const outerValue of data) {
    for (const innerValue of outerValue) {
      const jiraIdStr = innerValue.head.ref.split('/');
      const jiraId = jiraIdStr.filter((val) => val.toLowerCase().startsWith('rhin')).toString().toUpperCase();
      const newJiraId = jiraId !== '' ? `RHIN-${fetchNumbersFromString(jiraId)}` : '';
      const {
        name,
      } = innerValue.head.repo;
      const {
        number,
      } = innerValue;
      const reviewers = formatReviewersData(await getReviewers(name, number));
      const comments = formatCommentsData(await getComments(name, number));
      const createdAt = innerValue.created_at;
      const closedAt = innerValue.closed_at;
      const myData = {
        prLink: innerValue.html_url,
        prId: innerValue.number,
        raisedBy: innerValue.user.login,
        status: innerValue.state,
        jiraId: newJiraId,
        jiraLink: `https://rhinogram.atlassian.net/browse/${newJiraId}`,
        component: innerValue.head.repo.name,
        openDate: createdAt,
        closeDate: closedAt,
        trt: (closedAt != null)
          ? formatDistanceStrict(parseISO(closedAt), parseISO(createdAt)) : 'N/A',
        reviewers,
        comments,
      };
      totalData.push(myData);
      console.log(totalData.length);
    }
  }
  return totalData;
};

export const postPullRequestData = async () => {
  const data = await formatPrData();
  for (const myData of data) {
    await postData(myData).then((res) => res);
  }
};
