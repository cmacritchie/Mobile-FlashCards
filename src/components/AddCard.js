import React, {Component} from 'react';
import {View, Alert, Text, TextInput, Button} from 'react-native';
import {addNewDeck, importData, addNewQuestion} from '../utils/api' 
import { connect } from 'react-redux'
import {addQuestion} from '../actions'


class AddCard extends Component {

    constructor(props) {
        super(props);
        this.state = {question: "",
                        answer: ""};
      }

      submit() {
        
        
        if(this.state.question === undefined || this.state.question.length === 0 ||this.state.question === undefined || this.state.answer.length === 0)
        {
            Alert.alert("Your question and Answer need values"); 
        }
        else{
            
            var card= {question:this.state.question, answer:this.state.answer} 

            this.props.dispatch(addQuestion(card));
            addNewQuestion(this.props.activeDeck.title, card);
            
            
            this.setState({question: "",answer: ""});
           Alert.alert(`questions Added`); 
        
        }
        
    //this.props.dispatch is available from the connect function
   // this.props.dispatch(addDecks())
        
    
    
}

    render() {
        const {textInputStyle, buttonStyle} = styles;
        return(
            <View>
                <Text>Add Card</Text>
                <TextInput
                    style={textInputStyle}
                    onChangeText={(question) => this.setState({question})}
                    value={this.state.question}
                    placeholder="Question"
                    />
                <TextInput
                style={textInputStyle}
                onChangeText={(answer) => this.setState({answer})}
                value={this.state.answer}
                placeholder="Answer"
                />
                <Button
                    style={buttonStyle}
                    onPress={this.submit.bind(this)}
                    title="Create Card"
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
       // paddingTop:30,
    },
    buttonStyle: {
       // paddingTop:30,
    }
}

function mapStateToProps(state) {
    return {
        activeDeck: state.activeDeck
    }
}

export default connect(mapStateToProps)(AddCard)