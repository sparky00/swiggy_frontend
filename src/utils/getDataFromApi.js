export const FetchSwiggyRestaurants = async () => {
    try {
        const response = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=23.2599333&lng=77.412615&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING", {
            method: "GET", 
          });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // console.log(data.data.cards[4].card.card.gridElements.infoWithStyle.restaurants);
        return data.data.cards[4].card.card.gridElements.infoWithStyle.restaurants;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// Response.data.cards[4].card.card.gridElements.infoWithStyle.restaurants.map()

export const FetchMenu = async (id) => {
   

    try {
        const response = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=23.2599333&lng=77.412615&restaurantId=${id}`, {
            method: "GET",
          });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const Cusines = data?.data?.cards[4].groupedCard?.cardGroupMap?.REGULAR.cards[1]?.card?.card?.itemCards ?data?.data?.cards[4].groupedCard?.cardGroupMap?.REGULAR.cards[1]?.card?.card?.itemCards : data?.data?.cards[4].groupedCard?.cardGroupMap?.REGULAR.cards[2]?.card?.card?.itemCards;
        // console.log(data?.d=ta?.cards[4].groupedCard?.cardGroupMap?.REGULAR?.cards[0]?.card?.card?.itemCards)
        console.log(data?.data?.cards[4].groupedCard?.cardGroupMap?.REGULAR.cards)
        // console.log(data.data.cards[4].card.card.gridElements.infoWithStyle.restaurants);
        return [Cusines, data.data, data?.data?.cards[4].groupedCard?.cardGroupMap?.REGULAR.cards];
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export const getUsers = async()=>{
    const response = await fetch("https://jsonplaceholder.typicode.com/users") 
    return await response.json()
}

// getUsers()

export const getPosts = async()=>{
    const response = await fetch("https://jsonplaceholder.typicode.com/posts") 
    return await response.json()
}

// getPosts()


