<img src="assets/movieer_logo.png">

# Movieer

[![Alzatuvoz](https://img.shields.io/website?label=alzatuvoz.hn&url=https%3A%2F%2Falzatuvoz.hn)](https://alzatuvoz.hn)
[![Prettier](https://img.shields.io/website?label=code%20style&up_color=%23DA63A7&up_message=prettier&url=https%3A%2F%2Fgithub.com%2Fprettier%2Fprettier)](https://github.com/prettier/prettier)

Es una aplicación que te permite conectarte a la API de themoviedb.org y mostrar información sobre las películas más populares, realizar búsquedas y ver la información general sobre una película.

## Imágenes del proyecto

<p align="center"><img src="https://s3.us-east-2.amazonaws.com/alzatuvoz.hn/movieer-screen1.png" height=400></p><br>
<p align="center"><img src="https://s3.us-east-2.amazonaws.com/alzatuvoz.hn/movieer-screen2.png" height=400></p><br>
<p align="center"><img src="https://s3.us-east-2.amazonaws.com/alzatuvoz.hn/movieer-screen3.png" height=400></p><br>

## Tecnologías utilizadas

- React native
- Expo
- React navigation
- NativeBase
- Axios

## Instrucciones para la instalación

Clona este repositorio. Necesitas tener instalado <code>node</code>, <code>npm</code> y <code>expo-cli</code> de manera global en tu computadora.

The Movie DB API key: <br>
Para que la aplicación pueda funcionar, requieres de una API key válida para poder comunicarte con la API de The Movie DB. Movieer implementa la versión 3 de dicha API.

Una vez que obtengas tu API key, debes crear el archivo <code>enviroment.js</code> en la raíz del directorio y configurarlo de la siguiente manera:
<br>
<br>

```js
import Constants from "expo-constants";

const ENV = {
  dev: {
    apiUrl: "https://api.themoviedb.org/3/",
    apiKey: "Tu API key obtenida desde themoviedb.org",
    apiImageUrl: "https://image.tmdb.org/t/p/",
    apiImageSize: "w500",
  },
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  if (__DEV__) {
    return ENV.dev;
  }
};

export default getEnvVars;
```

<br>

Instalación:<br>
<code>npm install</code>

Iniciar Expo Metro:<br>
<code>expo start</code>
