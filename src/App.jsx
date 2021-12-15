import axios from 'axios';
import {useEffect, useState} from 'react';



import logo from './logo.svg';
import './App.css';

function App() {
  let offset = 0;
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState([]);


  const loadMore = () =>{
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`)
      .then(res => {
        const newPokemon = []; 
        res.data.results.forEach((pokemon) => newPokemon.push(toTitleCase(pokemon.name)));
        setPokemon((oldPokemon) => [...oldPokemon, ...newPokemon]);
        setLoading(false);
      }) 


      offset += 10; 
  }

  const handleScroll = (e) =>{
   
    const scrollHeight = e.target.documentElement.scrollHeight;
    const currentHeight = Math.ceil(
      e.target.documentElement.scrollTop + window.innerHeight
    );
    if (currentHeight + 1 >= scrollHeight) {
      setLoading(true);
      loadMore();
    }

  }


  const toTitleCase = (str) => {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}
  

  useEffect(() =>{
    loadMore();
    window.addEventListener('scroll', handleScroll);
  }, [])

  return (
    <div className="App bg-blue-100">
      {pokemon.map((p, i) => {
        return <div key={i} className="bg-white border p-2 py-10 text-center text-bold max-w-sm mx-auto my-4">{p}</div>;
      })}

      {loading ? <img className="mx-auto my-4" src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" /> : null}
    </div>
  );
}

export default App;
