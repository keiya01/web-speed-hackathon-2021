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
  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
    credentials: 'include',
  });
  if (!result.ok) {
    return null;
  }
  return await result.arrayBuffer();
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
  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
    credentials: 'include',
  });
  if (!result.ok) {
    return null;
  }
  return await result.json();
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
  const result = await fetch(url, {
    body: file,
    method: 'post',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/octet-stream',
    },
  });
  if (!result.ok) {
    return null;
  }
  return await result.json();
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
  const result = await fetch(url, {
    body: JSON.stringify(data),
    method: 'post',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!result.ok) {
    return null;
  }
  return await result.json();
}

export { fetchBinary, fetchJSON, sendFile, sendJSON };
