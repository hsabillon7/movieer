import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Dimensions } from "react-native";
import { Content, Text, H1, Spinner, Card } from "native-base";
import backend from "../api/backend";
import getEnvVars from "../../enviroment";

const { apiUrl, apiKey, apiImageUrl, apiImageSize } = getEnvVars();

const { width, height } = Dimensions.get("window");

const MovieInfoScreen = ({ route, navigation }) => {
  // Obtener el id de la película
  const { id } = route.params;
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(false);

  // Obtener la información de la película
  const getMovieInfo = async () => {
    try {
      const response = await backend.get(
        `${apiUrl}movie/${id}?api_key=${apiKey}&language=es-MX`
      );

      setMovie(response.data);
    } catch (error) {
      setError(true);
    }
  };

  // Efecto secundario que ejecuta la consulta a la API
  useEffect(() => {
    getMovieInfo();
  }, []);

  if (!movie) {
    return (
      <Content>
        <Spinner />
      </Content>
    );
  }

  return (
    <Content>
      <H1>{movie.title}</H1>
      <Card cardBody>
        <Image
          source={{ uri: `${apiImageUrl}${apiImageSize}/${movie.poster_path}` }}
          style={styles.moviePoster}
        />
        <Text>{movie.overview}</Text>
        <Text>Lanzamiento: {movie.release_date}</Text>
        <Text>Duración: {movie.runtime} minutos</Text>
        <Text>Valoración: {movie.vote_average}</Text>
        <Text>Géneros:</Text>
        {movie.genres.map((genre) => (
          <Text key={genre.id}>{genre.name}</Text>
        ))}
      </Card>
    </Content>
  );
};

const styles = StyleSheet.create({
  moviePoster: {
    width: width,
    height: height * 0.6,
    resizeMode: "contain",
  },
});

export default MovieInfoScreen;
