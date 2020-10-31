// Importar los módulos necesarios
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Dimensions,FlatList } from "react-native";
import {
  Input,
  Container,
  Item,
  H1,
  Button,
  Header,
  Icon,
  Spinner,
  Card,
  CardItem,
  H3,
  Body
} from "native-base";
import backend from "../api/backend";
import getEnvVars from "../../enviroment";
import { TouchableOpacity } from "react-native-gesture-handler";

const { apiKey, apiImageUrl, apiImageSize } = getEnvVars();

// Obtener los valores por destructuring
const { width, height } = Dimensions.get("window");

// Variable que contiene la pantalla (renderizar)
const MovieListScreen = ({ navigation }) => {
  // Maneja el estado de las películas
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");

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

  // Hook de efecto
  useEffect(() => {
    // Efecto secundario realizar la petición a la API
    getMovies();
  }, []);

  // Documentación de Nativebase
  // https://docs.nativebase.io/Components.html
  if (!movies) {
    return (
      <View style={{flex: 1, justifyContent: "center"}}>
        <Spinner color="blue" />
      </View>
    )
  }

  return (
    <Container>
      <Header searchBar>
        <Item>
          <Input placeholder="Buscar" value={search} onChangeText={setSearch} />
        </Item>
        <Button icon onPress={() => {navigation.navigate("movieSearch", {search})}}>
          <Icon name="search" />
        </Button>
      </Header>
      <Image
        source={require("../../assets/movieer_logo.png")}
        style={styles.logoApp}
      />
      <H1 style={{ marginTop: 20 }}>Películas más populares</H1>
      <FlatList
        data={movies.results}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>¡No se han encontrado peliculas!</Text>}
        renderItem={({ item }) => {
          return (
            <View>
              <TouchableOpacity onPress={() => navigation.navigate("movieInfo", {id: item.id})}>
                <Card>
                  <CardItem cardBody>
                    <Image source={{ uri: `${apiImageUrl}${apiImageSize}${item.poster_path}` }} style={styles.movieImage} />
                  </CardItem>
                  <CardItem>
                    <Body>
                      <H3>{item.title}</H3>
                      <Text>{item.vote_average}</Text>
                    </Body>
                  </CardItem>
                </Card>
              </TouchableOpacity>
          </View>
          )
        }}
      />
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
    width: width * 0.99,
    height: height * 0.5,
  },
  searchInput: {
    flex: 1,
    flexDirection: "column",
    marginTop: 10,
    marginRight: 15,
  },
  logoApp: {
    width: width,
    height: height * 0.15,
    resizeMode: "contain"
  }
});

export default MovieListScreen;
