import pr from '../models/pullrequest.model';

export const postData = async (mydata) => {
  const postPrData = await pr.updateOne({
    prLink: mydata.prLink,
  }, mydata, {
    upsert: true,
  })
    .then((res) => res)
    // eslint-disable-next-line no-console
    .catch((error) => console.log(error));
  return postPrData;
};

export const getData = async (filters) => {
  console.log(filters);
  let defaultFilter = {};
  try {
    if (filters.status === 'all' && filters.component === 'all') {
      defaultFilter = {};
    } else if (filters.component === 'all') {
      defaultFilter.status = filters.status;
    } else if (filters.status === 'all') {
      defaultFilter.component = filters.component;
    } else {
      defaultFilter = filters;
    }
    const data = await pr.find(defaultFilter)
      .sort({ openDate: -1 });
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    return console.log(error);
  }
};

export const searchData = async (data) => {
  const myData = pr.find({
    jiraId: {
      $regex: new RegExp(data),
    },
  }, {
    _id: 0,
    _v: 0,
  }, (err, result) => {
    // eslint-disable-next-line no-console
    console.log(result);
  }).limit(10);
  return myData;
};
