import React, { Component } from 'react';
import {TouchableOpacity, View, StyleSheet,Alert} from 'react-native'
import { Container, Content, List, ListItem, Text, Left, Right, Body ,Title } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome'
import {connect} from 'react-redux'
import {Fire} from '../3.support/FIrebase'

class DeleteEmployeeScreen extends Component {
  state = {
      data : []
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

  onDeleteClick = (id) => {
    Alert.alert('Delete Data', `Are you sure to delete ${this.state.data[id].name}?`, [
      {text : 'yes' ,
       onPress : () => {
         Fire.database().ref(`database/${this.props.user.uid}/employee/${id}`).remove()
       }
      },
      {text : 'cancel'}
    ])
  }

    render() {
    return (
      <Container>
          <View style={styles.titleContainer}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{position : 'absolute', left : 15, top : 23}}>
              <Icon color="#fff" name="arrow-left" size={20}/>
            </TouchableOpacity>
            <Text style={styles.titleText}>Delete Employee</Text>
          </View>
        <Content>
          <List>
            { this.state.data !== null?
                Object.keys(this.state.data).map((val) => {
                    return (
                        <ListItem>
                            <Left>
                                <Text style={{fontSize : 16}}>{this.state.data[val].name}</Text>
                            </Left>
                            <Right>
                                <TouchableOpacity onPress={()=>this.onDeleteClick(val)}>
                                    <Icon name="times" size={16}/>
                                </TouchableOpacity>
                            </Right>
                        </ListItem>
                    )
                })
            :null}
          </List>
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

export default connect(mapStateToProps)(DeleteEmployeeScreen)


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