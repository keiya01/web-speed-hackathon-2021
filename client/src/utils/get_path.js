const API_URL = 'https://web-speed-hackathon2021.herokuapp.com';

/**
 * @param {string} imageId
 * @returns {string}
 */
function getImagePath(imageId) {
  return `${API_URL}/images/${imageId}.jpg`;
}

/**
 * @param {string} movieId
 * @returns {string}
 */
function getMoviePath(movieId) {
  return `${API_URL}/movies/${movieId}.gif`;
}

/**
 * @param {string} soundId
 * @returns {string}
 */
function getSoundPath(soundId) {
  return `${API_URL}/sounds/${soundId}.mp3`;
}

/**
 * @param {string} profileImageId
 * @returns {string}
 */
function getProfileImagePath(profileImageId) {
  return `${API_URL}/images/profiles/${profileImageId}.jpg`;
}

export { getImagePath, getMoviePath, getSoundPath, getProfileImagePath, API_URL };
