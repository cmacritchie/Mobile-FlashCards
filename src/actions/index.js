export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECKS = 'ADD_DECKS'
export const ADD_QUESTIONS = 'ADD_QUESTIONS'
export const SELECT_DECK = 'SELECT_DECK'
export const DESELECT_DECK ='DESELECT_DECK'


export function receiveDecks(entries) {
    return {
        type:RECEIVE_DECKS,
        payload:entries
    }
}

export function allDecks(entry) {
    
    return {
        type:ADD_DECKS,
        payload:entry
    }
}

export function selectDeck(entry)
{
    return {
        type: SELECT_DECK,
        payload: entry
    }
}

export function deSelectDeck()
{
    return {
        type: DESELECT_DECK,
        payload: {}
    }
}

export function addQuestion(question)
{
    return {
        type: ADD_QUESTIONS,
        payload: question
    }
}