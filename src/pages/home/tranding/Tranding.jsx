import React, { useState } from 'react'

import useFatch  from "../../../hooks/useFetch"
import ContentWrapper from '../../../contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import Carousel from '../../../components/carousel/Carousel'


const Tranding = () => {

  const [endpoint , setEndpoint] = useState("day")
  const {data ,loading} = useFatch(`/trending/all/${endpoint}`)
  const onTabChange = (tab) =>{
    setEndpoint(tab === "Day" ? "day" : "week")
  }
  
  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className="carouselTitle">Tranding</span>
            <SwitchTabs data = {["Day","Week"]} onTabChange={onTabChange} />
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading} />
    </div>
  )
}

export default Tranding