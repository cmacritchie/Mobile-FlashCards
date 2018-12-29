import React, {Component} from 'react';
import {View, Button, Text, Header} from 'react-native';
import {addNewDeck, removeDeck, importData} from '../utils/api' 
import { connect } from 'react-redux'
import {addDecks, allDecks, deSelectDeck} from '../actions'
import { withNavigation, navigationOptions } from 'react-navigation';
import {bindActionCreators} from 'redux'

class DeckDetail extends Component {
    static navigationOptions = {
        title: 'Home',
      };
   
    delete(){
        removeDeck(this.props.activeDeck.title);
        importData((value) =>{
           // allDecks(value);
        });
        const Deck = this.props.decks;
        delete Deck[this.props.activeDeck.title];
        allDecks(Deck);
        this.props.navigation.goBack();
        //this.props.dispatch(deSelectDeck());
    }

    render() {
        
        if(!this.props.activeDeck == {})
        {
            return(<Text>Gone</Text>)
        }
     
     
        const {activeDeck : {questions, title}} = this.props
        const {textStyle} = styles
      return(

              <View style>
                  <Text style={textStyle}>{title}</Text>
                  <Text style={{alignItems:'center'}}>Number of cards: {questions.length}</Text>
                    <Button 
                    // style={buttonStyle}
                    onPress={() =>this.props.navigation.navigate('AddCard')}
                    title="Add New Question"
                    color="#841584"
                    />
                    <Button
                        // style={buttonStyle}
                        onPress={() =>this.props.navigation.navigate('StartQuiz')}
                        title="Start Quiz"
                        color="#222222"
                    />
                    <Button
                        // style={buttonStyle}
                        onPress={this.delete.bind(this)}
                        title="Delete Deck"
                        color="#111111"
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
        paddingRight:20,
        justifyContent: 'center'
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

DeckDetail.defaultProps = {
    activeDeck: {title:"Loaading"}
  };


function mapStateToProps(state) {
    return {
        decks: state.decks,
    activeDeck: state.activeDeck

    }
}


function mapDispatchToProps(dispatch){
    
    return bindActionCreators({deSelectDeck, allDecks}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(DeckDetail))