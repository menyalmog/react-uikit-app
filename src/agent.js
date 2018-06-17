import superagent from 'superagent';

const API_ROOT = '/api/v1';

const encode = encodeURIComponent;
const responseBody = res => res.body;

const requests = {
  get: url =>
    superagent.get(API_ROOT + url).then(responseBody)
};

const Companies = {
  all: () =>
    requests.get('/company'),
  byID: (companyID) =>
    requests.get('/company/' + encode(companyID))
};

const Discover = {
  all: () =>
    requests.get('/discover')
};

export default {
  Companies,
  Discover
};
