import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput, Button,
} from "react-native";
import * as React from "react";

export function SettingsView({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Paramètres</Text>
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#fff"/>
                <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#fff" secureTextEntry />
                <TextInput style={styles.input} placeholder="Sub-domain" placeholderTextColor="#fff" />
                <Button title="Valider" />
                <TouchableOpacity
                    style={styles.settingsButton}
                    onPress={() => navigation.navigate("Dashboard")}
                >
                    <Text style={styles.settingsButtonText}>Dashboard</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#2F2F2F",
        height: "100%",
    },
    title: {
        color: "#fff",
        width: "100%",
        textAlign: "center",
        fontSize: 30,
        marginTop: "5%",
    },
    input: {
        backgroundColor: "rgba(185,42,42,0)",
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: "90%",
        height: "10%",
        marginLeft: "5%",
        marginBottom: "5%",
        color: "#fff",
        borderBottom: "1px solid white",
    },
    settingsButton: {
        width: "100%",
        height: "10%",
        padding: "4%",
        backgroundColor: "#484848",
        justifyContent: "center",
        alignItems: "center",
    },
    settingsButtonText: {
        color: "#fff",
        fontSize: 18,
        textAlign: "center",
    },
});
