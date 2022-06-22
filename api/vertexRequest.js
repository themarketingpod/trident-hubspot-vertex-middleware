/**
 * trident-hubspot-vertex-middleware - vertexRequest.js
 * @author Kris Bradbury
 */

// Import AXIOS
const axios = require('axios');

// Set Vars
const endpointBase = 'http://10.1.1.160/TridentServiceTest/api/hubspotapi/';

/**
 * Sends the request to Vertex
 * Returns a success / unsuccessful response
 *
 * @param {strong} endpoint - the endpoint to send the data too
 * @param {object} data - the data to send
 */
async function vertexRequest(endpoint, data) {
  // console.log(endpoint);
  // console.table(data);

  let requestConfig = {
    method: 'post',
    url: `${endpointBase}${endpoint}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  return await axios(requestConfig);
}

module.exports = vertexRequest;
