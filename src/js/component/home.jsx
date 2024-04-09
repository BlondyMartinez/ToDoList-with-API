import React, { useState }  from "react";
import Note from "./note"
import UserSelect from "./user_list";

const Home = () => {
    const GUEST = {
        name: "Guest",
        id: "guest"
    }

	const [theme, setTheme] = useState('light-theme');
    const [user, setUser] = useState(GUEST);

	const handleClick = () => {
		setTheme(theme === 'light-theme' ? 'dark-theme' : 'light-theme');
    };

	return (
		<div className={`d-flex flex-column align-items-center bg ${theme}`}>
			<div className="d-flex justify-content-between w-100 p-2">
				<UserSelect setUser={setUser} GUEST={GUEST} ></UserSelect>
				<div onClick={handleClick} className="fs-4" role="button"> 
					{theme == 'light-theme' ? <i className="fa-solid fa-moon"></i> : <i className="fa-solid fa-sun"></i>} 
				</div>
			</div>
			<h1 className="text-center mt-5">todos</h1>
			<Note user={user} theme={theme} />
		</div>
	);
};

export default Home;
