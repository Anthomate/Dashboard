import * as React from 'react';
import { View } from 'react-native';
import { Caption, Title } from 'react-native-paper';

type Props = {
    stateName: string;
    count: number;
    backgroundColor: string;
};

export const CounterItem = ({ stateName, count, backgroundColor }: Props) => {
    return (
        <View
            style={{
                backgroundColor,
                width: '45%',
                height: 120,
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
                margin: '2.5%',
            }}
        >
            <Caption style={{ color: '#fff' }}>{stateName}</Caption>
            <Title style={{ color: '#fff', marginTop: 10 }}>{count}</Title>
        </View>
    );
};
