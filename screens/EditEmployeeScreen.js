import React, { Component } from 'react';
import { Button,Container, Content, Form, Item, Input, Label, Picker, Left , Right, Text } from 'native-base';
import {View,StyleSheet,TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {connect} from 'react-redux'
import {Fire} from '../3.support/FIrebase'

class EditEmployee extends Component {
    state = {
        data : [] , phone : '' , name : '' , selected : null, idEdit : null
    }
  
    componentDidMount (){
      const db = Fire.database()
      const list = db.ref(`database/${this.props.user.uid}/employee`)
      list.on('value' , (items) => {
        console.log(items.val())
        this.setState({data : items.val()})
      } , (err) => {
        console.log(err)
      })
    }

    onEditEmployee = (id) => {
        const db = Fire.database()
        const edit = db.ref(`database/${this.props.user.uid}/employee/${this.state.idEdit}`)
        edit.set({
            name : this.state.name?this.state.name : this.state.data[this.state.idEdit].name,
            phone : this.state.phone?this.state.phone : this.state.data[this.state.idEdit].phone ,
            shift : this.state.selected? this.state.selected : this.state.data[this.state.idEdit].shift
        })
        .then((res) => {
            alert('Edit Success')
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render() {
    return (
      <Container>
            <View style={styles.titleContainer}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{position : 'absolute', left : 15, top : 23}}>
                <Icon color="#fff" name="arrow-left" size={20}/>
                </TouchableOpacity>
                <Text style={styles.titleText}>Edit Employee</Text>
            </View>
        <View style={{marginHorizontal : 13,flexDirection : 'row', justifyContent : 'space-between'}}>
            <View>
                <Text style={{paddingTop : 15}}>Selected Data</Text>
            </View>
            <View>
                <Picker mode="dropdown" style={{width : 120}} onValueChange={(value)=>this.setState({idEdit : value})} selectedValue={this.state.idEdit}>
                    <Picker.item label="Select Name" value={null}/>
                    {this.state.data !== null?
                    Object.keys(this.state.data).map((val) => {
                        return(
                            <Picker.Item label={this.state.data[val].name} value={val}/>
                        )
                    }) : 
                    <Picker.item label="-" value={null}/>}
                </Picker>
            </View>
        </View>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Name</Label>
              <Input defaultValue={this.state.idEdit?this.state.data[this.state.idEdit].name : null} onChangeText={(val) => this.setState({name : val})} />
            </Item>
            <Item stackedLabel last>
              <Label>Phone</Label>
              <Input defaultValue={this.state.idEdit?this.state.data[this.state.idEdit].phone : null} onChangeText={(val) => this.setState({phone : val})} />
            </Item>
            <Item style={{flexDirection : 'row', alignItems : 'flex-end'}}>
                <Text>Select Day</Text>    
                
                <Right>
                    <Picker mode="dropdown" style={{width : 120}}  selectedValue={this.state.idEdit && this.state.selected === null?this.state.data[this.state.idEdit].shift : this.state.selected?this.state.selected : null} onValueChange={(value) => this.setState({selected : value})}>
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
          <Button onPress={this.onEditEmployee} style={{marginHorizontal : 13, marginTop : 50, backgroundColor : '#192a56'}} block>
                <Text>Save</Text>
          </Button>
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

export default connect(mapStateToProps)(EditEmployee)

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
    }
})