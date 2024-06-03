import React, { useEffect, useState } from 'react'
import './CSS/Movies.css'
import { BaseURL, message, tempMovies } from '../Global';
import Cards from './Cards';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const Movies = () => {
    const [movieList, setMovieList] = useState([]);
    const [Empty, setEmpty] = useState(false);
    const para = useParams();
    const wishlistId = para.wishlistId;

    useEffect(()=>{
        getMovies();
    },[])
    const getMovies = async () => {
        try {
          const res = await axios.post(`${BaseURL}/allmovies`, { wishlistId })
          console.log(res.data.wishlist.movies)
          setMovieList(res.data.wishlist.movies)
          if(res.data.wishlist.movies.length==0){
            message("Wishlist is Empty, Please add movies")
            setEmpty(true)
          }
        //   setWishlist(res.data.wishlistData)
        }
        catch (e) {
          console.log(e)
        }
      }
    return (
        <div id='movie'>
        {Empty && <h1 style={{color:'gray',marginTop:'50px',textAlign:'center'}}>Playlist is Empty</h1>}
            <div id='gridCards'>
                {movieList.map((item, index) => {
                    return <Cards key={index} title={item.title} rating={item.rating} img={item.img} plot={item.plot} year={item.year} wishlist={[]} />
                })}

            </div>
        </div>

    )
}

export default Movies