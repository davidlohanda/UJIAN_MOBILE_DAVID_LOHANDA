import React, { Component } from 'react';
import {View,Text,StyleSheet,Image,TextInput,TouchableOpacity,ActivityIndicator} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {Fire} from '../3.support/FIrebase'
import {connect} from 'react-redux'
import {onLoginSuccess} from '../2.actions'
import {StackActions , NavigationActions} from 'react-navigation'


class LoginScreen extends Component {
    state = {email : '' , password : '' , error : '', loading : false , loadingScreen : true}

    componentDidMount(){
        //buat ngecek usernya masih login apa engga
        Fire.auth().onAuthStateChanged((user) => {  
         if(user){
            this.props.onLoginSuccess(user.email,user.uid)
         }else{
            this.setState({loadingScreen : false})
         }
        })
    }

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


    onBtnLoginCLick = () => {
        if(this.state.email && this.state.password){
            this.setState({loading : true})
            const loginAuth = Fire.auth()
            loginAuth.signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((val) => {
                this.props.onLoginSuccess(val.user.email,val.user.uid)

            })
            .catch((err) => {
                this.setState({error : err.message, loading : false})
            })
        }else{
            this.setState({error : 'Please fill all the requirement!'})
        }
    }

    render() {
    if(this.state.loadingScreen){
        return(
            <View style={{justifyContent : 'center' , alignItems : 'center', flex : 1, backgroundColor : '#192a56'}}>
                <ActivityIndicator size="large" color = '#fff'/>
            </View>       
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <View>
                    <Image style={{height : 150 , width : 150}} source={{uri:'https://www.finfit.com/FinFit_files/people-workers.png'}}/>
                </View>
                <View>
                    <Text style={styles.logoTitle}>Employee Manager</Text>
                </View>
            </View>
            <View style={styles.inputContainer}>
                <View style={styles.inputContainer2}>
                    <TextInput style={styles.loginInput} onChangeText={(email) => this.setState({email : email})}  placeholderTextColor="#fff" placeholder="email"/>
                </View>
                <View style={styles.inputContainer2}>
                    <TextInput secureTextEntry={true} style={styles.loginInput} onChangeText={(val) => this.setState({password : val})} placeholderTextColor="#fff" placeholder="password"/>
                </View>
            </View>
            <View>
                <TouchableOpacity onPress={this.onBtnLoginCLick}>
                    <View style={styles.loginButton}>
                        {this.state.loading?<ActivityIndicator size="small" color="#192a56"/> :<Text style={styles.loginButtonText}>Login</Text>}
                    </View>
                </TouchableOpacity>
            </View>

            {this.state.error?
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{this.state.error}</Text>
                    <Icon name="times-circle" size={20} color="red" onPress={() => this.setState({error : ''})}/>
                </View> 
            : null}

            <View style={styles.socialLoginContainer}>
                <View style={styles.iconContainer}>
                    <Icon color="#fff" name="google" size={22}/>
                </View>
                <View style={styles.iconContainer}>
                    <Icon color="#fff" name="facebook-f" size={22}/>
                </View>
                <View style={styles.iconContainer}>
                    <Icon color="#fff" name="twitter" size={22}/>
                </View>
            </View>
            <View style={styles.registerTextContainer}>
                <Text style={styles.registerText}>Don't have an account ? </Text>
                <Text onPress={()=>this.props.navigation.navigate('Register')} style={styles.registerText}> Register</Text>
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

export default connect(mapStateToProps , {onLoginSuccess})(LoginScreen)

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#192a56',
        justifyContent : 'center',
        alignItems : 'center'
    },

    logoContainer : {
        alignItems : 'center'
    },

    logoTitle : {
        fontSize : 25,
        color : '#fff',
    },

    inputContainer : {
        marginTop : 60
    },

    inputContainer2 : {
        borderBottomWidth : 1,
        borderBottomColor : '#fff',
        marginBottom : 15,
        width : 270,
        height : 40
    },  

    loginInput : {
        fontSize : 16,
        color : '#fff'
    },

    registerTextContainer : {
        flexDirection : 'row',
        marginTop : 30
    },

    registerText : {
        color : '#fff',
        fontSize : 16
    },

    socialLoginContainer : {
        flexDirection : 'row',
        alignItems : 'center',
        marginTop : 70
    },

    iconContainer : {
        marginHorizontal : 15,
        borderWidth : 0.5,
        borderColor : '#fff',
        borderRadius : 20,
        width : 40,
        height : 40,
        alignItems : 'center',
        justifyContent : 'center'
    },

    loginButton : {
        backgroundColor : '#fff',
        width : 270,
        height : 30,
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : 10
    },
    
    loginButtonText : {
        fontSize : 16,
        color : '#192a56'
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
})