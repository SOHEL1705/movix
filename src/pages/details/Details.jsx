import React from 'react'
import "./style.scss"
import useFetch from '../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import DetailsBanner from './detailsBanner/DetailsBanner'
import Cast from './cast/Cast'
import VideosSection from './videosSection/VideosSrction'
import Similar from './carousels/Similer'
import Recommendation from './carousels/Recommendation'
const Details = () => {
  const {mediaType,id}=useParams()
  const {data,loading} = useFetch(`/${mediaType}/${id}/videos`)
  const {data:credits,loading:creditsLoadding} = useFetch(`/${mediaType}/${id}/credits`)

  return (
    <div>
      <DetailsBanner 
      crew  = {credits?.crew}
      video = {data?.results?.[0]} />
      <Cast data={credits?.cast} loading={creditsLoadding} />
      <VideosSection data={data} loading={loading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  )
}

export default Details