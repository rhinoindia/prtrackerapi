import * as mongoose from 'mongoose';

const { Schema } = mongoose;
// create a schema
const pullRequest = new Schema({
  id: {
    type: Schema.Types.ObjectId,
  },
  link: {
    type: String,
    required: true,
  },
  prId: {
    type: String,
    required: true,
  },
  raisedBy: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  jiraId: {
    type: String,
  },
  component: {
    type: String,
  },
  openDate: {
    type: Date,
  },
  closeDate: {
    type: Date,
  },
  trt: {
    type: String,
  },
  reviewers: [{
    username: {
      type: String,
    },
    state: {
      type: String,
    },
    body: {
      type: String,
    },
    date: {
      type: Date,
    },
  }],
  comments: [{
    username: {
      type: String,
    },
    body: {
      type: String,
    },
    date: {
      type: Date,
    },
  }],
});

//  create a model
const Pr = mongoose.model('pullrequest', pullRequest);

//  export a schema
export default Pr;
