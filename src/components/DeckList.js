import React, { Component } from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import { FlatList, Text, View, ListView } from 'react-native' //renders items that would be on the screen
import DeckItem from './DeckItem'
import { selectDeck, allDecks } from '../actions/index'
import { addNewDeck, importData, removeDeck } from '../utils/api'
import { withNavigation, NavigationEvents } from 'react-navigation';


class DeckList extends Component {

    constructor(props) {
        super(props);
        this.state = {
                        rerender:true
                    };
      }


    componentDidMount() {
        importData((value) =>{
            this.props.allDecks(value);
        });
    }

    setActiveDeck(deck) {
        this.props.selectDeck(deck);
    }
    
    dataRender(){
        Object.keys(this.props.decks).map(item => {
            return this.props.decks[item];
        });
    }

    render() {

        if(this.props.decks == 0 || this.props.decks == undefined)
        {
            return(
            <View>
                <Text>Nothing Yet</Text>
            </View>
            )
        }
     
        return( 
            <View>
                <NavigationEvents
                    onWillFocus={() => { 
                        importData((value) =>{
                            this.props.allDecks(value);
                        });
                        this.setState({rerender:!this.state.rerender})}}
                    onDidFocus={() => { 
                        importData((value) =>{
                            this.props.allDecks(value);
                        });
                        this.setState({rerender:!this.state.rerender})}}
                    
                    />
                <FlatList
                data={Object.keys(this.props.decks).map(item => {
                    return this.props.decks[item];
                })}
                renderItem = {(deck) =><DeckItem onClick={() =>this.setActiveDeck(deck.item)} cardCount={deck.item.questions.length}  title={deck.item.title} />}
                key={item => item.title}
                extraData={this.state.rerender}
                />
            </View>
            
        )
    }
}

function mapStateToProps(state) {
    return {
        decks: state.decks
    }
}

function mapDispatchToProps(dispatch){
    
    return bindActionCreators({selectDeck, allDecks}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(DeckList))