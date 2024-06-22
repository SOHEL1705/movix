import React from 'react'

import "./style.scss";
import { useSelector } from 'react-redux';




const Genres = ({data}) => {
    const {genres} = useSelector((state)=>(state.home))
  return (
    <div className="genres">
        {data?.map((itemG)=>{
            if(!genres[itemG]?.name)return;
            return (
                <div key={itemG} className="genre">
                    {genres[itemG]?.name}
                </div>
            )
        })}
    </div>
  )
}

export default Genres