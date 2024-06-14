import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Card from './components/card'

let init = false;

function App() {

  const [pokemons, setPokemons] = useState([]);
  const [current, setCurrent] = useState(0);
  const [highest, setHighest] = useState(0);

  const limit = 50;

  function markPokemon(pokemon){
    setPokemons(pokemons.map(item => item.name === pokemon.name ? {...item, isMarked: true} : item))
    console.log(pokemon.name);
  }

  function unmarkAllPokemons(){
    setPokemons(pokemons.map(item => ({...item, isMarked: false})))
  }

  function onClick(pokemon){
    if(pokemon.isMarked){
      alert('Game Over!');
      setHighest(current > highest ? current : highest);
      setCurrent(0);
      unmarkAllPokemons();
    }
    else{
      markPokemon(pokemon);
      setCurrent(current + 1);
    }
  }

  //request pokemon images from API on mounting App
  useEffect(() =>{
    if(!init){
      init = true;
      fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}`)
        .then(response => response.json())
        .then(json => {
          const pokemons = json.results;
          return Promise.all(
            pokemons.map(pokemon =>{
            return fetch(pokemon.url)
              .then(response => response.json())
              .then(json => {
                return {
                  name: pokemon.name,
                  src: json.sprites.front_default,
                  isMarked: false
                }
              })
          }))
          .then(pokemonData => setPokemons(pokemonData))
        }
      )

      return(setPokemons([]));
    }
}, [])

  const randomPokemons = generateRandomNumbers(10, 49).map(i => pokemons.length !== 0 && pokemons[i]);




  return( 
    <>
      <div className='scoreboard'>
        <div className='current'>Current Score: {current}</div>
        <div className='highest'>Highest Score {highest}</div>
      </div>
      <div className='grid-container'>
        {randomPokemons.map((pokemon, index) => <Card
                                        pokemon={pokemon}
                                        onClick={onClick}
                                        key={index}
                                        />
        )}
      </div>
    </>
  )





  function generateRandomNumbers(n, upper) {
    // Create an array with numbers from 1 to 50
    const numbers = Array.from({ length: upper }, (_, i) => i);
  
    // Shuffle the array using Fisher-Yates algorithm
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
  
    // Take the first n elements from the shuffled array
    return numbers.slice(0, n);
  }
}



export default App
