import React, { useState } from 'react';

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

function Home(props) {
    const [task, setTask] = useState(initialTask)
    const handleChange = (e) => {
        setTask({name: e.target.value, status: "incomplete"})
    }
    const handleSubmit = () => {
        props.submitTask(task)
        setTask(initialTask)
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
                {props.messages.map( (taskItem, index) => {
                    return(<li key={index}>{taskItem.name}</li>)
                })}
            </ul>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitTask: (task) => {
            dispatch(addTask(task))
        }
    }
};

const mapStateToProps = (state) => {
    return {
        messages: state
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);