import React, { useState, useEffect } from "react";
import CurrentUser from "./current_user";
import NewUser from "./new_user";

const Header = (props) => {
    const { user, setUser, theme, setTheme, GUEST } = props;

    const [users, setUsers] = useState([]);
    
	function getUserList() {
        fetch("https://playground.4geeks.com/todo/users?offset=0&limit=100")
        .then(resp => { return resp.json(); })
        .then(data => { if (data && data.users) setUsers([GUEST, ...data.users]); })
        .catch(error => { console.log(error); });
    }

    function getSelectedUser(value, newUser = false) {
        if (value === `${GUEST.name}_${GUEST.id}`) setUser(GUEST);
        else {
            const userName = newUser ? value : value.split("_")[0];
            fetch(`https://playground.4geeks.com/todo/users/${userName}`)
            .then(resp => { return resp.json(); })
            .then(data => { setUser(data) })
            .catch(error => { console.log(error); });
        }
    }

    useEffect(() => { getUserList(); }, []);
    

	const handleClick = () => {
		setTheme(theme === 'light-theme' ? 'dark-theme' : 'light-theme');
    };

    return (
        <div className="header d-flex justify-content-center w-100 p-2">
            <div className="col-4"><CurrentUser user={user} users={users} getSelectedUser={getSelectedUser}></CurrentUser></div>
            <div onClick={handleClick} className="col-4 fs-4 px-4 text-center" role="button"> 
                {theme == 'light-theme' ? <i className="fa-solid fa-moon"></i> : <i className="fa-solid fa-sun"></i>} 
            </div>
            <div className="col-4 me-auto"><NewUser users={users} getUserList={getUserList} getSelectedUser={getSelectedUser} theme={theme} /></div>
        </div>
    );
}

export default Header;