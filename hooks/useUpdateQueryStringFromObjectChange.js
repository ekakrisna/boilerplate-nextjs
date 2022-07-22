import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import qs from 'query-string';

const useUpdateQueryStringFromObjectChange = (object) => {
  const router = useRouter();
  const { pathname, query } = router;
  console.log('pathname', pathname, query, object);

  const keys = Object.keys(object).map((key) => key);

  useEffect(() => {
    const newQuery = { ...query };
    Object.keys(object).forEach((key) => {
      if (keys.includes(key)) {
        delete newQuery[key];
        const current = object[key];
        if (['string', 'number'].includes(typeof current) && !!current) {
          newQuery[key] = current;
        }
        if (Array.isArray(current) && current.length > 0) {
          newQuery[key] = current.join(',');
        }
      }
    });
    router.push({
      pathname,
      query: newQuery,
    });
  }, [object]);
};

export default useUpdateQueryStringFromObjectChange;
