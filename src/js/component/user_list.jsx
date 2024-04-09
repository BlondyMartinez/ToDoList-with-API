import React, { useState, useEffect } from "react";

const UserSelect = (props) => {
    const { setUser, GUEST } = props;
    const [users, setUsers] = useState([]);

    function getUserList() {
        fetch("https://playground.4geeks.com/todo/users?offset=0&limit=100")
        .then(resp => { return resp.json(); })
        .then(data => { if (data && data.users) setUsers([GUEST, ...data.users]); })
        .catch(error => { console.log(error); });
    }

    function getSelectedUser(value) {
        if (value === `${GUEST.name}_${GUEST.id}`) setUser(GUEST);
        else {
            const userName = value.split("_")[0];
            fetch(`https://playground.4geeks.com/todo/users/${userName}`)
            .then(resp => { return resp.json(); })
            .then(data => { setUser(data) })
            .catch(error => { console.log(error); });
        }
    }

    useEffect(() => { getUserList(); }, []);

	return (
        <div className="row">
            <div className="col-auto"><label htmlFor="user-select" className="form-label user">User</label></div>
            <div className="col-auto">
                <select 
                    className="form-select" 
                    aria-label="User list" 
                    id="user-select"
                    onChange={(e) => getSelectedUser(e.target.value)}
                >
                    {users.map((user) => (
                        <React.Fragment key={user.id}>
                            <option value={`${user.name}_${user.id}`}>{user.name}</option>
                        </React.Fragment>
                    ))}
                </select>
            </div>
        </div>
	);
};

export default UserSelect;