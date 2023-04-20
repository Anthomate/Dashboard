import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import * as MailComposer from 'expo-mail-composer';
import { decode } from 'he';

export const TicketDetails = ({ selectedTicket }) => {
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
            <Text style={styles.header}>Ticket #{selectedTicket.Number}</Text>
            <Text style={styles.subject}>Sujet : {selectedTicket.Subject}</Text>
            <Text style={styles.body}>Description : {decode(selectedTicket.Body)}</Text>
            <TouchableOpacity style={styles.shareButton} onPress={handleShareTicket}>
                <Text style={styles.shareButtonText}>Partager par e-mail</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderRadius: 10,
    },
    header: {
        fontSize: 20,
        color: '#fff',
        marginBottom: 25,
        textAlign: "center"
    },
    subject: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 15,
    },
    body: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 5,
    },
    shareButton: {
        backgroundColor: '#5cb85c',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 15,
    },
    shareButtonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});
