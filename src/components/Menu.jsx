import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {FetchMenu, getPosts, getUsers} from "../utils/getDataFromApi"
import Cuisine from './Cuisine';


const Menu = () => {
    const { id } = useParams();
  const [resDetails, setResDetails] = useState([]);
  const [menu, setMenu] = useState([])
  const [cuisines, setCuisines] = useState([]);
  const [showIndex, setShowIndex] = useState(null);
//   const [users, setUsers] = useState([]);


    useEffect(()=>{
        fetchData()
        // getDataForUsers()
        
    },[])

    // const handleClick =()=>{
    //     setShow(!show)
    // }
    console.log(showIndex)

    // console.log(1<2<3);
   

    // function parent(){
    //         const a = 1;

    //         return function b(){
    //             return a
    //         }
            
    // }

    // console.log(parent()()) 

        // const getDataForUsers = async()=>{
        //     const postRes = await getPosts()
        //     const resposne = await getUsers()
        //     // console.log(postRes)

        //     setUsers(resposne)


        //     const data = resposne.map((item)=>({
        //             ...item,
        //             posts: postRes.filter((post)=> post.userId === item.id)
        //     }))
        //         console.log(data)
        //     setUsers(data)

        // }
    
        // console.log("users:",users)

    
    const fetchData = async()=>{
        const Response = await FetchMenu(id);
        if(Response){
            setResDetails(Response[1]?.cards[2]?.card?.card?.info)
            setMenu(Response[0])
            setCuisines(Response[2])
        }
       
    }
    console.log(menu)
    return (
        <div>
            <div className='menu'>
                <h1 style={{ marginLeft: "30px" }}>{resDetails?.name} ({resDetails?.locality})</h1>
                <div className="menu-restaurant-details">
                    <div className="menu-inner-details">
                        <div className='menu-inner-content'>
                            <div className="menu-rating"> <svg width="20" height="20" viewBox="0 0 20 20" fill="none" role="img" aria-hidden="true" strokeColor="rgba(2, 6, 12, 0.92)" fillColor="rgba(2, 6, 12, 0.92)"><circle cx="10" cy="10" r="9" fill="url(#StoreRating20_svg__paint0_linear_32982_71567)"></circle><path d="M10.0816 12.865C10.0312 12.8353 9.96876 12.8353 9.91839 12.865L7.31647 14.3968C6.93482 14.6214 6.47106 14.2757 6.57745 13.8458L7.27568 11.0245C7.29055 10.9644 7.26965 10.9012 7.22195 10.8618L4.95521 8.99028C4.60833 8.70388 4.78653 8.14085 5.23502 8.10619L8.23448 7.87442C8.29403 7.86982 8.34612 7.83261 8.36979 7.77777L9.54092 5.06385C9.71462 4.66132 10.2854 4.66132 10.4591 5.06385L11.6302 7.77777C11.6539 7.83261 11.706 7.86982 11.7655 7.87442L14.765 8.10619C15.2135 8.14085 15.3917 8.70388 15.0448 8.99028L12.7781 10.8618C12.7303 10.9012 12.7095 10.9644 12.7243 11.0245L13.4225 13.8458C13.5289 14.2757 13.0652 14.6214 12.6835 14.3968L10.0816 12.865Z" fill="white"></path><defs><linearGradient id="StoreRating20_svg__paint0_linear_32982_71567" x1="10" y1="1" x2="10" y2="19" gradientUnits="userSpaceOnUse"><stop stop-color="#21973B"></stop><stop offset="1" stop-color="#128540"></stop></linearGradient></defs></svg>

                                 <div>{resDetails?.avgRating}({resDetails?.totalRatingsString}) . {resDetails.costForTwoMessage}</div>

                            </div>

                            <h4 style={{ color: "rgb(255, 82, 0)", textDecoration: "underline", fontWeight: "700", fontSize: "19px", lineHeight: "1px" }}>{resDetails?.cuisines?.join(", ")}</h4>
                            <h4 style={{ fontSize: "19px" }}><span style={{ fontWeight: "700" }}>Outlet</span> <span style={{ fontWeight: "400" }}>{resDetails?.areaName}</span></h4>
                            <h4 style={{ fontSize: "19px", lineHeight: "1px" }}>{resDetails?.sla?.slaString}</h4>
                        </div>

                    </div>

                </div>
                <div className='search-menu'>
                    <div className='menu-text'> ---MENU---</div>
                    <input type="text" placeholder='Search for dishes' />

                    <div className='menu-filter'>
                        <button style={{ color: "rgb(12, 114, 102)" }} className='filter-icon'>Pure Veg</button>
                        <button className='filter-icon'>Bestseller</button>
                    </div>
                </div>

                {cuisines.slice(1).map((cuisine, index)=>(
                       
                <Cuisine 
                index={index}
                cuisine={cuisine}
                show={index === showIndex ? true : false}
                setShowIndex={setShowIndex}
                />
            
                 ))}


                
            </div>
        </div >
    )
}

export default Menu