import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
    number: number;
    subject: string;
    onClick?: () => void;
};

export function ListItem({ number, subject, onClick }: Props) {
    return (
        <TouchableOpacity onPress={onClick}>
            <View style={styles.container}>
                <Text style={styles.number}>#{number}</Text>
                <Text style={styles.subject}>{subject}</Text>
            </View>
            <View style={styles.separator} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
    },
    number: {
        marginRight: 16,
        fontWeight: "bold",
        fontSize: 16,
    },
    subject: {
        flex: 1,
        fontSize: 16,
    },
    separator: {
        height: 1,
        backgroundColor: "#ccc",
        marginLeft: 16,
        marginRight: 16,
    },
});
