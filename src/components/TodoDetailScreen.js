import React from 'react'
import { Text } from 'react-native'
import { View, Container, Content, Card, CardItem, H1, Button, Body } from 'native-base'
import firebase from 'firebase'
import {useDispatch} from 'react-redux'

const TodoDetailScreen = props => {

    const dispatch = useDispatch()

    const onDeleteTodo = (id) => {
        console.log(id)
        firebase.database().ref(`/${id}`).remove().then(()=>{
            props.navigation.goBack()
            firebase.database().ref('/').on('value', snapshot => {
                // console.log(snapshot.val())
                // console.log(Object.values(snapshot.val()))
                // console.log(todoData)
                dispatch({
                    type: 'FILL_TODO',
                    payload: Object.values(snapshot.val())
                })
            })
        })
    }


    return (
        <Container>
            {/* <Content> */}
                <Card style={{ marginTop: '50%' }}>
                <CardItem header>
                        <Body>
                            <H1>
                                Todo: {props.navigation.getParam('todo', 'NO_DATA')}
                            </H1>
                            <Text>
                                ID: {props.navigation.getParam('id', 'NO_DATA')}
                            </Text>
                        </Body>
                    </CardItem>
                    <CardItem>
                        <Text>
                            Status: {props.navigation.getParam('status', 'NO_DATA')}
                        </Text>
                    </CardItem>
                    <CardItem>
                        <Text>
                            Date Created: {props.navigation.getParam('dateCreated', 'NO_DATA')}
                        </Text>
                    </CardItem>
                    <CardItem>
                        <Text>
                            Date Completed: {props.navigation.getParam('dateCompleted', 'NO_DATA')}
                        </Text>
                    </CardItem>

                    <CardItem>
                        <Button onPress={() => props.navigation.navigate('TodoListScreen')}>
                            <Text>Go Back </Text>
                        </Button>
                        <Button onPress={()=>{onDeleteTodo(props.navigation.getParam('id', 'NO_DATA'))}} style={{marginLeft:5, backgroundColor:"red"}} >
                            <Text> Delete </Text>
                        </Button>   
                    </CardItem>
                </Card>
            {/* </Content> */}
        </Container>
    )
}

export default TodoDetailScreen