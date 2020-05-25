import React,{ useState} from 'react';
import Axios from 'axios';
import Recipe from './components/Recipe';
import Alert from './components/Alert';
import {v4 as uuidv4} from 'uuid';
import './App.css';

function App() {
  const[query,setQuery] = useState();
  const[recipes,setRecipes] = useState([]);
  const[alert,setAlert] = useState("");

  const APP_ID = "4111acb2";
  const APP_KEY = "5d1d71503d1a8f1505589e20ce136d1b";

  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const getData = async() =>{
    if(query!==""){
      const result = await Axios.get(url);
      if (!result.data.more) {
        return setAlert("No Food with such Name");
      }
      setRecipes(result.data.hits);
      //console.log(result);
      setQuery("");
      setAlert("");
    }else {
      setAlert("Please fill the Form");
    }
    
  }
 
  const handleChange = (e) => {
     setQuery(e.target.value);
     //console.log(query);
  }

  const formSubmit = (e) =>{
    e.preventDefault();
    getData();
  }

  return (
    <div className="App">
       <h1>Recipe App</h1>
       <form className="search-form" onSubmit={formSubmit}>
        {alert!=="" && <Alert alert={alert}/>}
         <input type="text" name="query" placeholder="enter recipe name..." value={query} autoComplete="off" onChange={handleChange}/>
         <button type="submit">Search</button>
        </form>
       
       <div className="recipes">
           { recipes !== [] && recipes.map(recipe =>
            <Recipe recipe = {recipe} key={uuidv4()}/>)}
       </div>
    </div>
  );
}

export default App;
