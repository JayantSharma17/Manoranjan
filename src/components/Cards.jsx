import React, { useEffect, useState } from 'react'
import './CSS/Card.css'
import heart from '../assets/heart.png'
import Wcards from './Wcards';
import axios from 'axios';
import { BaseURL } from '../Global';


const Cards = (props) => {
    const [show, setShow] = useState(false);

    return (
        <>
            <div className='Cards'>

                <img src={props.img} alt="" />
                <div className='CardsT'>
                    <p>{props.year}</p>
                    <p>{`IMDB Rating: ${props.rating}`}</p>
                </div>
                <div>
                    <p>{props.title}</p>
                    <button onClick={() => { setShow(!show) }}>
                        <img src={heart} alt="" />
                    </button>
                </div>
                {show && <div className={`wishlistMenu ${show ? 'show' : ''}`}>
                    {props.wishlist.map((item,idx)=>{
                        return <Wcards item={item} setShow={setShow} key={idx} title={props.title} plot={props.plot} img={props.img} year={props.year} rating={props.rating} />
                    })}
                </div>}
                <p id='plot'>{props.plot}</p>


            </div>

        </>

    )
}

export default Cards