import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useCoordinates } from '../hooks/use-coordinates';
import { SearchLoader } from '../ui-kit/search-loader';

export default function Search() {

  const router = useRouter();

  const params = router.query;

  const { data, isLoading, error } = useCoordinates(params);

  return (
    <>
      {isLoading ? <SearchLoader />
        :
        <div>Search</div>
      }
    </>
  )
}
