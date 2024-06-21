import React from 'react'
import HeroBanner from './heroBanner/HeroBanner'
import Popular from "./popular/Popular"
import Tranding from './tranding/Tranding'


import "./style.scss"
import TopRated from './topRated/TopRated'

const Home = () => {
  return (
    <div className='homePage'>

        <HeroBanner/>
        <Tranding/>
        <Popular/>
        <TopRated/>




                                    
    </div>
  )
}

export default Home