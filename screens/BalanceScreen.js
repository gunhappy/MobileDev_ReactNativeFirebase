import React, { Component } from 'react'
import { Text, View, FlatList} from 'react-native'
import { List, ListItem } from "react-native-elements"
import firebase from 'firebase'

class BalanceScreen extends Component {
    static navigationOptions = {
        title: 'Users',
        header: null
    }

    constructor(props) {
        super(props)
        this.state = {
          loading: false,
          data: [],
          error: null,
          refreshing: false
        }
    }

    componentDidMount() {
        this.getUsersFromFirebase()
    }

    getUsersFromFirebase() {
        var self = this
        const userRef = firebase.database().ref('/users')
        userRef.orderByKey().once('value')
        .then(function(data) {
            data.forEach(element => {
                const dataArray = self.state.data
                dataArray.push(element.val().userDetails)
                self.setState({
                    data: dataArray
                })
            });
        })
    }

      
    render() {
        if(this.state.data.length === 0) return <View/>
        return (
            <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
                <FlatList 
                data = {this.state.data}
                renderItem = {
                    ({ item }) => (
                    <ListItem
                        title={`${item.firstname} ${item.lastname}`}
                        subtitle={item.email}
                        containerStyle={{ borderBottomWidth: 0 }}
                    />
                    )
                }
                keyExtractor={item => item.email}
                />
            </List> 
        )
    }
}
export default BalanceScreen;