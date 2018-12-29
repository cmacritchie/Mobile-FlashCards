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

    saveQuizTime() {
        const currentTime = new Date();
    
        AsyncStorage.setItem('lastQuizTime', currentTime).then(() => {
          AsyncStorage.getItem('lastQuizTime').then((res) => {
            console.log(`res time ${res}`)
          }
          )
        })
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
        if(this.state.DeckItem == questions.length)
        {
            this.saveQuizTime();
            return(
            <View>
                <Text>Quiz Over</Text>
                <Text>{this.state.CorrectCount} out of {questions.length} questions Correct></Text>
                <TouchableOpacity onPress={this.restartQuiz.bind(this)} >
                    <Text >
                        Restart Quiz
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>this.props.navigation.goBack()} >
                    <Text >
                        Return to Deck
                    </Text>
                </TouchableOpacity>
            </View>
            )
        }

        return(
            <View>
                <Text>question {this.state.DeckItem + 1}/{questions.length}</Text>
                <Text>{title}</Text>
                {this.state.QuestionView ? <Text>{questions[this.state.DeckItem].question}</Text> :
                                            <Text>{questions[this.state.DeckItem].answer}</Text>}
                <Text></Text>
                <Button
                    title={this.state.ButtonLabel}
                    onPress={this.toggleQuestion.bind(this)}
                />
                <Button
                 title="Correct"
                 value="correct"
                 onPress={this.quizCounter.bind(this)}
                  />
                <Button
                title="InCorrect"
                value="incorrect"
                onPress={this.nextCard.bind(this)}
                />

            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        activeDeck: state.activeDeck
    }
}

export default connect(mapStateToProps)(withNavigation(StartQuiz))