import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import MealItem from "./MealItem";
import ReacipeIndex from "./RecipeIndex";
const Meal = () => {
    const [search,setSearch]=useState();
    const [show,setShow]=useState(false);
    const [item,setItem]=useState("");
    const [url,setUrl]=useState("https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian");

   
    useEffect(()=>{
        fetch(url).then(res=>res.json()).then(data=> {
            setItem(data.meals);
            setShow(true);
        })
     },[url])

     const searchRecipe=(evt)=>{
         setUrl(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
    }
    const setIndex=(alpha)=>{
        setUrl(`https://www.themealdb.com/api/json/v1/1/search.php?f=${alpha}`);
    }
return (
    <>
        <div className="main">
           <div className="heading">
              <h1>Discover Delicious Recipes</h1>
              <h4>Find meals from around the world and explore their ingredients, instructions, and cooking videos.</h4>
           </div>

            <div className="searchBox">
                <input type="search" placeholder="Search your favourite recipe" className="search-bar" onChange={e=> setSearch(e.target.value)} onKeyPress={searchRecipe}/>
            </div>
            <div className="container">
                {
                    show ?<MealItem data={item} /> :"Not Found"
                
                }
            </div>
            <div className="indexContainer">
                 <ReacipeIndex alphaIndex={(alpha)=>setIndex(alpha)}/>
            </div>
            
        </div>
    </>
)
}
export default Meal;