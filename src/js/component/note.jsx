import React, { useEffect, useState } from "react";
import Task from "./task";

const Note = () => {
    const [inputValue, setInputValue] = useState('');
    const [tasks, setTasks] = useState([]);

    const ENDPOINTS = {
        POST: {
            url: 'https://playground.4geeks.com/todo/todos/blondy',
            headers: { "Content-Type": "application/json" }
        },
        DELETE: {
            url: "https://playground.4geeks.com/todo/todos/",
            headers: { 'Accept': 'application/json' }
        },
        GET: {
            url: "https://playground.4geeks.com/todo/users/blondy"
        }
            
    }

    useEffect(() => { fetchData
        () }, []);

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && inputValue.trim() !== "") {
            const task = { "label": inputValue.trim() }
            fetchData
            ("POST", task)
            setInputValue(""); 
        }
    };

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    function fetchData
    (method = 'GET', todos = null) {
        const endpoint = ENDPOINTS[method];
        switch(method) {
            case "POST": 
                fetch(endpoint.url, {
                    method: method,
                    body: JSON.stringify(todos),
                    headers: endpoint.headers
                })
                .then(resp => { return resp.json(); })
                .then(() => { fetchData
                    () })
                .catch(error => { console.log(error); });
                break;
            case "DELETE":
                fetch(`${endpoint.url}${todos}`, {
                    method: method,
                    headers: endpoint.headers
                })
                .then(() => { fetchData
                    () })
                .catch(error => { console.error(error); });
                break;
            default:
                fetch(endpoint.url)
                .then(resp => { return resp.json(); })
                .then(data => { if (data && data.todos) setTasks(data.todos); })
                .catch(error => { console.log(error); });
                break;
        }
    }

	return (
		<div className="col-lg-4  col-sm-11 col-md-8 d-flex flex-column justify-content-center align-items-center">
			<div className="note align-middle w-100 outline" style={{ zIndex: '2' }}>
				<div className="py-2 px-5 border-at-bottom">
                    <input 
                        type="text" 
                        className="form-control border-0 input-text" 
                        id="input-text" 
                        placeholder="What needs to be done?" 
                        onChange={handleChange}
                        onKeyDown={handleKeyDown} 
                        value={inputValue}
                    />
                </div>

                {tasks.map((task) => (
                    <React.Fragment key={task.id}>
                        <Task task={task.label} id={task.id} tasks={tasks} setTasks={setTasks} fetchData={fetchData} />
                    </React.Fragment>
                ))}

				<div className="p-2" style={{ fontSize: '0.8rem' }}>
                    {tasks.length == 0 
                        ? 'No tasks. Add a task.' 
                        : `${tasks.length} ${tasks.length != 1 ? 'items' : 'item'} left.`}
                </div>
			</div>
			<div className="note outline" style={{ width: `95%`, height: '5px', zIndex: '1' }}></div>
			<div className="note outline" style={{ width: `90%`, height: '5px' }}></div>
		</div>
	);
};

export default Note;