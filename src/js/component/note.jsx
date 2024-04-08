import React, { useState } from "react";
import Task from "./task";

const Note = () => {
    const [inputValue, setInputValue] = useState('');
    const [tasks, setTasks] = useState([]);

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && inputValue.trim() !== "") {
            const newTask = {
                text: inputValue.trim(),
                id: new Date()
            }

            setTasks([newTask, ...tasks]);

            setInputValue(""); 
        }
    };

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

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
                        <Task task={task.text} id={task.id} tasks={tasks} setTasks={setTasks} />
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