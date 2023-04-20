import {StyleSheet, Text, View} from "react-native";

export const CounterItem = ({backgroundColor, stateName, count}) => {
    const counterStyle = StyleSheet.flatten([
        styles.counter,
        {backgroundColor: backgroundColor},
    ]);

    return (
        <View style={counterStyle}>
            <Text style={styles.counterStateName}>{stateName}</Text>
            <Text style={styles.counterNumber}>{count}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    counter: {
        borderStyle: "solid",
        alignItems: "center",
        borderRadius: 10,
        minWidth: "40%",
        marginTop: "4%",
        marginBottom: "4%"
    },
    counterStateName: {
        fontSize: 18,
        paddingTop: "4%",
        paddingBottom: "3%",
    },
    counterNumber: {
        fontSize: 24,
        paddingBottom: "4%"
    }
});
