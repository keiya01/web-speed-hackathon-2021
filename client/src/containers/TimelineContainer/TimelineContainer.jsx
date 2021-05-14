import React from 'react';
import { Helmet } from 'react-helmet';

import { InfiniteScroll } from '../../components/foundation/InfiniteScroll';
import { TimelinePage } from '../../components/timeline/TimelinePage';
import { useInfiniteFetch } from '../../hooks/use_infinite_fetch';
import { fetchJSON } from '../../utils/fetchers';
import { API_URL } from '../../utils/get_path';

/** @type {React.VFC} */
const TimelineContainer = () => {
  const { data: posts, fetchMore } = useInfiniteFetch(API_URL + '/api/v1/posts', fetchJSON);

  return (
    <InfiniteScroll fetchMore={fetchMore}>
      <Helmet>
        <title>タイムライン - CAwitter</title>
      </Helmet>
      <TimelinePage timeline={posts} />
    </InfiniteScroll>
  );
};

export { TimelineContainer };
