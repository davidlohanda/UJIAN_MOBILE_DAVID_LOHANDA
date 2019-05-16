import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'
import {Fire} from '../3.support/FIrebase/index'
import {connect} from 'react-redux'
import {onLoginSuccess} from '../2.actions'
import {StackActions , NavigationActions} from 'react-navigation'


class AccountScreen extends Component{
    onLogoutPress = () => {
        Fire.auth().signOut()
        .then((val) => {
            this.props.onLoginSuccess(email="",uid="")
            const resetAction = StackActions.reset({
                index : 0,
                actions : [NavigationActions.navigate({routeName : 'Login'})]
            })
            this.props.navigation.dispatch(resetAction)
        })
        .catch((err) => console.log(err))
    }
    
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{position : 'absolute', left : 15, top : 20}}>
                    <Icon color="#fff" name="arrow-left" size={20}/>
                    </TouchableOpacity>
                    <Text style={styles.titleText}>Account</Text>
                </View>
                <View style={styles.menuContainer}>
                    <TouchableOpacity  onPress={this.onLogoutPress}>
                        <View style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>Logout</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
export default connect(null,{onLoginSuccess})(AccountScreen);

const styles = StyleSheet.create({
    container : {
        backgroundColor : '#192a56',
        flex : 1
    },
    
    titleContainer : {
        flexDirection : 'row',
        justifyContent : 'center',
        height : 60,
        backgroundColor : '#192a56',
        alignItems : 'center'
    },

    titleText : {
        color : '#fff',
        fontSize : 20
    },
    menuContainer : {
        height : 400,
        backgroundColor : '#192a56',
        justifyContent : 'center',
        alignItems : 'center',
        flex : 1
    },

    buttonContainer : {
        backgroundColor : '#fff', 
        height : 40, 
        width : 280, 
        justifyContent : 'center', 
        alignItems : 'center'
    },

    buttonText : {
        color : '#192a56', 
        fontSize : 16
    }
})