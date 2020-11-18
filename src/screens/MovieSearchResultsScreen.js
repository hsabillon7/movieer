import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Dimensions, Image } from "react-native";
import {
  Container,
  H1,
  Spinner,
  Card,
  CardItem,
  Body,
  H3,
  Icon,
} from "native-base";
import backend from "../api/backend";
import getEnvVars from "../../enviroment";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { format } from "date-fns";

const { apiUrl, apiKey, apiImageUrl, apiImageSize } = getEnvVars();

const { width, height } = Dimensions.get("window");

const MovieSearchResults = ({ route, navigation }) => {
  // Obtener desde los parámetros de la navegación el término de búsqueda
  const { search } = route.params;
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(false);

  // Obtiene las películas con el término de búsqueda
  const getSearchMovies = async () => {
    try {
      const response = await backend.get(
        `${apiUrl}search/movie?query=${search}&api_key=${apiKey}`
      );

      setMovies(response.data);
    } catch (error) {
      setError(true);
    }
  };

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
    );
  }

  return (
    <Container>
      <H1 style={styles.title}>
        {movies.total_results} resultados para "{search}"
      </H1>
      <FlatList
        data={movies.results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("movieInfo", { id: item.id });
                }}
              >
                <Card>
                  <CardItem cardBody>
                    <Image
                      source={
                        item.poster_path
                          ? {
                              uri: `${apiImageUrl}${apiImageSize}${item.poster_path}`,
                            }
                          : require("../../assets/movieer_logo.png")
                      }
                      style={
                        item.poster_path
                          ? styles.movieImage
                          : styles.imageNotFound
                      }
                    />
                  </CardItem>
                  <CardItem>
                    <Body style={{ flex: 1, flexDirection: "row" }}>
                      <View>
                        <H3>{item.title}</H3>
                        <Text>
                          {format(new Date(item.release_date), "yyyy")}
                        </Text>
                      </View>
                      <View style={styles.voteAverage}>
                        <Icon name="star" style={styles.starIcon} />
                        <Text>{item.vote_average}</Text>
                      </View>
                    </Body>
                  </CardItem>
                </Card>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  movieImage: {
    width: width * 0.99,
    height: height * 0.5,
  },
  imageNotFound: {
    width: width * 0.99,
    height: height * 0.5,
    resizeMode: "contain",
  },
  voteAverage: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  starIcon: {
    fontSize: 18,
    marginRight: 5,
    color: "#d4af37",
  },
  title: {
    color: "#00a5cf",
    textAlign: "center",
    marginBottom: 5,
    marginTop: 5,
  },
});

export default MovieSearchResults;
