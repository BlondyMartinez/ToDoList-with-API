import React, { useState }  from "react";
import Note from "./note"
import Header from "./header";

const Home = () => {
    const GUEST = {
        name: "Guest",
        id: "guest"
    }

	const [theme, setTheme] = useState('light-theme');
    const [user, setUser] = useState(GUEST);

	return (
		<div className={`d-flex flex-column align-items-center bg ${theme}`}>
			<Header user={user} setUser={setUser} theme={theme} setTheme={setTheme} GUEST={GUEST} />
			<h1 className="text-center mt-5">todos</h1>
			<Note user={user} theme={theme} />
		</div>
	);
};

export default Home;
