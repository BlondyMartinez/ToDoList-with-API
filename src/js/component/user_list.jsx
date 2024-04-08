import React, { useState, useEffect } from "react";

const UserSelect = (props) => {
    const { user, setUser, GUEST } = props;
    const [users, setUsers] = useState([]);

    function fetchData() {
        fetch("https://playground.4geeks.com/todo/users?offset=0&limit=100")
        .then(resp => { return resp.json(); })
        .then(data => { if (data && data.users) setUsers([GUEST, ...data.users]); })
        .catch(error => { console.log(error); });
    }

    useEffect(() => { fetchData(); }, []);

	return (
        <div className="d-flex justify-content-center align-items-center">
            <label htmlFor="user-select" className="form-label user">User</label>
            <select 
                className="form-select" 
                aria-label="User list" 
                id="user-select"
                value={user} 
                onChange={(e) => setUser(e.target.value)}
            >
                {users.map((user) => (
                    <React.Fragment key={user.id}>
                        <option value={user.name}>{user.name}</option>
                    </React.Fragment>
                ))}
            </select>
        </div>
	);
};

export default UserSelect;