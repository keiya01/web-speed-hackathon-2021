import React from 'react';

import { getMoviePath } from '../../../utils/get_path';
import { AspectRatioBox } from '../../foundation/AspectRatioBox';

/**
 * @typedef {object} Props
 * @property {Models.Movie} movie
 */

/** @type {React.VFC<Props>} */
const MovieArea = ({ movie }) => {
  return (
    <div className="relative w-full h-full bg-gray-300 border border-gray-300 rounded-lg overflow-hidden">
      <AspectRatioBox aspectHeight={1} aspectWidth={1}>
        <video
          controls
          control
          src={getMoviePath(movie.id)}
          type="video/mp4"
          className="w-full h-full"
          width={1080}
          height={1080}
        />
      </AspectRatioBox>
    </div>
  );
};

export { MovieArea };
