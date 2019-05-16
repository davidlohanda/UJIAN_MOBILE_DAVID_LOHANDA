import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from "react-native";



class HomeMenuScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.homeTitle}>Main Menu</Text>
                </View>
                <View style={styles.menuMainContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('EmployeeList')} style={styles.menuContainer1}>
                        <View>
                            <Image style={{height : 50, width : 50}} source={{uri : 'http://simpleicon.com/wp-content/uploads/list.png'}}/>
                        </View>
                        <Text style={styles.menuText}>Employee List</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AddEmployee')} style={styles.menuContainer1}>
                        <View>
                            <Image style={{height : 50, width : 50}} source={{uri : 'https://cdn4.iconfinder.com/data/icons/vectory-personnel-2/40/user_add-512.png'}}/>
                        </View>
                        <Text style={styles.menuText}>Add Employee</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.menuMainContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('EditEmployee')} style={styles.menuContainer2}>
                        <View>
                            <Image style={{height : 50, width : 50}} source={{uri : 'https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/new-24-512.png'}}/>
                        </View>
                        <Text style={styles.menuText}>Edit Employee</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('DeleteEmployee')} style={styles.menuContainer2}>
                        <View>
                            <Image style={{height : 50, width : 50}} source={{uri : 'https://image.flaticon.com/icons/png/512/61/61848.png'}}/>
                        </View>
                        <Text style={styles.menuText}>Delete Employee</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
export default HomeMenuScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor : '#192a56'
    },

    menuMainContainer : {
        height : 180,
        width : 300,
        marginVertical : 15,
        flexDirection : 'row',
        justifyContent : 'center',
    },

    menuContainer1 : {
        height : 130,
        width : 130,
        backgroundColor : '#fff',
        marginTop : 49,
        marginHorizontal : 15,
        justifyContent : 'center',
        alignItems : 'center'
    },

    menuContainer2 : {
        height : 130,
        width : 130,
        backgroundColor : '#fff',
        marginHorizontal : 15,
        justifyContent : 'center',
        alignItems : 'center'
    },

    menuText : {
        fontSize : 16,
        marginTop : 15,
        color : '#192a56'
    },

    homeTitle : {
        fontSize : 25,
        color : '#fff'
    }
});