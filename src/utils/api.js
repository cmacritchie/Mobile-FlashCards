import { AsyncStorage } from 'react-native'
import { ADD_DECK_KEY } from '../components/NewDeck'

export function addNewDeck(key) {
    return AsyncStorage.mergeItem(ADD_DECK_KEY, JSON.stringify({
        [key]:{
            title: key,
            questions: [
            ]
          },
    }))
}

export function addNewQuestion(key, question) {

    return AsyncStorage.getItem(ADD_DECK_KEY).then(decks =>{
        let decksJSON = JSON.parse(decks);
        
        decksJSON[key].questions.push(question);
        AsyncStorage.setItem(ADD_DECK_KEY, JSON.stringify(decksJSON));
    }).done();
}

export function removeDeck(key) {
    return AsyncStorage.getItem(ADD_DECK_KEY)
        .then((decks) => {
            let decksJSON = JSON.parse(decks)          
            delete decksJSON[key];
            AsyncStorage.setItem(ADD_DECK_KEY, JSON.stringify(decksJSON))
        }).done();
}

export function importData(callback){
    AsyncStorage.getItem(ADD_DECK_KEY, (error,value) => {
        if (error) { 
            console.log("There was an API problem"); 
        }
    }).then(res => {callback(JSON.parse(res))});

}

export function clearAllData(){
    AsyncStorage.clear().then(()=>{console.log("clear")})
}