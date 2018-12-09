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
        const {viewStyle} = styles;

        return(
        <TouchableOpacity style={viewStyle} onPress={this.deckSelected.bind(this)} >
          <Text >
            {this.props.title}
          </Text>
        </TouchableOpacity>
        )
    }
}

const styles = {
    viewStyle: {
        backgroundColor:'#F8F8F8',
        justifyContent: 'center', //up or down
        alignItems: 'center',
        height: 60,
        paddingTop:0,
        shadowColor: '#000',
        position: 'relative',       
        marginBottom: 5,
        marginTop:5
    },
    textStyle: {
        fontSize:35
    }
}

// function mapDispatchToProps(dispatch){
    
//     return bindActionCreators({selectDeck}, dispatch)
// }

//export default connect(null, )(withNavigation(DeckItem))
export default withNavigation(DeckItem)