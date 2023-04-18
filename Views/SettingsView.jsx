import {Button, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image} from "react-native";
import * as React from "react";
import {useState} from "react";
import { useEffect } from "react";
import * as FileSystem from "expo-file-system";

import usernameIcon from "../assets/username-icon.png";
import passwordIcon from "../assets/password-icon.png";
import subdomainIcon from "../assets/subdomain-icon.png";

export function SettingsView({navigation}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [subdomain, setSubdomain] = useState("");

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

            } catch (error) {
                console.error(error);
            }
        }

        loadConfig();
    }, []);

    const handleSubmit = async () => {
        const config = {
            protocol: "https",
            subdomain,
            "top-level domain": "fr",
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
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Paramètres</Text>
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Image source={usernameIcon} style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        placeholderTextColor="#fff"
                        onChangeText={(text) => setUsername(text)}
                        value={username}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Image source={passwordIcon} style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#fff"
                        secureTextEntry
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Image source={subdomainIcon} style={[styles.icon, { alignSelf: "flex-end" }]} />
                    <TextInput
                        style={styles.input}
                        placeholder="Sub-domain"
                        placeholderTextColor="#fff"
                        onChangeText={(text) => setSubdomain(text)}
                        value={subdomain}
                    />
                </View>
                <View style={styles.validateButtonContainer}>
                    <TouchableOpacity
                        style={styles.validateButton}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.dashboardButtonText}>Valider</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.dashboardButton}
                    onPress={() => navigation.navigate("Dashboard")}
                >
                    <Text style={styles.dashboardButtonText}>Dashboard</Text>
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
    inputContainer: {
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    input: {
        backgroundColor: 'rgba(185,42,42,0)',
        borderRadius: 5,
        paddingHorizontal: 40,
        paddingVertical: 5,
        width: '100%',
        height: 40,
        marginLeft: 10,
        color: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
    },
    icon: {
        width: 24,
        height: 24,
    },
    validateButton: {
        backgroundColor: '#5cb85c',
        padding: 10,
        borderRadius: 5,
        width: '60%',
        alignItems: 'center',
        marginVertical: 20,
    },
    validateButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    dashboardButton: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '14%',
        backgroundColor: '#484848',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dashboardButtonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
    title: {
        color: "#fff",
        width: "100%",
        textAlign: "center",
        fontSize: 24,
        marginTop: "5%"
    },
});

