import { View, Text, StyleSheet } from "react-native";
import { movies } from "./api";

const SecondScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{movies[movies.length - 2].title}</Text>
      <Text style={styles.title}>{movies[movies.length - 2].id}</Text>
      <Text style={styles.title}>{movies[movies.length - 2].overview}</Text>
      <Text style={styles.title}>{movies[movies.length - 5].title}</Text>
      <Text style={styles.title}>{movies[movies.length - 5].id}</Text>
      <Text style={styles.title}>{movies[movies.length - 5].overview}</Text>
      <Text style={styles.title}>{movies[movies.length - 12].title}</Text>
      <Text style={styles.title}>{movies[movies.length - 12].id}</Text>
      <Text style={styles.title}>{movies[movies.length - 12].overview}</Text>
      <Text style={styles.title}>{movies[movies.length - 50].title}</Text>
      <Text style={styles.title}>{movies[movies.length - 50].id}</Text>
      <Text style={styles.title}>{movies[movies.length - 50].overview}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "black",
  },
  title: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 16,
    color: "white",
  },
});

export default SecondScreen;
