import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'
import Communications from 'react-native-communications';











class EmployeeDetail extends Component {    
    sendMessage = () => {
        const body = `Hello ${this.props.navigation.getParam('nama')} , Your Upcoming shift is on ${this.props.navigation.getParam('shift')}`
        Communications.textWithoutEncoding(this.props.navigation.getParam('phone') , body )       
    }
    
    render() {
        const {getParam} = this.props.navigation        
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{position : 'absolute', left : 15, top : 23}}>
                    <Icon color="#fff" name="arrow-left" size={20}/>
                </TouchableOpacity>
                <Text style={styles.titleText}>Detail</Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.contentText}>Name : {getParam('nama')}</Text>
                    <Text style={styles.contentText}> Shift : {getParam('shift')}</Text>
                    <Text style={styles.contentText}>Phone : {getParam('phone')}</Text>
                </View>
                <TouchableOpacity onPress={this.sendMessage}>
                    <View style={{backgroundColor : '#192a56' , marginTop : 50, justifyContent : 'center', alignItems : 'center', height : 40, width : 200, marginLeft : 110}}>
                        <Text style={{fontSize : 18 , color : '#fff'}}>Send Message</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
export default EmployeeDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
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

    content : {
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : 80,
    },

    contentText : {
        fontSize : 20,
        color : '#192a56',
        marginTop : 50
    }
});