import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { fetchDataFromApi } from '../../utils/apis'
import Spinner from '../../components/spinner/Spinner';
import ContentWrapper from '../../contentWrapper/ContentWrapper'
import "./style.scss"
import MovieCard from '../../components/movieCard/MovieCard';
import InfiniteScroll from 'react-infinite-scroll-component';

const SearchResult = () => {

  const [data, setData] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [loading, setLoading] = useState(false)
  const { query } = useParams()

  const fetchInitialData = () => {
    setLoading(true)
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNumber}`)
      .then((res) => {
        setData(res)
        setPageNumber((prev) => prev + 1)
        setLoading(false)
      })
  }

  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNumber}`)
    .then(
        (res)=>{
      if(data?.results){
        setData({
          ...data,results : [...data?.results,  ...res.results],
        })
  
      }else{
        setData(res)
      }
      setPageNumber((prev)=>prev + 1)
       })

   }


  useEffect(() => {
    setPageNumber(1)
    fetchInitialData()

  }, [query])


  return (
    <div className='searchResultsPage'>

      {loading && <Spinner initial={true} />}
      {!loading && (
      <ContentWrapper>

        {data?.results?.length > 0 
        ? ( <>
              <div className="pageTitle">
                {`Search ${data?.total_results > 1 ?"results":"result" } of '${query} '`}
              </div>
                <InfiniteScroll  
                dataLength={data?.results?.length || []} 
                className='content'
                next={fetchNextPageData}
                hasMore={pageNumber <=  data?.total_pages}
                loader={<Spinner/>}>
                  {data?.results?.map((item,index)=>{
                    if(item.media_type === "person")return;
                    return(

                      <MovieCard key={index} data={item} fromSearch={true} />
                    )
                  })}
                  
                </InfiniteScroll>
        </> ):
      (<span className="resultNotFound">
        Sorry!,Can't Find the result ......
        </span> )}

      </ContentWrapper>
      )}

    </div>
  )
}

export default SearchResult