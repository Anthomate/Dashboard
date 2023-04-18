import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as React from "react";
import {useEffect, useState} from "react";
import {CounterItem} from "./Components/CounterItem";
import {ListItem} from "./Components/ListItem";
import {countTicketsByState, getNewTickets, getOpenTickets} from "../api";

export function DashboardView({route, navigation}) {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        async function loadOpenTickets() {
            const config = await readConfig();
            if (config) {
                const { username, password, subdomain } = config;
                const dateMin = "11/04/2011";
                getOpenTickets(dateMin, username, password, subdomain)
                    .then((data) => {
                        setTickets(data);
                        console.log(data)
                    })
                    .catch((error) => {
                        console.error("Error fetching open tickets:", error);
                    });
            }
        }

        loadOpenTickets();
    }, [route.params?.onSubmit]);

    const newTickets = getNewTickets(tickets);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Mon Dashboard</Text>
            <View style={styles.container}>
                <View style={styles.counterFrame}>
                    <CounterItem backgroundColor="#d9534f" stateName="Nouveau" count={newTickets.length}/>
                    <CounterItem backgroundColor="#5cb85c" stateName="En Cours" count={countTicketsByState(tickets, "En Cours")}/>
                    <CounterItem backgroundColor="#ffcc5c" stateName="Suspendu" count={countTicketsByState(tickets, "Suspendu")}/>
                    <CounterItem backgroundColor="#d9534f" stateName="Réouvert" count={countTicketsByState(tickets, "Réouvert")}/>
                </View>
                <View style={styles.listContainer}>
                    <ScrollView>
                        {newTickets.map((ticket, index) => (
                            <ListItem key={index} number={ticket.Number} subject={ticket.Subject}/>
                        ))}
                    </ScrollView>
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
        flex: 1,
        backgroundColor: '#2F2F2F',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: "#fff",
        width: "100%",
        textAlign: "center",
        fontSize: 24,
        marginTop: "5%"
    },
    counterFrame: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        marginBottom: "4%"
    },
    listContainer: {
        flex: 1,
        margin: "7%",
        maxHeight: "30%",
    },

    list: {
        backgroundColor: "#484848FF",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        borderRadius: "10%",
        paddingLeft: "10%",
        overflow: "hidden",
    },

    noTickets: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
        margin: "auto"
    },
    settingsButton: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '14%',
        backgroundColor: '#484848',
        justifyContent: 'center',
        alignItems: 'center',
    },
    settingsButtonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
});