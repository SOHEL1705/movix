import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";


import Img from "../../lazyLoadImg/Img"
import ContentWrapper from "../../contentWrapper/ContentWrapper";
import PosterFallback from "../../assets/no-poster.png";

import "./style.scss";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
// ?====================================================================================================================




const Carousel = ({ data, loading,endpoint ,title}) => {

    const { url } = useSelector((state) => state.home)
    const carouselContainer = useRef()
    const navigate = useNavigate()

    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"> </div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        )
    }

    const navigation = (diraction) => {
        const container = carouselContainer.current

        const scrollAmount = 
        diraction === "left" ?
        container.scrollLeft - (container.offsetWidth + 20) :
        container.scrollLeft + (container.offsetWidth + 20) 

            container.scrollTo({
                left:scrollAmount,
                behavior : "smooth"
            })

    }
    return (
        <div className="carousel">

            <ContentWrapper>
                {title && <div className="carouselTitle">{title}</div> }
                {/* left arrow in carousel */}
                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigation("left")} />
                {/* right arrow in carousel */}
                <BsFillArrowRightCircleFill
                    className="carouselRighttNav arrow"
                    onClick={() => navigation("right")} />

                {!loading ? (
                    <div ref={carouselContainer} className="carouselItems">
                        {data?.map((item) => {
                            const posterUrl = item.poster_path ? url.poster + item.poster_path : PosterFallback
                            return (
                                <div 
                                key={item.id} 
                                onClick={()=>navigate(`/${item.media_type || endpoint}/${item.id}`)}
                                className="carouselItem">
                                    <div className="posterBlock">
                                        <Img src={posterUrl} />
                                        <CircleRating rating={item.vote_average.toFixed(1)}/>
                                        <Genres data={item.genre_ids.slice(0,2)} />
                                    </div>
                                    <div className="textBlock">
                                        <span className="title">
                                            {item.title || item.name}
                                        </span>
                                        <span className="date">
                                            {dayjs(item.release_date).format("MMM D, YYYY")}
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) :
                    <div className="loadingSkeleton">
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                    </div>
                }


            </ContentWrapper>

        </div>
    )
}

export default Carousel