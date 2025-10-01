import { useState } from "react";
import "./index.css";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (
        <>
            <div className="container">
                <h1>Login</h1>
                <div className="fields">
                    <label className="label" htmlFor="username">Username</label>
                    <input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} /> <br />
                </div>
                <div className="fields">
                    <label className="label" htmlFor="password">Password</label>
                    <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} /> <br />
                </div>
                <div>
                    Dont have an account?<a href="./signup">create an account</a>
                </div>
                <button className="submit" type="submit" onClick={async () => {
                    const res = await fetch("http://localhost:3000/api/user/login",
                        {
                            method: "POST",
                            body: JSON.stringify({ username: username, password: password }),
                            headers: { "Content-Type": "application/json" }
                        }
                    );
                    console.log(await res.json())
                }}>Login</button>
            </div >
        </>)
}

export default Login;