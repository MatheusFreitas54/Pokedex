import { Grid } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Navbar from '../componentes/Navbar';
import PokemonCard from '../componentes/PokemonCard';
import axios from "axios";

const Home = () => {
      const [pokemons, setPokemons] = useState([])
      useEffect(() => {
        getPokemons();
    }, []);
    
    const getPokemons = () => { //Função que vai puxar os dados do pokemons.
        var endpoints = [] // Variavel de controle que puxar todos os Urls externos com os demais dados dos pokemons.
        for(var i = 1; i <= 151; i++) {
          endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`)
        }
        console.log(endpoints) // verificação se os dados estão retornando o esperado.
        var response = axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => setPokemons(res)).catch((err) => console.log(err)); // puxando todos os dados da api e os armazenando-os na variavel response.
        return response; // retornando dados da variavel.
        // axios.get("https://pokeapi.co/api/v2/pokemon?limit=50")
        // .then((res) => setPokemons(res.data.results))
    }

    const pokemonFilter = (name) => {
      var filteredPokemons = [];
      if (name==="") {
        getPokemons()
      }
      for ( var i in pokemons) {
        if (pokemons[i].data.name.includes(name)) {
          filteredPokemons.push(pokemons[i]);
        }
      }
      setPokemons(filteredPokemons);
    }
    
    return (
    <div>
      <Navbar pokemonFilter={pokemonFilter}/>
      <Container maxWidth="false">
        <Grid container spacing={2}>
            {pokemons.map((pokemon, key) => (
              <Grid item xs={12} sm={6} md={4} lg={2.4} key={key}>
                <PokemonCard name={pokemon.data.name} image={pokemon.data.sprites.front_default} types={pokemon.data.types}/>
              </Grid>
            ))}
        </Grid>
      </Container>
      
    </div>
  )
}

export default Home
