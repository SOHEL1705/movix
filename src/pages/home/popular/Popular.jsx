import React, { useState } from 'react'

import useFatch  from "../../../hooks/useFetch"
import ContentWrapper from '../../../contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import Carousel from '../../../components/carousel/Carousel'


const Popular = () => {

  const [endpoint , setEndpoint] = useState("movie")
  const {data ,loading} = useFatch(`/${endpoint}/popular`)
  const onTabChange = (tab) =>{
    setEndpoint(tab === "Movies" ? "movie" : "tv")
  }
  
  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className="carouselTitle">What's Popular</span>
            <SwitchTabs data = {["Movies","Series"]} onTabChange={onTabChange} />
        </ContentWrapper>
        <Carousel endpoint={endpoint} data={data?.results} loading={loading} />
    </div>
  )
}
export default Popular