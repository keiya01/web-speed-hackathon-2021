/**
 * @param {string} url
 * @returns {Promise<ArrayBuffer>}
 */
async function fetchBinary(url) {
  // const result = await $.ajax({
  //   async: false,
  //   dataType: 'binary',
  //   method: 'GET',
  //   responseType: 'arraybuffer',
  //   url,
  // });
  return await fetch(url, {
    method: 'get',
    mode: 'cors',
    credentials: 'include',
  }).then((data) => data.arrayBuffer());
}

/**
 * @template T
 * @param {string} url
 * @returns {Promise<T>}
 */
async function fetchJSON(url) {
  // const result = await $.ajax({
  //   async: false,
  //   dataType: 'json',
  //   method: 'GET',
  //   url,
  // });
  return await fetch(url, {
    method: 'get',
    mode: 'cors',
    credentials: 'include',
  }).then((data) => data.json());
}

/**
 * @template T
 * @param {string} url
 * @param {File} file
 * @returns {Promise<T>}
 */
async function sendFile(url, file) {
  // const result = await $.ajax({
  //   async: false,
  //   data: file,
  //   dataType: 'json',
  //   headers: {
  //     'Content-Type': 'application/octet-stream',
  //   },
  //   method: 'POST',
  //   processData: false,
  //   url,
  // });
  return await fetch(url, {
    body: file,
    method: 'post',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/octet-stream',
    },
  }).then((data) => data.json());
}

/**
 * @template T
 * @param {string} url
 * @param {object} data
 * @returns {Promise<T>}
 */
async function sendJSON(url, data) {
  // const result = await $.ajax({
  //   async: false,
  //   data: compressed,
  //   dataType: 'json',
  //   headers: {
  //     'Content-Encoding': 'gzip',
  //     'Content-Type': 'application/json',
  //   },
  //   method: 'POST',
  //   processData: false,
  //   url,
  // });
  return await fetch(url, {
    body: data,
    method: 'post',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((data) => data.json());
}

export { fetchBinary, fetchJSON, sendFile, sendJSON };
