import React, {Component} from 'react';
import { Text, View, TouchableOpacity} from 'react-native';
import { withNavigation } from 'react-navigation';
//import { connect } from 'react-redux';
//import { bindActionCreators } from '../../../../../../../AppData/Local/Microsoft/TypeScript/3.1/node_modules/redux';

class DeckItem extends Component {
    
    
    deckSelected(e){
        e.preventDefault();
        this.props.onClick();
        this.props.navigation.navigate('DeckDetail')
    }
    
    
    render(){
        const {viewStyle, view} = styles;

        return(
        <View style={view}>
            <TouchableOpacity style={viewStyle} onPress={this.deckSelected.bind(this)} >
            <Text >{this.props.title}</Text>      
            <Text>{this.props.cardCount} {this.props.cardCount === 1 ? 'card' : 'cards'}</Text>
            </TouchableOpacity>
        </View>
        )
    }
}

const styles = {
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
    },
    textStyle: {
        fontSize:35
    },
    style: {
        padding:20,
        flex: 1
    }
}

export default withNavigation(DeckItem)