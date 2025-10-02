import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (loading) return;
        setLoading(true);
        if (!username || !password) {
            alert("Enter all credentials");
            setLoading(false);
            return;
        }
        fetch("http://localhost:3000/api/user/login",
            {
                method: "POST",
                body: JSON.stringify({ username: username, password: password }),
                headers: { "Content-Type": "application/json" }
            }
        ).then(res =>
            res.json()
                .then(data => {
                    if (!res.ok) {
                        throw new Error(data.message || "Something went wrong")
                    }
                    return data;
                })
        ).then(data => {
            localStorage.setItem("token", data.token);
            console.log("Login successfull");
            navigate("/dashboard");
        }).catch(err => {
            console.log(err);
            alert(err.message);
        }).finally(() => setLoading(false))
    }

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
                    Dont have an account?<Link to="/signup">create an account</Link>
                </div>
                <button className="submit" disabled={loading} onClick={handleLogin}>{loading ? "Logging in..." : "Login"}</button>
            </div >
        </>)
}

export default Login;