import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Container, H1, Spinner } from "native-base";
import backend from "../api/backend";
import getEnvVars from "../../enviroment";
import { FlatList } from "react-native-gesture-handler";

const { apiUrl, apiKey } = getEnvVars();

const MovieSearchResults = ({ route, navigation }) => {
  // Obtener desde los parámetros de la navegación el término de búsqueda
  const { search } = route.params;
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(false);

  // Obtiene las películas con el término de búsqueda
  const getSearchMovies = async () => {
    try {
      const response = await backend.get(`${apiUrl}search/movie?query=${search}&api_key=${apiKey}`);

      setMovies(response.data);
    } catch (error) {
      setError(true);
    }
  }

  // Efecto para comunicarnos con el API y buscar la película
  useEffect(() => {
    getSearchMovies();
  }, []);

  // Mostrar el spinner de carga si la API no ha dado respuesta
  if (!movies) {
    return (
      <Container>
        <Spinner />
      </Container>
    )
  }

  return (
    <Container>
      <H1>Resultados de la búsqueda: {movies.total_results}</H1>
      <FlatList />
    </Container>
  );
}

const styles = StyleSheet.create({});

export default MovieSearchResults;