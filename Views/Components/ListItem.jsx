import {StyleSheet, Text} from "react-native";

export const ListItem = ({number, subject}) => {
  return (
      <Text style={styles.listItem}>#{number} - {subject}</Text>
  )
}

const styles = StyleSheet.create({
  listItem: {
    fontSize: 12,
    width: "100%",
    marginTop: "5%",
    color: "#fff"
  }
});