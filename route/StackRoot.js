import {createStackNavigator,createBottomTabNavigator,createAppContainer} from 'react-navigation'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import HomeMenuScreen from '../screens/HomeMenuScreen';
import AccountScreen from '../screens/AccountScreen'
import ListEmployeeScreen from '../screens/ListEmployeeScreen'
import AddEmployeeScreen from '../screens/AddEmployeScreen'
import EditEmployeeScreen from '../screens/EditEmployeeScreen'
import DeleteEmployeeScreen from '../screens/DeleteEmployeeScreen'
import EmployeeDetail from '../screens/EmployeeDetail'



const HomeMenu = createStackNavigator({
    HomeScreen : HomeMenuScreen,
    EmployeeList : ListEmployeeScreen,
    EmployeeDetail : EmployeeDetail,
    AddEmployee : AddEmployeeScreen,
    EditEmployee : EditEmployeeScreen,
    DeleteEmployee : DeleteEmployeeScreen
} , {
    headerMode : 'none'
})

HomeMenu.navigationOptions = ({navigation}) => {
    let tabBarVisible = false
    let routeName = navigation.state.routes[navigation.state.index].routeName
    if(routeName === 'HomeScreen'){
        tabBarVisible = true
    }
    return{
        tabBarVisible
    }
}

const HomeTab = createBottomTabNavigator({
    Home : HomeMenu,
    Account : AccountScreen   
} , {
    
    tabBarOptions : {
        activeTintColor: '#192a56',
        labelStyle: {
            fontSize: 16,
        }
    }
})

const StackRoot = createStackNavigator({
    Login : LoginScreen,
    Register : RegisterScreen,
    Home : HomeTab
} , {
    headerMode :'none'
})

export const StackContainer = createAppContainer(StackRoot)