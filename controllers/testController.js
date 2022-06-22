require('dotenv').config();

const axios = require('axios');
const hubspot = require('@hubspot/api-client');
const hubspotClient = new hubspot.Client({
  accessToken: 'eu1-05be-91c8-4daf-92f5-6255163bcbad',
});
const appId = 905045;

exports.getContact = async (req, res) => {
  axios.get(
    'https://api.hubapi.com/crm/v3/timeline/905045/event-templates',
    {
      headers: {
        Authorization: `Bearer ${'eu1-05be-91c8-4daf-92f5-6255163bcbad'}`,
        'Content-Type': 'application/json',
      },
    },
    (err, data) => {
      // Handle the API response
      console.log(err);
      console.log(data);
    }
  );

  res.send('getContact');
};
