import {StyleSheet, Text, TouchableOpacity} from "react-native";

export function ListItem({number, subject, onClick}) {
    return (
        <TouchableOpacity onPress={onClick}>
            <Text style={styles.listItem}>#{number} - {subject}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    listItem: {
        fontSize: 16,
        width: "100%",
        marginTop: "5%",
        color: "#fff"
    }
});