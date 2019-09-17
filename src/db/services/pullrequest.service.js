import pr from '../models/pullrequest.model';
import isEmptyObject from '../../helpers/datahelpers';

export const postData = async (mydata) => {
  const postPrData = await pr.updateOne({
      link: mydata.link,
    }, mydata, {
      upsert: true,
    })
    .then((res) => res)
    .catch((error) => console.log(error));
  return postPrData;
};

export const getData = async (status) => {
  const defaultFilter = {
    status: 'open',
  };
  try {
    const data = await pr.find(!isEmptyObject(status) ? status : defaultFilter);
    return data;
  } catch (error) {
    return console.log(error);
  }
};

export const searchData = async (data) => {
  const myData = pr.find({
    jiraId: {
      $regex: new RegExp(data),
    }
  }, {
    _id: 0,
    _v: 0,
  }, (err, result)=>{
    console.log(result);
  }).limit(10);
  return myData
};