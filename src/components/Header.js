import React from 'react';
import {Text, View} from 'react-native';

const Header = ({title}) => {
    const {textStyle, viewStyle} = styles;
    return (
        <View style={viewStyle}>
            <Text style={textStyle}>{title}</Text>
        </View>
    )
}
const styles = {
    viewStyle: {
        backgroundColor:'#F8F8F8',
        justifyContent: 'center', //up or down
        alignItems: 'center',
        height: 70,
        paddingTop:15,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        elevation: 5, 
        position: 'relative'       
    },
    textStyle: {
        fontSize:35
    }
};

export default Header;