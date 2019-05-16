import React, { Component } from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native'
import { Container, Content, List, ListItem, Text, Left, Right, Body ,Title } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome'
import {connect} from 'react-redux'
import {Fire} from '../3.support/FIrebase'


class ListEmployeeScreen extends Component {
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

    render() {
    return (
      <Container>
        <View style={styles.titleContainer}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{position : 'absolute', left : 15, top : 23}}>
              <Icon color="#fff" name="arrow-left" size={20}/>
            </TouchableOpacity>
            <Text style={styles.titleText}>List Employee</Text>
        </View>
        <Content>
          <List>
            {this.state.data !== null? 
                Object.keys(this.state.data).map((val) => {
                    return (
                        <ListItem onPress={() => this.props.navigation.navigate('EmployeeDetail' , {
                          nama : this.state.data[val].name,
                          shift : this.state.data[val].shift,
                          phone : this.state.data[val].phone
                        })}>
                            <Left>
                                <Text style={{fontSize : 16}}>{this.state.data[val].name}</Text>
                            </Left>
                            <Right>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('EmployeeDetail' , {
                                  nama : this.state.data[val].name,
                                  shift : this.state.data[val].shift,
                                  phone : this.state.data[val].phone
                                })}>
                                    <Icon name="chevron-right" size={16} />
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

const mapStateToProps  = (state) => {
  return{
    user : state.auth
  }
}

export default connect(mapStateToProps)(ListEmployeeScreen)

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
        fontSize : 18
    }
})