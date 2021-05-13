/*
 *  With the results from this request, inside "content", return
 *  the "name" of the package that has the oldest "date" value
 */

const fetchPackageJson = require('../fetchPackageJson');
const url = require('../fetchParams').url;
const body = require('../fetchParams').body;

module.exports = async function oldestPackageName() {
  const json = await fetchPackageJson(url, body);

  let packageWithOldestDate = json.content.reduce((acc, cur) => {
    const oldestDate  = new Date(acc.package.date);
    const currentItemDate = new Date(cur.package.date); 
    return oldestDate.getTime() < currentItemDate.getTime() ? acc : cur;
  });

  return packageWithOldestDate.package.name;
};