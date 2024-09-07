import { Flag } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addItem } from '../utils/cartSlice';

const Cuisine = ({  index,cuisine, show, setShowIndex }) => {
    const dispatch = useDispatch();
    console.log(index)
    const [flag, setFlag] = useState(true)
    // const [show, setShow] = useState(false);

    const handleClick = () => {
        setFlag(!flag)
        
        if(flag){
            setShowIndex(index)
        }
        else{
            setShowIndex(null)
        }
       
    }
    const addItemTOCart=(item)=>{
        dispatch(addItem(item))
    }

    return (
        <div key={index} className='menu-items'>

            <div onClick={handleClick} className='cusine-category'>
                <span>{cuisine.card.card.title}({cuisine?.card?.card?.itemCards?.length})</span>
                <svg height="25px" width="25px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><g data-name="93-Arrow Down"><path d="M16 0a16 16 0 1 0 16 16A16 16 0 0 0 16 0zm0 30a14 14 0 1 1 14-14 14 14 0 0 1-14 14z" /><path d="m16 19.59-7.29-7.3-1.42 1.42 8 8a1 1 0 0 0 1.41 0l8-8-1.41-1.41z" /></g></svg>
            </div>

            {show &&
                <div>
                    {cuisine?.card?.card?.itemCards?.map((dish) => (
                        <div key={dish?.card?.info?.id} className='cusine-card'>
                            <div>
                                <div className='cusine-text-bold'>{dish?.card?.info?.name}</div>
                                <div>RS {dish?.card?.info?.price / 100 ? dish?.card?.info?.price / 100 : dish?.card?.info?.defaultPrice / 100}</div>
                                <div className="cusine-rating"> <svg width="20" height="20" viewBox="0 0 20 20" fill="none" role="img" aria-hidden="true" strokeColor="rgba(2, 6, 12, 0.92)" fillColor="rgba(2, 6, 12, 0.92)"><circle cx="10" cy="10" r="9" fill="url(#StoreRating20_svg__paint0_linear_32982_71567)"></circle><path d="M10.0816 12.865C10.0312 12.8353 9.96876 12.8353 9.91839 12.865L7.31647 14.3968C6.93482 14.6214 6.47106 14.2757 6.57745 13.8458L7.27568 11.0245C7.29055 10.9644 7.26965 10.9012 7.22195 10.8618L4.95521 8.99028C4.60833 8.70388 4.78653 8.14085 5.23502 8.10619L8.23448 7.87442C8.29403 7.86982 8.34612 7.83261 8.36979 7.77777L9.54092 5.06385C9.71462 4.66132 10.2854 4.66132 10.4591 5.06385L11.6302 7.77777C11.6539 7.83261 11.706 7.86982 11.7655 7.87442L14.765 8.10619C15.2135 8.14085 15.3917 8.70388 15.0448 8.99028L12.7781 10.8618C12.7303 10.9012 12.7095 10.9644 12.7243 11.0245L13.4225 13.8458C13.5289 14.2757 13.0652 14.6214 12.6835 14.3968L10.0816 12.865Z" fill="white"></path><defs><linearGradient id="StoreRating20_svg__paint0_linear_32982_71567" x1="10" y1="1" x2="10" y2="19" gradientUnits="userSpaceOnUse"><stop stop-color="#21973B"></stop><stop offset="1" stop-color="#128540"></stop></linearGradient></defs></svg>

                                    <div>{dish?.card?.info?.ratings?.aggregatedRating?.rating}({dish?.card?.info?.ratings?.aggregatedRating?.ratingCountV2})</div>

                                </div>
                                <div>Serves 0 | Fluffy bhaturas (2 pcs) served with cholle, onion and pickle</div>

                            </div>

                            <div className='cusine-image-cover' >
                                <div className='cusine-image'>
                                    <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${dish?.card?.info?.imageId}.jpeg`} alt="" />
                                </div>
                                <button onClick={()=>addItemTOCart(dish)} className='cusine-add-button'>ADD</button>
                                <h3>Customisable</h3>
                            </div>

                        </div>
                    ))}
                </div>}
        </div>
    )
}

export default Cuisine