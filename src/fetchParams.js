const url = "http://ambush-api.inyourarea.co.uk/ambush/intercept";

const body = {
  url: "https://api.npms.io/v2/search/suggestions?q=react",
  method: "GET",
  return_payload: true
}

module.exports = {
  url: url,
  body: body
}