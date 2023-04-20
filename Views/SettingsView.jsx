import * as React from "react";
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import { Title, TextInput, Button, Provider as PaperProvider } from "react-native-paper";
import { useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";
import {Picker} from "@react-native-picker/picker";

export function SettingsView({ navigation }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [subdomain, setSubdomain] = useState("");
    const [protocol, setProtocol] = useState("");
    const [tld, setTld] = useState("");

    useEffect(() => {
        async function loadConfig() {
            try {
                const configPath = FileSystem.documentDirectory + "config.json";
                const configJson = await FileSystem.readAsStringAsync(configPath, {
                    encoding: FileSystem.EncodingType.UTF8,
                });
                const readConfig = JSON.parse(configJson);

                setUsername(readConfig.username || "");
                setPassword(readConfig.password || "");
                setSubdomain(readConfig.subdomain || "");
                setProtocol(readConfig.protocol || "https");
                setTld(readConfig.topLevelDomain || "com");
            } catch (error) {
                console.error(error);
            }
        }

        loadConfig();
    }, []);

    const handleSubmit = async () => {
        const config = {
            protocol,
            subdomain,
            tld,
            username,
            password,
        };

        try {
            const configPath = FileSystem.documentDirectory + "config.json";
            await FileSystem.writeAsStringAsync(
                configPath,
                JSON.stringify(config),
                {encoding: FileSystem.EncodingType.UTF8}
            );

            const configJson = await FileSystem.readAsStringAsync(configPath, {
                encoding: FileSystem.EncodingType.UTF8,
            });
            const readConfig = JSON.parse(configJson);
            console.log("Config:", readConfig);

        } catch (error) {
            console.error(error);
        }

        navigation.navigate("Dashboard", {
            onSubmit: Date.now(),
        });
    };

    return (
        <PaperProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.titleContainer}>
                    <Title style={styles.title}>Paramètres</Title>
                </View>
                <View style={styles.settingsContainer}>
                    <ScrollView>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                label="Nom d'utilisateur"
                                onChangeText={(text) => setUsername(text)}
                                value={username}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                label="Mot de passe"
                                secureTextEntry
                                onChangeText={(text) => setPassword(text)}
                                value={password}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                label="Sous domaine"
                                onChangeText={(text) => setSubdomain(text)}
                                value={subdomain}
                            />
                        </View>
                        <View style={styles.pickerContainer}>
                            <Text style={styles.label}>Protocole</Text>
                            <Picker
                                style={styles.picker}
                                selectedValue={protocol}
                                onValueChange={(itemValue) => setProtocol(itemValue)}
                            >
                                <Picker.Item label="https" value="https" />
                                <Picker.Item label="http" value="http" />
                            </Picker>
                            <Text style={styles.label}>Extension</Text>
                            <Picker
                                style={styles.picker}
                                selectedValue={tld}
                                onValueChange={(itemValue) => setTld(itemValue)}
                            >
                                <Picker.Item label="com" value="com" />
                                <Picker.Item label="fr" value="fr" />
                                <Picker.Item label="net" value="net" />
                                <Picker.Item label="org" value="org" />
                            </Picker>
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        mode="contained"
                        style={styles.button}
                        contentStyle={styles.buttonContent}
                        onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Valider</Text>
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
        maxHeight: "10%",
    },
    title: {
        textAlign: "center",
        fontSize: 32,
        fontWeight: 800
    },
    settingsContainer: {
        flex: 4,
        maxHeight: "80%",
        paddingLeft: 20,
        paddingRight: 20,
    },
    inputContainer: {
        marginBottom: 15,
        marginTop: 60,
    },
    input: {
        backgroundColor: "#fff",
    },
    pickerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    picker: {
        flexGrow: 1,
    },
    simplydeskText: {
        flexGrow: 2,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: "center",
        maxHeight: "10%",
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
