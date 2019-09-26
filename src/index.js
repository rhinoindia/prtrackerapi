const express = require ('express');
const app = express();

app.use(cors());

// Middlewares
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());


// Cron Jobs
// eslint-disable-next-line no-new
new CronJob('1 */3 * * *', () => {
  console.log('Cron job running!');
  postPullRequestData();
}, null, true, 'Asia/Kolkata');

// Routes
app.use('/api/pullrequests/', pullRequests);
const port = 4000;
// Start the server
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App Listening at port ${port}`);
});
