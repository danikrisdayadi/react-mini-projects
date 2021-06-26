import React, { useState, useEffect } from 'react';

import {Form, Button, Col} from 'react-bootstrap'
import { connect } from 'react-redux';

const initialTask = {
    name: '',
    status: ''
}

const addTask = (message) => {
    return {
        type: "ADD",
        message: message
    }
}

const editTask = (newList) => {
    return {
        type: "EDIT",
        message: newList
    }
}

function Home(props) {
    const [task, setTask] = useState(initialTask)
    const [messagesList, setmessagesList] = useState(props.messages)

    useEffect(() => {
        setmessagesList(props.messages)
    }, [props.messages])

    const handleChange = (e) => {
        setTask({name: e.target.value, status: "incomplete"})
    }
    const handleSubmit = () => {
        props.submitTask(task)
        setTask(initialTask)
    }
    const handleChangeStatus = (e) => {
        let newArray = [...props.messages]
        newArray[e.target.id].status = "complete"
        props.changeTask(newArray)
    }
    return(
        <div>
            <h1>Todo List Practise</h1>
            <Form>
                <Form.Row>
                    <Col xs="auto">
                        <Form.Label srOnly>Add Task</Form.Label>
                    </Col>
                    <Col xs="2">
                        <Form.Control value={task.name} type="text" placeholder="Enter new task" onChange={handleChange}/>
                    </Col>
                    <Col>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </Col>
                </Form.Row>
            </Form>
            <ul>
                {messagesList.map( (taskItem, index) => {
                    return(<li id={index} key={index} onClick={handleChangeStatus} style={taskItem.status === "complete" ? {textDecoration: "line-through"} : null}>{taskItem.name}</li>)
                })}
            </ul>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitTask: (task) => {
            dispatch(addTask(task))
        },
        changeTask: (task) => {
            dispatch(editTask(task))
        }
    }
};

const mapStateToProps = (state) => {
    return {
        messages: state
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);