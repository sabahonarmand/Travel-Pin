import { Cancel, Room } from "@material-ui/icons";
import axios from "axios";
import { useRef, useState } from "react";
import "./register.css";

export default function Register({ setShowRegister }) {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [showSuccessfully, setShowSuccessfully] = useState(false);
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handle = async (e) => {
        e.preventDefault();
        const newUser = {
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        try {
            await axios.post("/users/register", newUser);
            setError(false);
            setSuccess(true);
            setShowSuccessfully(true);
        } catch (err) {
            setError(true);
        }
    };
    return (
        <div>
            <div className="registerContainer">
                <span className='loginHeader'>Register</span>
                <div className='content'>
                    <span className='userHeader' >Username</span>
                    <input className='input' autoFocus ref={usernameRef} />
                    <span className='emailHeader'>Email</span>
                    <input className='input' type="text" />
                    <span className='passwordHeader'>Password</span>
                    <input className='input' type="password" min="8" />
                    <div style={{ display: "flex", justifyContent: "right" }}>
                        <button className='registerBtn' type="submit" onClick={handle}>Register</button>
                    </div>
                </div>
                <Cancel className="close" onClick={() => setShowRegister(false)} />
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