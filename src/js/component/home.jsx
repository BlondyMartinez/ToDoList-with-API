import React, { useState }  from "react";
import Note from "./note"

//create your first component
const Home = () => {
	const [theme, setTheme] = useState('light-theme');

	const handleClick = () => {
		setTheme(theme === 'light-theme' ? 'dark-theme' : 'light-theme');
    };

	return (
		<div className={`d-flex flex-column align-items-center bg ${theme}`}>
			<div onClick={handleClick} className="ms-auto m-2 fs-4" role="button"> 
				{theme == 'light-theme' ? <i className="fa-solid fa-moon"></i> : <i className="fa-solid fa-sun"></i>} 
			</div>
			<h1 className="text-center mt-5">todos</h1>
			<Note />
		</div>
	);
};

export default Home;
