import { Buffer } from 'buffer';
import * as FileSystem from 'expo-file-system';

export interface Config {
    username: string;
    password: string;
    subdomain: string;
    topLevelDomain?: string;
    protocol?: string;
}

export const readConfig = async (): Promise<Config | null> => {
    try {
        const configPath = `${FileSystem.documentDirectory}config.json`;
        const configJson = await FileSystem.readAsStringAsync(configPath, {
            encoding: FileSystem.EncodingType.UTF8,
        });
        const config = JSON.parse(configJson) as Config;
        return {
            username: config.username,
            password: config.password,
            subdomain: config.subdomain,
            topLevelDomain: config?.topLevelDomain || 'fr',
            protocol: config?.protocol || 'http',
        };
    } catch (error) {
        console.error(error);
        return null;
    }
};

interface Ticket {
    StateName: string;
    RequestDate: string;
}

const fetchOpenTickets = async (
    dateMin: string,
    page: number,
    headers: Headers,
    apiUrl: string
): Promise<Ticket[]> => {
    const response = await fetch(`${apiUrl}/GetOpenTickets?p=${page}&datemin=${dateMin}`, { headers });
    if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
    }
    return await response.json();
};

export const getOpenTickets = async (
    dateMin: string,
    username: string,
    password: string,
    subdomain: string,
    protocol: string,
    topLevelDomain: string,
    page = 1
): Promise<Ticket[]> => {
    const API_BASE_URL = `${protocol}://${subdomain}-api.simplydesk.${topLevelDomain}/incidentManagement.svc`;

    const token = Buffer.from(`${username}:${password}`).toString('base64');
    const headers = new Headers();
    headers.set('Authorization', `Basic ${token}`);

    const tickets = await fetchOpenTickets(dateMin, page, headers, API_BASE_URL);
    if (tickets.length === 30) {
        const nextPageTickets = await getOpenTickets(dateMin, username, password, subdomain, protocol, topLevelDomain, page + 1);
        return tickets.concat(nextPageTickets);
    }
    return tickets;
};

export const countTicketsByState = (tickets: Ticket[], stateName: string): number =>
    tickets.reduce((count, ticket) => (ticket.StateName === stateName ? count + 1 : count), 0);

export const getNewTickets = (tickets: Ticket[]): Ticket[] => tickets.filter(ticket => ticket.StateName === 'Nouveau');

export const getLastNewTickets = (tickets: Ticket[]): Ticket[] => tickets.filter(ticket => ticket.RequestDate === '2010-04-19T07:29:09.5800000');
