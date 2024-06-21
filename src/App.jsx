import React, { useEffect, useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import {fetchDataFromApi} from "./utils/apis"
import { useDispatch,useSelector } from 'react-redux'
import { getApiConfiguration, getGenres } from './store/homeSlice'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Home from './pages/home/Home'
import Explore from './pages/explore/Explore'
import Details from './pages/details/Details'
import PageNotFound from './pages/404/PageNotFound'
import SearchResult from './pages/searchResult/SearchResult'


const App = () => {

const dispatch = useDispatch()  
const {url} = useSelector((state)=> state.home);
// console.log(url);
  useEffect(()=>{
    fetchApiConfiguration()
    genresCalls()
  },[])
    const fetchApiConfiguration = () =>{
      fetchDataFromApi('/configuration')
        .then((res)=>{
          console.log(res);

          const url = {
            backDrop:res.images.secure_base_url + "original",
            poster:res.images.secure_base_url + "original",
            profile:res.images.secure_base_url + "original",
          }

          dispatch(getApiConfiguration(url))
        })
      }
      const genresCalls = async () =>{
        let promises = []
        let endPoints = ["tv","movie"]
        let allGenres = {}

          endPoints.forEach((url)=>{
            promises.push(fetchDataFromApi(`/genre/${url}/list`))
          })
          const data = Promise.all(promises)
          ;(await data).map(({genres})=>{
            return genres.map((item)=>(allGenres[item.id] = item))
          })
          dispatch(getGenres(allGenres))
      }
  return (
  <BrowserRouter>

      <Header/>

    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/:mediaType/:id' element={<Details/>}/>
      <Route path='/search/:query' element={<SearchResult/>}/>
      <Route path="/explore/:mediaType" element={<Explore/>}/>
      <Route path='*' element={<PageNotFound/>}/>
    </Routes>

      <Footer/>

  </BrowserRouter>
  )
}

export default App