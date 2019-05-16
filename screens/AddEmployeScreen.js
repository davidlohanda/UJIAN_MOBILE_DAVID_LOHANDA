import React, { Component } from 'react';
import {View,StyleSheet,TouchableOpacity} from 'react-native'
import { Button,Container, Content, Form, Item, Input, Label, Picker, Left , Right, Text } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome'
import {Fire} from '../3.support/FIrebase'
import {connect} from 'react-redux'




class AddEmployeeScreen extends Component {
    state={selected : 'Sunday' , name : '' , phone : '', error : ''}

    addEmployee = () => {
      if(this.state.name && this.state.phone){
        const db = Fire.database()
        var add = db.ref(`database/${this.props.user.uid}/employee`)
        add.push({
          name : this.state.name,
          shift : this.state.selected,
          phone : this.state.phone
        })
        .then((res) => {
          alert('Success Added')
          this.setState({name : '', phone : '', selected : 'Sunday'})
        })
        .catch((err) => {
          console.log(er)
        })

      }else {
        this.setState({error : 'Please fill all the requirement!'})
      }
    }

    render() {
    return (
      <Container>
          <View style={styles.titleContainer}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{position : 'absolute', left : 15, top : 23}}>
              <Icon color="#fff" name="arrow-left" size={20}/>
            </TouchableOpacity>
            <Text style={styles.titleText}>Add Employee</Text>
          </View>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Name</Label>
              <Input value={this.state.name} onChangeText={(val) => this.setState({name : val})} />
            </Item>
            <Item floatingLabel last>
              <Label>Phone</Label>
              <Input value={this.state.phone} onChangeText={(val) => this.setState({phone : val})} />
            </Item>
            <Item style={{flexDirection : 'row', alignItems : 'flex-end'}}>
                <Text>Select Day</Text>    
                
                <Right>
                    <Picker mode="dropdown" style={{width : 120}} selectedValue={this.state.selected} onValueChange={(value) => this.setState({selected : value})}>
                        <Picker.Item label="Sunday" value="Sunday"/>
                        <Picker.Item label="Monday" value="Monday"/>
                        <Picker.Item label="Tuesday" value="Tuesday"/>
                        <Picker.Item label="Wednesday" value="Wednesday"/>
                        <Picker.Item label="Thursday" value="Thursday"/>
                        <Picker.Item label="Friday" value="Friday"/>
                        <Picker.Item label="Saturday" value="Saturday"/>
                    </Picker>
                </Right>
                
            </Item>
          </Form>
          <Button onPress={this.addEmployee} style={{marginHorizontal : 13, marginTop : 50, backgroundColor : '#192a56'}} block>
                <Text>Submit</Text>
          </Button>
          {this.state.error?
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{this.state.error}</Text>
                <Icon name="times-circle" size={20} color="red" onPress={() => this.setState({error : ''})}/>
            </View> 
        : null}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    user : state.auth
  }
}

export default connect(mapStateToProps)(AddEmployeeScreen)

const styles = StyleSheet.create({
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

    errorContainer : {
      flexDirection : 'row',
      height : 40,
      width : 350,
      borderWidth : 1,
      borderColor : 'red',
      justifyContent : 'center',
      alignItems : 'center',
      padding : 15,
      marginTop : 40,
      marginLeft : 40
  },

  errorText : {
      fontSize : 16,
      color : 'red',
      flex : 1
  }
})