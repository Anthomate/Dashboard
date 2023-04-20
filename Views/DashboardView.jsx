import * as React from "react";
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import { Title, Button, Provider as PaperProvider } from "react-native-paper";
import { useEffect, useState } from "react";
import { CounterItem } from "./Components/CounterItem";
import { ListItem } from "./Components/ListItem";
import { countTicketsByState, getNewTickets, getOpenTickets, readConfig } from "../api";
import { TicketDetails } from "./Components/TicketDetails";

export function DashboardView({route, navigation}) {
    const [tickets, setTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);

    function handleTicketClick(ticket) {
        if (selectedTicket && selectedTicket.Number === ticket.Number) {
            setSelectedTicket(null);
        } else {
            setSelectedTicket(ticket);
        }
    }

    useEffect(() => {
        async function loadOpenTickets() {
            const config = await readConfig();
            if (config) {
                const {username, password, subdomain, protocol, topLevelDomain} = config;
                const dateMin = "11/04/2011";
                getOpenTickets(dateMin, username, password, subdomain, protocol, topLevelDomain)
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

        const timer = setInterval(() => {
            loadOpenTickets();
        }, 30000);

        return () => clearInterval(timer);
    }, [route.params?.onSubmit]);

    const newTickets = getNewTickets(tickets);

    return (
        <PaperProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.titleContainer}>
                    <Title style={styles.title}>Mon Dashboard</Title>
                </View>
                <View style={styles.counterItemsContainer}>
                    {selectedTicket ? (
                        <View>
                            <ScrollView>
                                <TicketDetails selectedTicket={selectedTicket} />
                            </ScrollView>
                        </View>
                    ) : (
                        <>
                            <View style={styles.counterRow}>
                                <CounterItem style={styles.counterItem} backgroundColor="#d9534f" stateName="Nouveau" count={newTickets.length} />
                                <CounterItem style={styles.counterItem} backgroundColor="#5cb85c" stateName="En Cours" count={countTicketsByState(tickets, "En Cours")} />
                            </View>
                            <View style={styles.counterRow}>
                                <CounterItem style={styles.counterItem} backgroundColor="#ffcc5c" stateName="Suspendu" count={countTicketsByState(tickets, "Suspendu")} />
                                <CounterItem style={styles.counterItem} backgroundColor="#d9534f" stateName="Réouvert" count={countTicketsByState(tickets, "Réouvert")} />
                            </View>
                        </>
                    )}
                </View>
                <View style={styles.listContainer}>
                    <ScrollView>
                        {newTickets.map((ticket, index) => (
                            <ListItem key={index} number={ticket.Number} subject={ticket.Subject} onClick={() => handleTicketClick(ticket)} />
                        ))}
                    </ScrollView>
                </View>
                <View style={styles.buttonContainer}>
                    <Button style={styles.button} contentStyle={styles.buttonContent} mode="contained" onPress={() => navigation.navigate("Settings")}>
                        <Text style={styles.buttonText}>Paramètres</Text>
                    </Button>
                </View>
            </SafeAreaView>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleContainer: {
        flex: 1,
        justifyContent: "center",
        maxHeight: "10%"
    },
    title: {
        textAlign: "center",
        fontSize: 32,
        fontWeight: 800
    },
    counterItemsContainer: {
        flex: 4,
        justifyContent: "space-evenly",
        maxHeight: "40%",
    },
    counterRow: {
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    counterItem: {
        flex: 1,
        margin: 5,
    },
    listContainer: {
        flex: 4,
        maxHeight: "40%",
        paddingLeft: 20,
        paddingRight: 20,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: "center",
        maxHeight: "10%",
    },
    settingsButton: {
        backgroundColor: "#1e90ff",
        color: "#fff",
    },
    button: {
        backgroundColor: "#0077b6",
        borderRadius: 20,
        marginHorizontal: 20,
        marginBottom: 10,
    },
    buttonContent: {
        height: 50,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
        textTransform: "uppercase",
    },
});