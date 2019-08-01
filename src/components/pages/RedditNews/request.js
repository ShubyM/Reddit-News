import fetch from "isomorphic-fetch";

/**
 * The NLU limit, the number of requests we can make to the IBM server,
 * is calculated based off of how many features are being
 * extracted and how many units of text you have. A unit of text is anything
 * below 10,000 characters. So before we were sending 100
 * units of texts * 12 features every time the page was refreshed. By changing the number of
 * features extracted to 2 we can get 200 NLU items per refresh.
 * So 6 times more requests in total can be made.
 * TODO: Database INTEGRATION
 */
const FEATURES = {
  features: {
    concepts: {},
    sentiment: {}
  }
};

/**
 *
 * @return
 * converts the response from the IBM server to a json object
 */
const parseJSON = response => {
  return response.json();
};

/**
 *
 * @param {error} response
 * Throws the response
 */
const handleErrors = response => {
  if (response.error) {
    throw response;
  }
  return response;
};

/**
 * Calls the NLU /analyze endpoint.
 * Necessary to fetch it from the proxy servers 
 * because NLU does not supports CORS currently.
 *
 * @param  {Object} params The parameters
 * @return {Promise} The request promise
 */
export const analyze = params =>
  fetch("/api/analyze", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(params)
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
export const analyzeWithAllFeatures = params => {
  const query = Object.assign({}, FEATURES, params);
  return analyze(query);
};
