import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as MailComposer from 'expo-mail-composer';
import { decode } from 'he';

interface Props {
    selectedTicket: {
        Number: number;
        Subject: string;
        Body: string;
    };
}

export const TicketDetails: React.FC<Props> = ({ selectedTicket }) => {
    const handleShareTicket = async () => {
        const emailSubject = `Ticket #${selectedTicket.Number}: ${selectedTicket.Subject}`;
        const emailBody = `Description: ${decode(selectedTicket.Body)}`;

        await MailComposer.composeAsync({
            subject: emailSubject,
            body: emailBody,
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Détails du ticket #{selectedTicket.Number}</Text>
            </View>
            <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Sujet:</Text>
                    <Text style={styles.detailText}>{selectedTicket.Subject}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Description:</Text>
                    <Text style={styles.detailText}>{decode(selectedTicket.Body)}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleShareTicket}>
                <Text style={styles.buttonText}>Partager par e-mail</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    titleContainer: {
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    detailsContainer: {
        flex: 1,
        paddingTop: 20,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    detailLabel: {
        width: '30%',
        fontWeight: 'bold',
        marginRight: 10,
    },
    detailText: {
        flex: 1,
    },
    button: {
        backgroundColor: '#007aff',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
