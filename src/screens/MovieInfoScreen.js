import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Dimensions } from "react-native";
import {
  Content,
  Text,
  H1,
  Spinner,
  Card,
  H2,
  View,
  Badge,
  Icon,
} from "native-base";
import backend from "../api/backend";
import getEnvVars from "../../enviroment";
// import { Rating } from "react-native-ratings";

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
    <Content contentContainerStyle={styles.content}>
      <Image
        source={{ uri: `${apiImageUrl}${apiImageSize}/${movie.poster_path}` }}
        style={styles.moviePoster}
      />
      <H1 style={styles.title}>{movie.title}</H1>

      <Card cardBody transparent style={styles.card}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.movieDetailsValues}>{movie.vote_average}</Text>
            {/* <Rating
              showRating
              ratingCount={movie.vote_average}
              readonly={true}
            /> */}
            <Icon name="star" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.movieDetailsValues}>{movie.runtime}</Text>
            <Text style={styles.movieDetails}>Duración</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.movieDetailsValues}>{movie.release_date}</Text>
            <Text style={styles.movieDetails}>Lanzamiento</Text>
          </View>
        </View>
        <H2 style={styles.h2}>Géneros</H2>
        <View style={styles.genresView}>
          {movie.genres.map((genre) => (
            <Badge key={genre.id} style={styles.genres}>
              <Text>{genre.name}</Text>
            </Badge>
          ))}
        </View>
        <H2 style={styles.h2}>Trama</H2>
        <Text>{movie.overview}</Text>
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
  title: {
    textAlign: "center",
    // color: "#00a5cf",
    marginTop: 5,
  },
  content: {
    backgroundColor: "#ffffff",
  },
  overview: {
    color: "#00a5cf",
  },
  card: {
    marginLeft: 30,
    marginRight: 30,
  },
  movieDetails: {
    textAlign: "center",
    fontSize: 12,
  },
  movieDetailsValues: {
    textAlign: "center",
    fontSize: 21,
    fontWeight: "bold",
  },
  genres: {
    backgroundColor: "#25a18e",
    marginRight: 5,
    marginBottom: 5,
  },
  genresView: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  h2: {
    marginTop: 10,
    // color: "#00a5cf",
  },
});

export default MovieInfoScreen;
