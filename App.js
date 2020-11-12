import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MovieListScreen from "./src/screens/MovieListScreen";
import MovieSearchResultsScreen from "./src/screens/MovieSearchResultsScreen";
import MovieInfoScreen from "./src/screens/MovieInfoScreen";

// Crear nuestra navegación basada en stack (pilas)
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="movieList">
        <Stack.Screen
          name="movieList"
          component={MovieListScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="movieSearch"
          component={MovieSearchResultsScreen}
          options={{
            title: "Resultados",
            headerStyle: {
              backgroundColor: "#00a5cf",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="movieInfo"
          component={MovieInfoScreen}
          options={{
            title: "Información",
            headerStyle: {
              backgroundColor: "#00a5cf",
            },
            headerTintColor: "#fff",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
