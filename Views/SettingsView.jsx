// Imports
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as React from "react";
import { useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";

// Assets
import usernameIcon from "../assets/username-icon.png";
import passwordIcon from "../assets/password-icon.png";

// Main component
export function SettingsView({ navigation }) {
    // State
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [subdomain, setSubdomain] = useState("");
    const [protocol, setProtocol] = useState("");
    const [tld, setTld] = useState("");

    // Load config
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

    // Handle submit
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

    // Render
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Paramètres</Text>
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Image source={usernameIcon} style={styles.icon}/>
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        placeholderTextColor="#fff"
                        onChangeText={(text) => setUsername(text)}
                        value={username}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Image source={passwordIcon} style={styles.icon}/>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#fff"
                        secureTextEntry
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                    />
                </View>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={protocol}
                        style={styles.picker}
                        onValueChange={(itemValue) => setProtocol(itemValue)}
                    >
                        <Picker.Item label="http" value="http"/>
                        <Picker.Item label="https" value="https"/>
                    </Picker>
                    <TextInput
                        style={styles.inputSubdomain}
                        placeholder="Sub-domain"
                        placeholderTextColor="#fff"
                        onChangeText={(text) => setSubdomain(text)}
                        value={subdomain}
                    />
                    <Text style={{fontSize: 18}}>.simplydesk.</Text>
                    <Picker
                        selectedValue={tld}
                        style={styles.picker}
                        onValueChange={(itemValue) => setTld(itemValue)}
                    >
                        <Picker.Item style={styles.pickerItem} label="com" value="com"/>
                        <Picker.Item style={styles.pickerItem} label="fr" value="fr"/>
                    </Picker>
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

// Styles
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
        marginVertical: 30,
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
        paddingHorizontal: 30
    },
    validateButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    dashboardButton: {
        position: 'absolute',
        bottom: 0,
        width: '80%',
        height: '10%',
        backgroundColor: '#484848',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
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
        marginTop: "20%"
    },
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '90%',
        height: '10S%',
        padding: 20,
        marginVertical: 10,
        backgroundColor: "#555454",
        borderRadius: 10,
        overflow: "hidden"
    },
    picker: {
        width: 110,
        fontSize: 10,
    },
    inputSubdomain: {
        backgroundColor: 'rgba(185,42,42,0)',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: '40%',
        height: 40,
        textAlign: "center",
        fontSize: 18,
        overflow: "hidden",
        marginRight: 20
    }
});

