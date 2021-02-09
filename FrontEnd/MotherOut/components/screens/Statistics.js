import React, { Component } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Image } from 'react-native-elements';
import imagen from '../../assets/statistics.png';
import { NavBar } from '../NavBar';
import { StatisticCard } from '../StatisticCard';

const picture = Image.resolveAssetSource(imagen).uri;

class Statistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{ user: 'Animus58', quantity: 15, Score: 230 },
            { user: 'Ambros77', quantity: 7, Score: 77 },
            { user: 'Arnald12', quantity: 12, Score: 200 },
            ],
        };
    }

    componentDidMount = () => {
        alert(this.props.route.params.user);
    }

    render() {
        return (
            <>
                <View style={styles.contenidor}>
                    <View style={styles.header}>
                        <Image
                            style={{ width: 300, height: 90 }}
                            source={{ uri: picture }}
                        />
                    </View>
                    <View style={styles.body}>
                        <FlatList data={this.state.data}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View style={{ padding: 10 }}>
                                    <StatisticCard user={item.user} quantity={item.quantity}
                                        score={item.Score} />
                                </View>)}
                        />
                    </View>
                    <View>
                        <NavBar
                            checked={() => this.props.navigation.navigate('ScreenToDo')}
                            list={() => this.props.navigation.navigate('ListTask')}
                            calendar={() => this.props.navigation.navigate('TaskAssignment')}
                            nav={() => this.props.navigation.navigate('Statistics')}
                            settings={() => this.props.navigation.navigate('Setting')}
                        />
                    </View>
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    contenidor: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#90A8C3',
        borderWidth: 2,
    },
    header: {
        marginTop: 2,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    body: {
        marginTop: 2,
        justifyContent: 'space-evenly',
        padding: 15,
        flex: 10,
    },
});

export default Statistics;
