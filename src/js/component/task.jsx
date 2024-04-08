import React, { useState } from "react";

const Task = (props) => {
    const [onHover, setOnHover] = useState(false);

    const removeThis = () => {
        props.fetchData("DELETE", props.id);
    };

	return (
        <div 
        className="py-2 px-5 border-at-bottom d-flex justify-content-between" 
            onMouseEnter={() => { setOnHover(true) }} 
            onMouseOver={() => { setOnHover(true) }} 
            onMouseLeave={() => { setOnHover(false) }}
        >
            <div>{props.task}</div>
            {onHover && <div onClick={removeThis} role="button"><i className="text-danger fa-solid fa-xmark"></i></div>}
        </div>
	);
};

export default Task;