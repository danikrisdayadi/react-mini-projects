import React, { useState } from 'react';

import {Form, Button, Col} from 'react-bootstrap'

const initialTask = {
    name: '',
    status: ''
}

function Home() {
    const [taskList, setTaskList] = useState([])
    const [task, setTask] = useState(initialTask)
    const handleChange = (e) => {
        setTask({name: e.target.value, status: "incomplete"})
    }
    const handleSubmit = () => {
        taskList.push(task)
        setTaskList(taskList)
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
                {taskList.map( (taskItem, index) => {
                    return(<li key={index}>{taskItem.name}</li>)
                })}
            </ul>
        </div>
        
    )
}

export default Home;