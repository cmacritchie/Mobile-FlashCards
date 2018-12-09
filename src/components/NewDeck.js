import React, {Component} from 'react';
import {View, Alert, Text, TextInput, Button} from 'react-native';
import {addNewDeck, importData, clearAllData} from '../utils/api' 
import { connect } from 'react-redux'
import {allDecks, } from '../actions'

export const ADD_DECK_KEY = 'addDeckkey';

class NewDeck extends Component {
    constructor(props) {
        super(props);
        this.state = {text: ""};
      }

        
      

    submit() {
        
        
            if(this.state.text === undefined || this.state.text.length === 0)
            {
                Alert.alert("You need a title to create a deck!"); 
            }
            else{
               

                addNewDeck(this.state.text);
                importData((value) =>{
                    
                    this.props.dispatch(allDecks(value));
                });
                
                this.setState({text:""});
               Alert.alert(`Added ${this.state.text}`); 
            
            }
            
    }

    render() {

        const {textStyle, textInputStyle, buttonStyle} = styles;

        return(
            <View>
                <Text style={textStyle}>What is the title of your New Deck?</Text>
                <TextInput
                    style={textInputStyle}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                    placeholder="Deck Title"
                    />
                <Button
                    style={buttonStyle}
                    onPress={this.submit.bind(this)}
                    title="Create Deck"
                    color="#841584"
                />
            </View>
        )
    }
}

const styles = {
    textStyle: {
        fontSize:35,
        alignItems: 'center',
        paddingTop:30,
        paddingLeft: 20,
        paddingRight:20
    },
    textInputStyle: {
        alignItems: 'center',
        height: 40,
        borderColor: 'gray',
        borderWidth: 2,
        paddingLeft: 20,
        paddingRight: 20,
    },
    buttonStyle: {
    
    }
};

export default connect()(NewDeck)