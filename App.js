import React from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';
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

import { Constants, Notifications, Permissions } from 'expo';

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


 const HomeStack = createStackNavigator({
  Home: HomeScreen,
  DeckDetail: DeckDetail,
  AddCard: AddCard,
  StartQuiz: StartQuiz
});


const AppNavigator = createBottomTabNavigator({
  Home:  HomeStack,
  NewDeck: NewScreen
});

const Navigatro = createAppContainer(AppNavigator);


async function getAndroidNotificationPermission() {
  const { status } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  // console.log(`status is ${status}`);
  // console.log('permissions');
  // console.log(Permissions);
  if (status !== 'granted') {
    await Permissions.askAsync(Permissions.NOTIFICATIONS);
  }

}

class Program extends React.Component {



  listenForNotifications = () => {
    Notifications.addListener(notification => {
      console.log("listen notification");
      console.log(notification);
      console.log(Platform);
      debugger;
      if (notification.origin === 'received' && Platform.OS === 'android') {
        Alert.alert(notification.title, notification.body);
      }
    });
  };

  componentWillMount() {
    getAndroidNotificationPermission();
      this.listenForNotifications();
  }

  componentDidMount() {
    const localnotification = {
      title: 'Quiz reminder',
      body: 'This is a reminder that you have not done a quiz ',
      android: {
        sound: true,
      },
      ios: {
        sound: true,
      },
    };

    // get last quiz time
    AsyncStorage.getItem('lastQuizTime').then((lastTime) => {

      var lastTimeMiliseconds = lastTime.getItem();

      var currentMiliseconds = Date.now();

      const diffInHour = (currentMiliseconds - lastTimeMiliseconds) / 60 / 60

      // send notification if more than 24 hours
      if (diffInHour > 24) {
        let sendAfterOneSecond = Date.now();
        sendAfterOneSecond += 1000;

        const schedulingOptions = { time: sendAfterOneSecond };
        Notifications.scheduleLocalNotificationAsync(
          localnotification,
          schedulingOptions
        );
      }
    })
  }

  render() {

    console.disableYellowBox = true;

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

export function getDailyStudyReminder() {
  return {
    today:"Don't forget to study today!"
  }
}

function createNotification() {
  return {
    title:"Study!",
    body: "Don't forget to study today!",
    ios:{
      sound:true,
    },
    android: { 
      sound:true,
      priority: 'high',
      sticky:false,
      vibrate:true
    }

  }
}

export default Program;