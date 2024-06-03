import React, { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './CSS/Dashboard.css'
import './CSS/InputBox.css'
import Cards from './Cards';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner'
import { BaseURL, message, tempMovies } from '../Global';



const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const Dashboard = () => {
  const [seartText, setSearchText] = useState('');
  const [notFound, setNotFound] = useState(false);
  const [movieList, setMovieList] = useState(tempMovies);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);


  useEffect(() => {
    verify();
    getWishlist();
  }, [])

  const verify = async () => {
    if (localStorage.getItem("token") === null) {
      setTimeout(() => {
        navigate('/login');


      }, 2000)
      // message('Login to your account first')

    }
  }
  const getWishlist = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const res = await axios.post(`${BaseURL}/wishlists`, { userId })
      console.log(res.data.wishlistData)
      setWishlist(res.data.wishlistData)
    }
    catch (e) {
      console.log(e)
    }
  }

  const handleSearch = async () => {
    console.log(seartText)
    setLoader(true);

    try {
      const res = await axios.get(`https://www.omdbapi.com/?t=${seartText}&apikey=cd7497ef`)
      console.log(res.data.Title)
      if (res.data.Response === "True") {
        console.log('movie found')
        let payload = {
          title: res.data.Title,
          year: res.data.Year,
          rating: res.data.imdbRating,
          plot: res.data.Plot,
          img: res.data.Poster

        }
        setMovieList([payload])
        setNotFound(false)
      }
      else {
        setMovieList(tempMovies)
        setNotFound(true)
        console.log('not fount')
      }
      setLoader(false);

    }
    catch (e) {
      setMovieList(tempMovies)
      setLoader(false);

      console.log(e)
    }
  }


  return (
    <>
      <div id='search'>
        <div>

          <div id='searchBox'>
            <div >
              <input type="text" placeholder='Search Your movies' value={seartText} onChange={(e) => { setSearchText(e.target.value) }} />
              <button onClick={handleSearch}>Search</button>
            </div>
            <p>Action | Adventure | Comedy | Drama | Romance</p>
          </div>

        </div>

      </div>
      <div id='carousel'>

        <Carousel style={{ zIndex: 10 }}
          swipeable={false}
          draggable={false}
          showDots={false}
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3500}
          keyBoardControl={false}
          arrows={false}
        //   customTransition="all .5"
        >
          <div style={{ backgroundImage: `url('https://wallpapercave.com/wp/wp12223832.jpg')` }} className='WebCards'>

          </div>
          <div style={{ backgroundImage: `url('https://moviegalleri.net/wp-content/uploads/2019/12/Hero-Yash-KGF-Chapter-2-First-Look-Poster-HD.jpg')` }} className='WebCards'>

          </div>
          <div style={{ backgroundImage: `url('https://img10.hotstar.com/image/upload/f_auto/sources/r1/cms/prod/433/1610433-h-3073210e46ff')` }} className='WebCards'>

          </div>
          <div style={{ backgroundImage: `url('https://origin-staticv2.sonyliv.com/videoasset_images/2018_set2_multilang_5june_landscape_thumb.jpg')` }} className='WebCards'>

          </div>
          <div style={{ backgroundImage: `url('https://theseer.in/wp-content/uploads/2020/04/panchayat.jpg')` }} className='WebCards'>

          </div>
          <div style={{ backgroundImage: `url('https://m.media-amazon.com/images/M/MV5BMmI5OWQ3NGQtMjdlMy00MWVmLThlYWUtODZiMzgzYWI0MTEyXkEyXkFqcGdeQXVyODEyNjEwMDk@._V1_.jpg')` }} className='WebCards'>

          </div>
          <div style={{ backgroundImage: `url('https://images.alphacoders.com/130/thumb-1920-1300728.jpg')` }} className='WebCards'>

          </div>

          <div style={{ backgroundImage: `url('https://www.ipe.uk.com/wp-content/uploads/2023/10/jawan.jpg')` }} className='WebCards'>

          </div>
          <div style={{ backgroundImage: `url('https://timesofindia.indiatimes.com/photo/msid-107441710,imgsize-154158.cms')` }} className='WebCards'>

          </div>
          <div style={{ backgroundImage: `url('https://www.bollywoodhungama.com/wp-content/uploads/2022/11/Pathaan-6.jpg')` }} className='WebCards'>

          </div>
          <div style={{ backgroundImage: `url('https://assets-in.bmscdn.com/discovery-catalog/events/et00353537-pzvenqxrjt-landscape.jpg')` }} className='WebCards'>

          </div>
          <div style={{ backgroundImage: `url('https://origin-staticv2.sonyliv.com/videoasset_images/gullak_hindi_multilang_5sep_landscape_thumb.jpg')` }} className='WebCards'>

          </div>



        </Carousel>

      </div>

      <h1 id='searchHead' style={{ textAlign: 'center' }}>Free: Movies & TV</h1>
      {notFound && <p id='searchHead2' style={{ textAlign: 'center' }}>Movie is not found...</p>}
      <div style={{ width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <BallTriangle
          height={50}
          width={50}
          radius={5}
          color="white"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={loader}
        />
      </div>

      <div id='gridCards'>
        {movieList.map((item, index) => {
          return <Cards key={index} title={item.title} rating={item.rating} img={item.img} plot={item.plot} year={item.year} wishlist={wishlist} />
        })}

      </div>
    </>
  )
}

export default Dashboard