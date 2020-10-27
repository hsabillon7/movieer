import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MovieListScreen from "./src/screens/MovieListScreen";
import MovieSearchResults from "./src/screens/MovieSearchResults";

// Crear nuestra navegación basada en stack (pilas)
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="movieList">
        <Stack.Screen name="movieList" component={MovieListScreen} />
        <Stack.Screen name="movieSearch" component={MovieSearchResults} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
