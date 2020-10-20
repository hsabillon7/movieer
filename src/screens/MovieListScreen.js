// Importar los módulos necesarios
import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import {
  Input,
  Container,
  Form,
  Item,
  H1,
  Button,
  Header,
  Icon
} from "native-base";
import backend from "../api/backend";
import getEnvVars from "../../enviroment";

const { apiKey } = getEnvVars();

// Obtener los valores por destructuring
const { width, height } = Dimensions.get("window");

// Variable que contiene la pantalla (renderizar)
const MovieListScreen = () => {
  // Maneja el estado de las películas
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(false);

  // Promesas y asincronía
  // https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Promise
  // https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/funcion_asincrona
  const getMovies = async () => {
    try {
      // Consultar la API de TheMovieDB
      const response = await backend.get(`movie/popular?api_key=${apiKey}&language=es-HN&page=1`);

      setMovies(response.data);
    } catch (error) {
      // Error al momento de ejecutar la petición a la API
      setError(true);
    }
  }

  getMovies();

  // Documentación de Nativebase
  // https://docs.nativebase.io/Components.html
  return (
    <Container>
      <Header searchBar>
        <Item>
          <Input placeholder="Buscar" />
        </Item>
        <Button icon>
          <Icon name="search" />
        </Button>
      </Header>
      <H1 style={{ marginTop: 20 }}>Películas más populares</H1>
      <Image
        source={require("../../assets/movieer_logo.png")}
        style={styles.movieImage}
      />
      <Text>Título de la película</Text>
      <Text>Valoración</Text>
      <Text>Resultados totales: {movies.total_results}</Text>
    </Container>
  );
};

// Estilos de nuestra pantalla
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    margin: 15,
  },
  movieImage: {
    width: width,
    height: height * 0.33,
    resizeMode: "contain",
  },
  searchInput: {
    flex: 1,
    flexDirection: "column",
    marginTop: 10,
    marginRight: 15,
  },
});

export default MovieListScreen;
