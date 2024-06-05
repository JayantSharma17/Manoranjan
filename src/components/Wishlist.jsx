import React, { useEffect, useState } from 'react'
import './CSS/Wishlist.css'
import './CSS/ModalCard.css'
import film2 from '../assets/film2.png'
import setting from '../assets/setting.png'
import gallery from '../assets/gallery.png'
import close from '../assets/close.png'
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BaseURL, message } from '../Global'
import { BallTriangle } from 'react-loader-spinner'

const Wishlist = () => {

    const [modalIsOpen, setIsOpen] = useState(false);
    const [privacy, setPrivacy] = useState('');
    const [loader, setLoader] = useState(false);
    const [loader2, setLoader2] = useState(true);
    const [name, setName] = useState('');
    const [wishlist, setWishlist] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        verify();
        getWishlist();
    }, [])


    const verify = async () => {
        if (localStorage.getItem("token") === null) {
            setTimeout(() => {
                navigate('/login');
            }, 2000)
            message('Login to your account first')

        }
    }
    const getWishlist = async () => {
        try {
            setLoader2(true)
            const userId = localStorage.getItem('userId');
            const res = await axios.post(`${BaseURL}/wishlists`, { userId })
            console.log(res.data.wishlistData)
            setWishlist(res.data.wishlistData)
            setLoader2(false)

        }
        catch (e) {
            setLoader2(false)

            console.log(e)
        }
    }
    const createWishList = async () => {
        console.log(privacy, name)
        const userId = await localStorage.getItem('userId')

        if (!privacy || !name || !userId) {
            message('All fields are required.')
            return
        }
        setLoader(true)
        try {
            const res = await axios.post(`${BaseURL}/create-wishlist`, { userId, name, status: privacy })
            console.log(res)
            setLoader(false)
            message('Playlist created')
            closeModal();


        }
        catch (e) {
            setLoader(false)
            console.log(e)
            message('Network Error')

        }
    }

    const handleChange = (event) => {
        setPrivacy(event.target.value);
    };

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
    }

    function closeModal() {
        setIsOpen(false);
    }


    return (
        <div id='Wishlist'>
            <div id='gridCards'>

                <div className='wishlistCard'>
                    <img src={gallery} alt="" />
                    <p id='wishT' style={{ fontSize: '15px' }}>Create new Playlist</p>

                    <div>
                        <button onClick={() => { setIsOpen(true) }}>Create New</button>
                        {/* <button><img src={setting} alt="" /></button> */}
                    </div>
                </div>
                
                

                {wishlist.map((item, index) => {
                    return (
                        <div key={index} className='wishlistCard'>
                            <img src={film2} alt="" />
                            <p id='wishT' style={{ fontSize: '15px' }}>{item.name}</p>

                            <div>
                                <button onClick={() => { navigate(`/movies/${item._id}`) }}>View</button>
                                <button><img src={setting} alt="" /></button>
                            </div>
                        </div>
                    )
                })}

            </div>
            {loader2 && <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '100%', display: 'flex', justifyContent: 'center' }}><BallTriangle
                        height={70}
                        width={70}
                        radius={5}
                        color="white"
                        ariaLabel="ball-triangle-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={loader2}
                    /></div>}


            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                className="Modal"
                overlayClassName="Overlay"
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <div className='loginDiv mcard'>
                    <div>
                        <button onClick={closeModal}><img src={close} alt="" /></button>
                    </div>
                    <h1>Create new Playlist</h1>
                    <input type="text" name="" id="" placeholder='Playlist name' value={name} onChange={(e) => { setName(e.target.value) }} />

                    <div className="privacy-options">
                        <label>
                            <input
                                type="radio"
                                value="Private"
                                checked={privacy === 'Private'}
                                onChange={handleChange}
                            />
                            Private
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="Public"
                                checked={privacy === 'Public'}
                                onChange={handleChange}
                            />
                            Public
                        </label>
                    </div>
                    <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '100%', display: 'flex', justifyContent: 'center' }}><BallTriangle
                        height={50}
                        width={50}
                        radius={5}
                        color="white"
                        ariaLabel="ball-triangle-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={loader}
                    /></div>

                    <button onClick={createWishList}>Create</button>
                </div>
            </Modal>
        </div>
    )
}

export default Wishlist