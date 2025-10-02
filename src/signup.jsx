import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handlesignup = async () => {
        if (loading) return;
        setLoading(true);
        if (!username || !password || !email) {
            alert("Enter all credentials");
            setLoading(false)
            return;
        }
        fetch("http://localhost:3000/api/user/signup",
            {
                method: "POST",
                body: JSON.stringify({ username: username, email: email, password: password }),
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
            alert(data.message);
            navigate("/");
        }).catch(err => {
            alert(err.message);
        }).finally(() => setLoading(false))
    }

    return (
        <>
            <div className="container">
                <h1>Signup</h1>
                <div className="fields">
                    <label className="label" htmlFor="username">Username</label>
                    <input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} /> <br />
                </div>
                <div className="fields">
                    <label className="label" htmlFor="email">Email</label>
                    <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} /> <br />
                </div>
                <div className="fields">
                    <label className="label" htmlFor="password">Password</label>
                    <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} /> <br />
                </div>
                <div>
                    Already have an account?<Link to="/">Login</Link>
                </div>
                <button className="submit" disabled={loading} onClick={handlesignup}>{loading ? "Signing up..." : "Signup"}</button>
            </div >
        </>)
}

export default Signup;