import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class EmployeeDetailScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>EmployeeDetailScreen</Text>
            </View>
        );
    }
}
export default EmployeeDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});