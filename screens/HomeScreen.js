import React, { Component } from 'react';
import { AppRegistry, Text, View, TouchableHighlight, StyleSheet, TextInput, ActivityIndicator, ImageBackground } from 'react-native';
import { Constants } from 'expo';

export default class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            bal:1.00,
            newBal:0,
            inputValue: "Input Text!",
            isLoading: true,
            dataSource: null,
        }
    }
    componentDidMount (){
        return fetch('http://www.apilayer.net/api/live?access_key=19e31a4fb9e59a165d548234d519c37b')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson.quotes,
                })
            })
 
            .catch((error) => {
                console.log(error)
            });
    }
  
    usdToEuro = () => {
        this.setState({
            newBal: this.state.inputValue * this.state.dataSource.USDEUR,
        })
    }
    usdToPound = () => {
        this.setState({
            newBal: this.state.inputValue * this.state.dataSource.USDGBP,
        })
    }
    usdToRupee = () => {
        this.setState({
            newBal: this.state.inputValue * this.state.dataSource.USDINR,
        })
    }
    usdToAussie = () => {
        this.setState({
            newBal: this.state.inputValue * this.state.dataSource.USDAUD,
        })
    }
    usdToCan = () => {
        this.setState({
            newBal: this.state.inputValue * this.state.dataSource.USDCAD,
        })
    }
    usdToFranc = () => {
        this.setState({
            newBal: this.state.inputValue * this.state.dataSource.USDCHF,
        })
    }
    usdToYuan = () => {
        this.setState({
            newBal: this.state.inputValue * this.state.dataSource.USDCNY,
        })
    }
    usdToYen = () => {
        this.setState({
            newBal: this.state.inputValue * this.state.dataSource.USDJPY,
        })
    }

    _handleTextChange = inputValue => {
        this.setState({ inputValue });
    };

    render() {

        if(this.state.isLoading) {
            return(
                <View style = {styles.container}>
                    <ActivityIndicator/>
                </View>
            )
        } else{

        return (
            <View style={styles.container}>
            <ImageBackground
                    style={styles.imgBackground}
                    source={{ uri: 'http://standardflags.com/shop/wp-content/uploads/2013/01/Nylon-American-Flag-closeup-1.jpg' }}
                >
                <Text style={styles.paragraph}>
                    Currency Converter App
                </Text>
                
                <TextInput
                    value={this.state.inputValue}
                    onChangeText={this._handleTextChange}
                    style={{ width: 250, height: 44, padding: 8, borderColor: 'darkblue', borderWidth: 1, marginTop: 10, color: 'white'}}
                />
                <View style={styles.row}>
                
                
                <TouchableHighlight
                    style={styles.button}
                    onPress = {this.usdToEuro}
                >
                    <Text style={styles.buttonText}>
                        USD to Euro
                    </Text>
                </TouchableHighlight>
                
                <TouchableHighlight
                    style={styles.button}
                    onPress = {this.usdToPound}
                >
                    <Text style={styles.buttonText}>
                        USD to Pound
                    </Text>
                </TouchableHighlight>
                </View>
                <View style={styles.row}>
                <TouchableHighlight
                    style={styles.button}
                    onPress = {this.usdToRupee}
                >
                    <Text style={styles.buttonText}>
                        USD to Rupee
                    </Text>
                </TouchableHighlight>
                
                <TouchableHighlight
                    style={styles.button}
                    onPress = {this.usdToAussie}
                >
                    <Text style={styles.buttonText}>
                        USD to Aussie
                    </Text>
                </TouchableHighlight>
                </View>
                <View style={styles.row}>
                <TouchableHighlight
                style={styles.button}
                onPress = {this.usdToCan}
                >
                    <Text style={styles.buttonText}>
                        USD to Can
                
                    </Text>
                </TouchableHighlight>
                
                <TouchableHighlight
                style={styles.button}
                onPress = {this.usdToFranc}
                >
                    <Text style={styles.buttonText}>
                        USD to Franc
                
                    </Text>
                </TouchableHighlight>
                </View>
                <View style={styles.row}>
                <TouchableHighlight
                style={styles.button}
                onPress = {this.usdToYuan}
                >
                    <Text style={styles.buttonText}>
                        USD to Yuan
                
                    </Text>
                </TouchableHighlight>
                
                <TouchableHighlight
                style={styles.button}
                onPress = {this.usdToYen}
                >
                    <Text style={styles.buttonText}>
                        USD to Yen
                
                    </Text>
                </TouchableHighlight>
                </View>
                
                <Text style={styles.paragraph}>
                    Initial Dollar Amount: {this.state.bal.toFixed(2)}
                </Text>
                
                <Text style={styles.paragraph}>
                    Converted Value: {this.state.newBal.toFixed(2)}
                </Text>
                </ImageBackground>
            </View>
      );
   }
}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
    },
    button: {
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: 100,
        borderColor: 'black',
        borderWidth: 1,
        marginHorizontal: 5,
        backgroundColor: 'darkblue',
        color: 'lightblue',
        borderRadius: 20,
    },
    buttonText:{
        color: 'white',
    },
    row: {
        flexDirection: 'row',
        marginTop: 15,
        
    },
    paragraph: {
        fontSize: 20,
        color: 'red', 
    },
    imgBackground:{
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        flex: 1,
    },
});