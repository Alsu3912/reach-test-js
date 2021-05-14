/*
 ******

 * With the results from this request, inside "content", 
 * list every maintainer and each package name that they maintain,
 * return an array with the following shape:
[
    ...
    {
        username: "a-username",
        packageNames: ["a-package-name", "another-package"]
    }
    ...
]
 * NOTE: the parent array and each "packageNames" array should 
 * be in alphabetical order.
 */

const fetchPackageJson = require('../fetchPackageJson');
const url = require('../fetchParams').url;
const body = require('../fetchParams').body;

const createMaintainersMap = (array) => {
  let maintainersMap = new Map();

  array.forEach(element => {
    const packageName = element.package.name;
    const maintainers = element.package.maintainers;

    maintainers.forEach(element => {
      if (maintainersMap.has(element.username)) {
        maintainersMap.get(element.username).push(packageName);
      } else {
        maintainersMap.set(element.username, [packageName]);
      }
    })
  });

  return maintainersMap;
};

const transformMap = (map) => {
  let result = [];

  for (const [key, value] of map.entries()) {
    value.sort();
    result.push({ username: key, packageNames: value });
  };

  result.sort((a, b) => a.username.localeCompare(b.username));

  return result;
};

module.exports = async function organiseMaintainers() {
  const json = await fetchPackageJson(url, body);

  const maintainersMap = createMaintainersMap(json.content);
  const result = transformMap(maintainersMap);

  return result;
};