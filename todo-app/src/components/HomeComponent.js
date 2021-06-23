import React, { useState } from 'react';

import {Form, Button, Col} from 'react-bootstrap'

function Home() {
    const initialTask = {
        name: '',
        status: ''
    }
    
    const [taskList, setTaskList] = useState([{initialTask}])
    const [task, setTask] = useState(initialTask)
    const handleChange = (e) => {
        setTask({name: e.target.value, status: "incomplete"})
    }
    const handleSubmit = () => {
        setTaskList(taskList.push(task))
        setTask(initialTask)
        taskList.map((tasks) => {
            console.log(tasks)
            return null
        })
    }
    return(
        <div>
            <h1>{task.name}</h1>
            <Form>
                <Form.Row>
                    <Col xs="auto">
                        <Form.Label srOnly>Add Task</Form.Label>
                    </Col>
                    <Col xs="2">
                        <Form.Control type="text" placeholder="Enter new task" onChange={handleChange}/>
                    </Col>
                    <Col>
                        <Button type="submit" onClick={handleSubmit}>Submit</Button>
                    </Col>
                </Form.Row>
            </Form>
        </div>
        
    )
}

export default Home;