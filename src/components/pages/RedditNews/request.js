import fetch from 'isomorphic-fetch';



/** 
The list of features we want to look far in the IBM request, 
Changing this to just sentiment because then we won't exceed the request limit
*/
// const FEATURES = {
//   features: {
//     concepts: {},
//     entities: {},
//     keywords: {},
//     categories: {},
//     emotion: {},
//     sentiment: {},
//     semantic_roles: {},
//     syntax: {
//       tokens: {
//         lemma: true,
//         part_of_speech: true,
//       },
//       sentences: true,
//     },
//   },
// };


/**
 * NLU limit is calculated based off of how many features are extracted
 * and how many units of text you have
 * A unit of text is anything below 10,000 characters
 * So before we were sending 100 (Events) * 12 Features per refresh of the page
 * 1200 per refresh * like 100 refershes (very reasonable)
 * Now its 200, I can get in 6 times more requests
 * DB is defintley the best solution
 * TODO: Database INTEGRATION
 */


const FEATURES = {
  features: {
    concepts: {},
    sentiment: {},
  },
};

/**
 * 
 * @return 
 * converts the response from the IBM server to a json obj
 */
const parseJSON = (response) => { // eslint-disable-line
  return response.json();
};

const handleErrors = (response) => {
  if (response.error) {
    throw response;
  }
  return response;
};

/**
 * Calls the NLU /analyze endpoint
 *
 * @param  {Object} params The parameters
 * @return {Promise}       The request promise
 * Fetches the request from the proxy servers which allows it to call the NLU endpoint
 * Necessary because NLU does not supports CORS at this point in time 
 */
export const analyze = params => fetch('/api/analyze', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify(params),
})
  .then(parseJSON)
  .then(handleErrors);


/**
 * Extend the `params` parameters with all the text
 * features before calling `analyze`.
 *
 * @param  {Object} params The parameters
 * @return {Promise}        The request promise
 */
export const analyzeWithAllFeatures = (params) => {
  const query = Object.assign({}, FEATURES, params);
  return analyze(query);
};
