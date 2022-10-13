import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useCoordinates } from '../hooks/use-coordinates';
import { SearchLoader } from '../../ui-kit/search-loader/search-loader';
import styled from 'styled-components';

const Wrapper = styled.div`
  min-height: 100vh;
  position: relative;
`

export default function Search(props) {

  const { data, isLoading, error } = useCoordinates(props);

  useEffect(() => {
    if (!data && !error) isLoading === false
    if (data) {
      console.log(data);

    }
  }, [data, error])


  return (
    <>
      {isLoading ? <SearchLoader />
        :
        <Wrapper><div className='absolute top-[50%] left-[50%] text-lg text-pink-500 text-shadow'>{`Your epic search results! ${data.response}`}</div></Wrapper>
      }
    </>
  )
}

export async function getServerSideProps(context) {
  const body = context.query

  return {
    props: {
      params: body
    }
  }
}
