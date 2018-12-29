import {combineReducers} from 'redux';
import update from 'immutability-helper';

import { ADD_DECKS,
        ADD_QUESTIONS,
        RECEIVE_DECKS,
        SELECT_DECK,
        DESELECT_DECK} from '../actions'

function Decks(state = {}, action) {
    switch(action.type) {
        case ADD_DECKS :
            return action.payload;
        default:
            return state
    }
}

function ActiveDeck(state ={}, action) {

    switch(action.type) {
        case SELECT_DECK :
            return action.payload
        case DESELECT_DECK :
            return action.payload;
        case ADD_QUESTIONS:
            return update(state, {questions: {$push: [action.payload] }} )
        default:
            return state
    }
}


const rootReducer = combineReducers({
    decks: Decks,
    activeDeck: ActiveDeck
})


export default rootReducer