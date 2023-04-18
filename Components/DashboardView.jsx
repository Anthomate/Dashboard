import { Button, StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from "react-native";
import * as React from "react";
import {CounterItem} from "./CounterItem";
import {ListItem} from "./ListItem";

export function DashboardView({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Mon Dashboard</Text>
            <View style={styles.container}>
                <View style={styles.counterFrame}>
                    <CounterItem backgroundColor="#d9534f" stateName="Nouveau" count="4"/>
                    <CounterItem backgroundColor="#5cb85c" stateName="En Cours" count="14"/>
                    <CounterItem backgroundColor="#ffcc5c" stateName="Suspendu" count="23"/>
                    <CounterItem backgroundColor="#d9534f" stateName="Réouvert" count="2"/>
                </View>
                <View style={styles.list}>
                    <ListItem number="1" subject="Demande pour dépannage d'imprimante"/>
                    <ListItem number="2" subject="Problème sur le serveur AD"/>
                    <ListItem number="3" subject="Plus de log pour l'application"/>
                    <ListItem number="4" subject="Impossible de me connecter au serveur de mail depuis 1h"/>
                    <ListItem number="5" subject="Proposition d'amélioration pour votre logiciel"/>
                    <ListItem number="6" subject="Création d'un nouvel utilisateur"/>
                    <ListItem number="7" subject="Demande d'autorisation d'accès aux serveurs de secours"/>
                    <ListItem number="8" subject="Demande d'amélioration"/>
                    <ListItem number="9" subject="Renouvellement du certificat ssl"/>
                    <ListItem number="10" subject="Dépannage Saint Priest"/>
                </View>
                <TouchableOpacity
                    style={styles.settingsButton}
                    onPress={() => navigation.navigate("Settings")}
                >
                    <Text style={styles.settingsButtonText}>Settings</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: "#2F2F2F",
        height:"100%"
    },
    title: {
        color: "#fff",
        width: "100%",
        textAlign: "center",
        fontSize: "30%",
        marginTop: "5%"
    },
    counterFrame: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        marginTop: "4%",
        marginBottom: "4%"
    },
    list: {
        backgroundColor: "#484848FF",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        margin: "7%",
        height: "45%",
        borderRadius: "10%",
        paddingLeft: "10%"
    },
    settingsButton: {
        width: "100%",
        height: "10%",
        padding: "4%",
        backgroundColor: "#484848",
        justifyContent: "center",
        alignItems: "center"
    },
    settingsButtonText: {
        color: "#fff",
        fontSize: 18,
        textAlign: "center"
    }
});