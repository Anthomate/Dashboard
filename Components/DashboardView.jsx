import {Button, StyleSheet, Text, View} from "react-native";
import * as React from "react";

export function DashboardView({ navigation }) {
    return (
        <View style={styles.container}>
            <Button
                title="Settings"
                onPress={() => navigation.navigate('Settings')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});