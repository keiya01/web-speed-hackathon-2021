import React from 'react';

import { getMoviePath } from '../../../utils/get_path';
import { PausableMovie } from '../../foundation/PausableMovie';

/**
 * @typedef {object} Props
 * @property {Models.Movie} movie
 */

/** @type {React.VFC<Props>} */
const MovieArea = ({ movie }) => {
  return (
    <div className="relative w-full h-full bg-gray-300 border border-gray-300 rounded-lg overflow-hidden">
      <video src={getMoviePath(movie.id)} type="video/mp4" />
    </div>
  );
};

export { MovieArea };
