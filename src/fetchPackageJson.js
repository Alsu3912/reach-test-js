const fetch = require('node-fetch');

fetchPackageJson = async (url, body) => {
  const response = await fetch(url, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error("Failed to fetch due to an error. HTTP code: " + response.status)
  }

  const json = await response.json();
  return json;
}

module.exports = fetchPackageJson;