import React, { useEffect, useState } from 'react'

import Img from '../../../lazyLoadImg/Img'
import ContentWrapper from '../../../contentWrapper/ContentWrapper'
import "./style.scss"


import { useSelector } from 'react-redux'
import useFatch from "../../../hooks/useFetch"
import { useNavigate } from 'react-router-dom'
const HeroBanner = () => {
    const navigate = useNavigate()
    const { url } = useSelector((state) => state.home)
    const [background, setBackground] = useState("")
    const [query, setQuery] = useState("")
    const { data, loading } = useFatch("/movie/upcoming") //1:36 tile laps


    useEffect(() => {
        const rnd = Math.floor(Math.random() * 20)
        const bg = url.backDrop + data?.results?.[rnd]?.backdrop_path
        setBackground(bg)
    }, [data])
    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`)
        }
    }
    return (
        <div className="heroBanner">
            {!loading && <div className="backdrop-img">
                <Img src={background} />
            </div>}
            <div className='opacity-layer'></div>
                <ContentWrapper>
                    <div className="heroBannerContent">
                        <span className="title">Welcome.</span>
                        <span className="SubTitle">Millions of movies, TV shows and people to discover. Explore now</span>
                        <div className="searchInput">
                            <input
                                onKeyUp={searchQueryHandler}
                                onChange={(e) => setQuery(e.target.value)}
                                type="text"
                                placeholder='Search for a movies or tv shows....'
                            /><button>Search</button>
                        </div>
                    </div>
                </ContentWrapper>
        </div>
    )
}

export default HeroBanner