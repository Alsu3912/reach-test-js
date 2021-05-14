/*
 *  With the results from this request, inside "content", count
 *  the number of packages that have a MAJOR semver version 
 *  greater than 10.x.x
 */
const fetchPackageJson = require('../fetchPackageJson');
const url = require('../fetchParams').url;
const body = require('../fetchParams').body;

const extractMajorVersionNumber = (version) => {
  const majorVersion = version.split('.')[0];
  return parseInt(majorVersion, 10);
}

module.exports = async function countMajorVersionsAbove10() {
  let count = 0;

  const json = await fetchPackageJson(url, body);
  
  json.content.forEach(element => {
    if (extractMajorVersionNumber(element.package.version) > 10) {
      count++;
    }
  });

  return count;
};
