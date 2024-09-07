import RestaurantCard, {withVegLabel} from "./RestaurantCard";
import { restaurants } from "../utils/mockData"
import { useContext, useEffect, useState } from "react";
import { FetchSwiggyRestaurants } from "../utils/getDataFromApi";
import Shimmer from "./Shimmer";
import { RefreshCcw, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import UserContext from "../utils/UserContext";

const Body = () => {
    const [restaurants, setRestaurants] = useState([])
    const [filteredRestaurants, setFilteredRestaurants] = useState([])
    const [flag, setFlag] = useState(false);
    const [slected, setSelected] = useState("top-rated-button");
    const [search, setSearch] = useState("")
    const {setUserName, loggedInUser} = useContext(UserContext);

    const RestaurantCardWithVegLabel = withVegLabel(RestaurantCard);
    const style = "";
    // console.log("RESTA-->",restaurants[0].info.name)
    const getData = async () => {
        const Response = await FetchSwiggyRestaurants();
        console.log(Response)
        // console.log( Response.data.cards[4].card.card.gridElements.infoWithStyle.restaurants[0].info.name)
        setRestaurants(Response)
        setFilteredRestaurants(Response)
    }
    // Response.data.cards[4].card.card.gridElements.infoWithStyle.restaurants.map()
    useEffect(() => {
        getData()
    }, [])


    const filterTopRatedRestaurants = () => {
        if (!flag) {
            setSelected("top-rated-button-selected")
            console.log("Inside filterTOp", restaurants)
            const result = restaurants?.filter(restaurant => restaurant?.info?.avgRating >= 4.5);
            console.log("Top rating rest-->", result);
            setFilteredRestaurants(result)
            setFlag(true)
        }
        else {
            setFilteredRestaurants(restaurants)
            setSelected("top-rated-button")
            setFlag(false)
        }

    }

    const handleSearch = () => {
        console.log(search); 
       const res = restaurants.filter((restaurant)=>{
            return restaurant.info.name.toLocaleLowerCase().includes( search.toLocaleLowerCase())
        })
        setFilteredRestaurants(res);
        // Add any additional logic you want to handle when the search button is clicked
    };

    return (
        <div className="body-main">
            <div className="body-component">
                <div className="body-title">
                    <h1>What's on your mind?</h1>
                    <h2>Will be in your plate!</h2>
                </div>
                <div>
                    <img className="body-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe3odt8iArPo8UqoV2enlx1LaJRt4bOb4zfA&s" />
                </div>
            </div>
            <div className="functinalities-container">
                <div className="search">
                <input className="input-container" type="text" value={search} onChange={(e)=>setSearch(e.target.value)} />
                <button className="search-button" type="button"  onClick={handleSearch}>Search</button>
                </div>
                
                
                <button className={slected} onClick={filterTopRatedRestaurants}>Top Rated Restaurants</button>
                <RefreshCw onClick={()=>{setFilteredRestaurants(restaurants)}} className="refresh-button"/>
                {/* <input className="input-container-2" type="text" value={loggedInUser} onChange={(e)=>setUserName(e.target.value)} /> */}
            </div>

            {filteredRestaurants?.length === 0 ? (<Shimmer />) :
                (<div className="cards-container">
                
                   { filteredRestaurants?.map((restaurant,i) => (
                    <Link key={restaurant.info.id} to={"/restaurant/"+restaurant.info.id}>
                        {restaurant?.info?.veg ? <RestaurantCardWithVegLabel  restaurant={restaurant.info}/> :
                        <RestaurantCard  restaurant={restaurant.info} />
                        }
                        
                        </Link>
                    ))}
                </div>)

            }

        </div>
    )
}

export default Body;