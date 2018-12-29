import React, {Component} from 'react';
import {View, Alert, Text, TextInput, Button, TouchableOpacity, AsyncStorage} from 'react-native';
import {addNewDeck} from '../utils/api' 
import { connect } from 'react-redux'
import {addDecks} from '../actions'
import { withNavigation } from 'react-navigation';

class StartQuiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
                        DeckItem: 0,
                        CorrectCount: 0,
                        IncorrectCount: 0,
                        QuestionView: true,
                        ButtonLabel: "Answer"
                    };
      }

    toggleQuestion() {
        
        this.setState({QuestionView: !this.state.QuestionView});
        if(this.state.QuestionView)
        {
            this.setState({ButtonLabel: "Question"})
        }else{
            this.setState({ButtonLabel: "Answer"})
        }
    }
    restartQuiz(){
        this.setState({
                        DeckItem: 0,
                        CorrectCount: 0,
                        IncorrectCount: 0,
                        QuestionView: true,
                        ButtonLabel: "Answer"
        })
    }

    saveDate() {
        AsyncStorage.setItem('QuizDate', new Date()).then(()=> console.log("saved"))
      }

    

    nextCard(){
        this.setState({DeckItem:(this.state.DeckItem + 1),
                       QuestionView: true,
                       ButtonLabel: "Answer"});
    }
     
    quizCounter()
    {
        this.setState({CorrectCount:(this.state.CorrectCount + 1)});   
        this.nextCard();
    }
    
    render(){
        const {activeDeck : {questions, title}} = this.props
        const {buttonStyle, textStyle, viewStyle} = styles
        if(this.state.DeckItem == questions.length)
        {
            this.saveDate();
            return(
            <View>
                <Text style={textStyle}>Quiz Over</Text>
                <Text>{this.state.CorrectCount} out of {questions.length} questions Correct</Text>
                <View style={viewStyle}>
                <TouchableOpacity onPress={this.restartQuiz.bind(this)} >
                    <Text >
                        Restart Quiz
                    </Text>
                </TouchableOpacity>
                </View>
                <View style={viewStyle}>
                <TouchableOpacity onPress={() =>this.props.navigation.goBack()} >
                    <Text >
                        Return to Deck
                    </Text>
                </TouchableOpacity>
                </View>
            </View>
            )
        }

        return(
            <View>
                <Text>question {this.state.DeckItem + 1}/{questions.length}</Text>
                <Text>{title}</Text>
                {this.state.QuestionView ? <Text style={textStyle}>{questions[this.state.DeckItem].question}</Text> :
                                            <Text style={textStyle}>{questions[this.state.DeckItem].answer}</Text>}
                
                <View style={buttonStyle}>
                <Button
                    title={this.state.ButtonLabel}
                    onPress={this.toggleQuestion.bind(this)}
                    color="#bc9e05"
                />
                </View>
                <View style={buttonStyle}>
                <Button
                 title="Correct"
                 value="correct"
                 onPress={this.quizCounter.bind(this)}
                 color="#24ce06"
                  />
                  </View>
                  <View style={buttonStyle}>
                <Button
                title="InCorrect"
                value="incorrect"
                onPress={this.nextCard.bind(this)}
                color="#ce0505"
                />
                </View>

            </View>
        )
    }
}
const styles ={
    buttonStyle: {
        paddingTop:5
    },
    textStyle: {
        fontSize:25,
        alignItems: 'center',
        paddingTop:30,
        paddingLeft: 20,
        paddingRight:20,
        justifyContent: 'center'
    },
    viewStyle: {
        backgroundColor:'#ccdef9',
        justifyContent: 'center', //up or down
        alignItems: 'center',
        height: 60,
        paddingTop:0,
        shadowColor: '#000',
        position: 'relative',       
        marginBottom: 5,
        marginTop:5,  
        borderRadius: 5  
    }
}

function mapStateToProps(state) {
    return {
        activeDeck: state.activeDeck
    }
}

export default connect(mapStateToProps)(withNavigation(StartQuiz))