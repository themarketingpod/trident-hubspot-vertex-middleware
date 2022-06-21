const axios = require('axios');
const contactEndpoint = 'contact';

const vertexRequest = require('../api/vertexRequest.js');

/**
 * sendContactDataToVertex
 * Send the data to vertex so it can be updated
 * @param {Object} companyData - An object containing the data to be sent
 */

const sendContactDataToVertex = (contactData) => {
  var axios = require('axios');
  var data = JSON.stringify(contactData);

  var config = {
    method: 'post',
    url: 'http://10.1.1.160/TridentServiceTest/api/hubspotapi/contact',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};

/**
 * formatRequestData
 * Formats the request form HubSpot into the format needed
 * for Vertex
 *
 * @param {Object} requestData - the request coming from Hubspot
 * @return {Object} formattedData - an object formatted for use in Vertex
 */
const formatRequestData = (requestData) => {
  let formattedData = {
    VertexId: requestData.properties.vertex_id.value,
    HubSpotId: requestData.properties.hs_object_id.value,
    VertexCompanyId: 1,
    FirstName: requestData.properties.firstname.value,
    LastName: requestData.properties.lastname.value,
    Salutation: requestData.properties.salutation.value,
    Email: requestData.properties.email.value,
    Mobile: requestData.properties.mobilephone.value,
    Landline: requestData.properties.phone.value,
    JobTitle: requestData.properties.jobtitle.value,
    BuyingRole: requestData.properties.hs_buying_role.value,
    TwitterHandle: requestData.properties.twitterhandle.value,
    LinkedinProfile: requestData.properties.linkedinbio.value,
    AddressLine1: requestData.properties.address.value,
    AddressLine2: null,
    AddressLine3: null,
    Town: requestData.properties.city.value,
    County: requestData.properties.state.value,
    Country: requestData.properties.country.value,
    Postcode: requestData.properties.zip.value,
  };

  return formattedData;
};

exports.updateContact = async (req, res) => {
  let vertexRequestData = formatRequestData(req.body);
  let contactRequest = await vertexRequest(contactEndpoint, vertexRequestData);
  console.log(contactRequest.status);
  res.sendStatus(contactRequest.status);
};
