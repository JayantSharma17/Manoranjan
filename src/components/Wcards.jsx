import React from 'react'
import './CSS/Wcards.css'
import axios from 'axios'
import { BaseURL, message } from '../Global'


const Wcards = (props) => {
    const payload={
        title:props.title,
        plot:props.plot,
        img:props.img,
        year:props.year,
        rating:props.rating,
        wishlistId:props.item._id
    }

    const createWishList = async () => {

        // if (!payload.title || payload.plot || !payload.img || pa) {
        //     message('All fields are required.')
        //     return
        // }
        try {
            const res = await axios.post(`${BaseURL}/addmovie`,payload)
            console.log(res)
            message(`Movie addded to ${props.item.name}`)
            props.setShow(false)
        }
        catch (e) {
            console.log(e)
            message('Network Error')

        }
    }
  return (
    <button onClick={createWishList} className='wcards'>{props.item.name}</button>
  )
}

export default Wcards