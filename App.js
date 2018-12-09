import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from './src/reducers'
import DeckList from './src/components/DeckList'
import Header from './src/components/Header'
import { createBottomTabNavigator, createStackNavigator, createAppContainer  } from 'react-navigation'
import NewDeck from './src/components/NewDeck'
import Navigate from './src/components/Tabs'
import logger from 'redux-logger'
import StartQuiz from './src/components/StartQuiz'
import AddCard from './src/components/AddCard'
import DeckDetail from './src/components/DeckDetail'

const store = createStore(reducers, applyMiddleware(logger));

class HomeScreen extends React.Component {
  render() {
    return (
        <View >
          <Header title = "Deck List" />
          <DeckList   />
        </View>
    );
  }
}

class NewScreen extends React.Component {
  render() {
    return (
        <View  >
          <Header title="Add New Deck" />
          <NewDeck />
        </View>
    );
  }
}

//https://reactnavigation.org/docs/en/tab-based-navigation.html

class DeckDetailScreen extends React.Component {
  render() {
    return (
        <View  >
          <DeckDetail />
        </View>
    );
  }
}



 const HomeStack = createStackNavigator({
  Home: HomeScreen,
  DeckDetail: DeckDetailScreen,
  AddCard: AddCard,
  StartQuiz: StartQuiz
});


const AppNavigator = createBottomTabNavigator({
  Home:  HomeStack,
  NewDeck: NewScreen
});

const Navigatro = createAppContainer(AppNavigator);

class Program extends React.Component {
  render() {
    return(
      <Provider store={store} >
        <Navigatro />
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Program;