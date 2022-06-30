import { Cancel, Room } from "@material-ui/icons";
import axios from "axios";
import { useRef, useState } from "react";
import "./login.css";

export default function Login({ setShowLogin, setCurrentUsername, myStorage }) {
    const [error, setError] = useState(false);
    const usernameRef = useRef();
    const passwordRef = useRef();
    const [showSuccessfully, setShowSuccessfully] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        };
        try {
            const res = await axios.post("/users/login", user);
            setCurrentUsername(res.data.username);
            myStorage.setItem('user', res.data.username);
            setShowSuccessfully(true);
        } catch (err) {
            setError(true);
        }
    };

    return (
        <div>
            <div className="loginContainer">
                <span className='loginHeader'>Login</span>
                <div className='content'>
                    <span className='emailHeader'>Username</span>
                    <input className='input' type="text"
                        autoFocus placeholder="username" ref={usernameRef} />
                    <span className='passwordHeader'>Password</span>
                    <input className='input' type="password"
                        min="6"
                        placeholder="password"
                        ref={passwordRef} />
                    <div style={{ display: "flex", justifyContent: "right" }}>
                        <button className='loginBtn' type="submit" onClick={handleSubmit}>
                            LOG IN</button>
                    </div>
                </div>
                <Cancel className="close" onClick={() => setShowLogin(false)} />
            </div>
            {error &&
                <span className="failure">Something went wrong!</span>
            }

            {showSuccessfully &&
                <div className='alert'>
                    <span class="close" onClick={() => setShowSuccessfully(false)}>&times;</span>
                    You Successfully Logged in.😊
                </div>
            }

        </div>
    );
}