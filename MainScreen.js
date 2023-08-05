import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { fetchData, movies } from "./api";
import { fetchMovieData, errorArray } from "./MovieDetailsRequest";

const MainScreen = ({ navigation }) => {
  const [channels, setChannels] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const fData = async () => {
    const movieLength = movies.length;
    const batchSize = 100; // Number of movies to fetch in each batch
    const batches = Math.ceil(movieLength / batchSize);
    let breakLoop = false;

    for (let batchIndex = 0; batchIndex < batches; batchIndex++) {
      console.log("Batch Index:", batchIndex); // Logging batch index
      const batchStart = batchIndex * batchSize;
      const batchEnd = Math.min((batchIndex + 1) * batchSize, movieLength);

      console.log("Batch Start:", batchStart); // Logging batch start index
      console.log("length 2: ", movieLength);
      console.log("Batch End:", batchEnd); // Logging batch end index

      const fetchPromises = [];

      for (let i = batchStart; i < batchEnd; i++) {
        if (i < movieLength) {
          console.log("Fetching data for movie:", i); // Logging the movie index being fetched
          fetchPromises.push(fetchMovieData(movies[i]));
          console.log("Fetched data for movie:", i); // Logging when data is fetched for the movie
        } else {
          console.log("end");
          breakLoop = true;
          break;
        }
      }

      if (breakLoop) {
        console.log("end 2");
        break;
      }

      await Promise.all(fetchPromises);
    }
  };

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const data = await fetchData();
  //       setChannels(data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   const getData2 = async () => {
  //     try {
  //       console.log("running");
  //       await fData();
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   getData();
  //   getData2();
  // },[movies]);

  useEffect(() => {
    const fetchDataAndProcess = async () => {
      try {
        const data = await fetchData();
        setChannels(data);

        if (movies[0] != null) {
          await fData();
          setDataLoaded(true);
        }
      } catch (error) {
        console.error("Error fetching or processing data:", error);
      }
    };

    fetchDataAndProcess();
    console.log("Movie: ", movies[movies.length]);
    console.log("Movie: ", movies[movies.length - 1]);
    console.log("Movie: ", movies[movies.length + 1]);
  }, [movies]);

  useEffect(() => {
    if (dataLoaded) {
      // Data loading is complete, navigate to SecondScreen
      console.log("error length: ", errorArray.length);
      console.log("Movie 1: ", movies[movies.length]);
      console.log("Movie 2: ", movies[movies.length + 1]);
      console.log("Movie 3: ", movies[movies.length + 5]);
      navigation.navigate("Second");
    }
  }, [dataLoaded]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Loadings</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "black",
  },
});

export default MainScreen;
