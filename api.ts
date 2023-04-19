import {Buffer} from "buffer";
import * as FileSystem from "expo-file-system";

export async function readConfig() {
    try {
        const configPath = FileSystem.documentDirectory + "config.json";
        const configJson = await FileSystem.readAsStringAsync(configPath, {
            encoding: FileSystem.EncodingType.UTF8,
        });
        return JSON.parse(configJson);
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function fetchOpenTickets(dateMin: any, page: number, headers: Headers, apiUrl: string) {
    const response = await fetch(
        `${apiUrl}/GetOpenTickets?p=${page}&datemin=${dateMin}`,
        { headers }
    );
    if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
    }
    return await response.json();
}

export async function getOpenTickets(dateMin: string, username: string, password: string, subdomain: string, page = 1) {
    const protocol = "https";
    const topLevelDomain = "fr";
    const API_BASE_URL = `${protocol}://${subdomain}-api.simplydesk.${topLevelDomain}/incidentManagement.svc`;

    console.log("Protocol:", protocol);
    console.log("Subdomain:", subdomain);
    console.log("Top Level Domain:", topLevelDomain);
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("API Base URL:", API_BASE_URL);

    const token = Buffer.from(`${username}:${password}`).toString("base64");
    const headers = new Headers();
    headers.set("Authorization", `Basic ${token}`);

    const tickets = await fetchOpenTickets(dateMin, page, headers, API_BASE_URL);
    if (tickets.length === 30) {
        const nextPageTickets: any[] = await getOpenTickets(dateMin, username, password, subdomain, page + 1);
        return tickets.concat(nextPageTickets);
    }
    return tickets;
}



export function countTicketsByState(tickets: any[], stateName: string) {
    let count = 0;

    tickets.forEach(ticket => {
        if (ticket.StateName === stateName) {
            count++;
        }
    });

    return count;
}

export function getNewTickets(tickets: any[]): any[] {
    const newTickets: any[] = [];

    tickets.forEach((ticket) => {
        if (ticket.StateName === "Nouveau") {
            newTickets.push(ticket);
        }
    });

    return newTickets;
}

