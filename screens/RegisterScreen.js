import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import {StackActions,NavigationActions} from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import {Fire} from '../3.support/FIrebase'
import {connect} from 'react-redux'
import {onLoginSuccess} from '../2.actions'


class RegisterScreen extends Component {
    state = {password : '' , confirmPassword : '', error : '', loading : false}

    componentDidUpdate(){
        //harus ada pengondisian kalo enggak infinite loop
        if(this.props.user.email !== ''){
            const resetAction = StackActions.reset({
                index : 0,
                actions : [NavigationActions.navigate({routeName : 'Home'})]
            })
            this.props.navigation.dispatch(resetAction)
        }
    }

    onBtnRegisterClick = () => {
        if(this.inputEmail && this.state.password && this.state.confirmPassword){
            if(this.state.password === this.state.confirmPassword){
                this.setState({loading : true})
                const registerAuth = Fire.auth()
                registerAuth.createUserWithEmailAndPassword(this.inputEmail , this.state.confirmPassword)
                .then((val) => {
                    const {email,uid} = val.user
                    console.log(uid)
                    this.props.onLoginSuccess(email , uid)
                })
                .catch((err) => {
                    this.setState({error : err.message , loading : false})
                    console.log(err)
                })
            }else{
                this.setState({error : `Password didn't match`})
            }
        }else{
            this.setState({error : 'Please fill all the requirement!'})
        }
    }

    render() {
        const confirmStyle = this.state.confirmPassword === ''?
        <View style={styles.inputContainer2}>
            <TextInput secureTextEntry={true} onChangeText={(val) => this.setState({confirmPassword : val})} style={styles.registerInput} placeholderTextColor="#fff" placeholder="confirm password"/>
        </View> : this.state.confirmPassword === this.state.password?
        <View style={styles.inputContainer2}>
            <TextInput secureTextEntry={true}  onChangeText={(val) => this.setState({confirmPassword : val})} style={{width: 250,fontSize : 16 , color : '#fff'}} placeholderTextColor="#fff" placeholder="confirm password"/>
            <Icon name="check-circle" size={20} color="green"/>
        </View> 
        :<View style={styles.inputContainer2}>
            <TextInput secureTextEntry={true} onChangeText={(val) => this.setState({confirmPassword : val})} style={{width: 250,fontSize : 16  ,color : '#fff'}} placeholderTextColor="#fff" placeholder="confirm password"/>
            <Icon name="times-circle" size={20} color="red"/>
        </View> 
        
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Register</Text>
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.inputContainer2}>
                        <TextInput onChangeText={(email) => this.inputEmail = email}  style={styles.registerInput}  placeholderTextColor="#fff" placeholder="email"/>
                    </View>
                    <View style={styles.inputContainer2}>
                        <TextInput secureTextEntry={true} onChangeText={(val) => this.setState({password : val})} style={styles.registerInput} placeholderTextColor="#fff" placeholder="password"/>
                    </View>
                    {confirmStyle}
                </View>
                <View>
                    <TouchableOpacity onPress={this.onBtnRegisterClick}>
                        <View style={styles.registerButton}>
                            {this.state.loading?<ActivityIndicator size="small" color="#192a56"/> : <Text style={styles.registerButtonText}>Register</Text>}
                        </View>
                    </TouchableOpacity>
                </View>
                
                
                {this.state.error?
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{this.state.error}</Text>
                    <Icon name="times-circle" size={20} color="red" onPress={() => this.setState({error : ''})}/>
                </View> 
                : null}

                <View style={styles.registerTextContainer}>
                    <Text style={styles.registerText}>Already have account ? </Text>
                    <Text onPress={()=>this.props.navigation.navigate('Login')} style={styles.registerText}> Login</Text>
                </View>
            </View>
        );
    }
}


const mapStateToProps = (state) => {
    return{
        user : state.auth
    }
}

export default connect(mapStateToProps , {onLoginSuccess})(RegisterScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor : '#192a56'
    },

    titleContainer : {

    },

    titleText : {
        color : '#fff',
        fontSize : 25
    },

    inputContainer : {
        marginTop : 60
    },

    registerInput : {
        fontSize : 16,
        color : '#fff'
    },

    inputContainer2 : {
        borderBottomWidth : 1,
        borderBottomColor : '#fff',
        marginBottom : 15,
        width : 270,
        height : 40,
        flexDirection : 'row'
    },

    registerButton : {
        backgroundColor : '#fff',
        width : 270,
        height : 30,
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : 10
    },
    
    registerButtonText : {
        fontSize : 16,
        color : '#192a56'
    },
    registerTextContainer : {
        flexDirection : 'row',
        marginTop : 70
    },

    registerText : {
        color : '#fff',
        fontSize : 16
    },

    errorContainer : {
        flexDirection : 'row',
        height : 40,
        width : 350,
        borderWidth : 1,
        borderColor : 'red',
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : 40,
        padding : 15
    },

    errorText : {
        fontSize : 16,
        color : 'red',
        flex : 1
    }
});