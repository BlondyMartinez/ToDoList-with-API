import React, { useState } from "react";

const NewUser = (props) => {
    const { users, getUserList, getSelectedUser, theme } = props;

    const [userName, setUserName] = useState('');
    const [validUsername, setValidUsername] = useState(null);

    const handleChange = (event) => {
        const username = event.target.value.trim();
        setUserName(username);
        validateUsername(username);
    };

    function validateUsername(username) {
        const isUsernameTaken = users.some(user => user.name === username);
        setValidUsername(!isUsernameTaken);
    }

    async function createUser() {
        if (validUsername) {
            const user = { "name": userName };
    
            try {
                await fetch(`https://playground.4geeks.com/todo/users/${userName}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                });
    
                await getUserList(); 
                await getSelectedUser(userName, true); 
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className="d-flex align-items-center justify-content-center">
            <button type="button" className="btn new-user" data-bs-toggle="modal" data-bs-target="#staticBackdrop">New User</button>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header modal-bg">
                            <h5 className="modal-title" id="staticBackdropLabel">New User</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body modal-bg">
                            <label htmlFor="input-username" className="form-label">Choose username:</label>
                            <input 
                            type="text" 
                            className="form-control input-text" 
                            id="input-username" 
                            placeholder="Username" 
                            onChange={handleChange}
                            />
                            {userName != '' && 
                                <div 
                                    id="passwordHelpBlock" 
                                    className={`form-text ${validUsername ? "text-success" : theme == "light-theme" ? "text-danger" : "text-warning"}`}
                                >
                                    {validUsername ? "Valid username" : "Username already exists"}
                                </div>}
                        </div>
                        <div className="modal-footer modal-bg">
                            <button 
                                type="button" 
                                className="btn create-btn" 
                                onClick={createUser} 
                                disabled={!validUsername} 
                                data-bs-dismiss="modal"
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewUser;