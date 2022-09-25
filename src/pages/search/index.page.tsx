import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useCoordinates } from '../hooks/use-coordinates';
import { SearchLoader } from '../../ui-kit/search-loader/search-loader';
import styled from 'styled-components';

const Wrapper = styled.div`
  min-height: 100vh;
  position: relative;
`

export default function Search() {

  const router = useRouter();

  const params = router.query;

  const { data, isLoading, error } = useCoordinates(params);

  useEffect(() => {
    if (!data && !error) isLoading === false
  }, [data, error])

  return (
    <>
      {isLoading ? <SearchLoader />
        :
        <Wrapper><div className='absolute top-[50%] left-[50%] text-lg text-pink-500 text-shadow'>Your epic search results!</div></Wrapper>
      }
    </>
  )
}
