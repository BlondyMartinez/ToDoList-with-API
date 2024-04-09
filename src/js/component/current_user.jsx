import React, { useState, useEffect } from "react";

const CurrentUser = (props) => {
    const { user,  users, getSelectedUser } = props;
    const [selectedValue, setSelectedValue] = useState(`${user.name}_${user.id}`);

    useEffect(() => {
        setSelectedValue(`${user.name}_${user.id ? user.id : ''}`);
    }, [user]);

	return (
        <div className="row d-flex align-items-center justify-content-center g-1">
            <div className="col-auto fw-bold ps-2">Current user:</div>
            <div className="col-auto">
                <select 
                    className="form-select" 
                    aria-label="User list" 
                    id="user-select"
                    value={selectedValue}
                    onChange={(e) => getSelectedUser(e.target.value)}
                >
                    {users.map((user) => (
                        <option key={user.id} value={`${user.name}_${user.id === "guest" ? 'guest' : ''}`}>{user.name}</option>
                    ))}
                </select>
            </div>
        </div>
	);
};

export default CurrentUser;