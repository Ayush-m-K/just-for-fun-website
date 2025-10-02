import { Link } from "react-router-dom";
import "./index.css"

function Signup() {
    return (
        <>
            <div className="container">
                <h1>Signup</h1>
                <div className="fields">
                    <label className="label" htmlFor="username">Username</label><input id="username" type="text" /> <br />
                </div>
                <div className="fields">
                    <label className="label" htmlFor="email">Email</label><input id="email" type="email" /> <br />
                </div>
                <div className="fields">
                    <label className="label" htmlFor="password">Password</label><input id="password" type="password" /> <br />
                </div>
                <div>
                    Have an account?<Link to="/">Login</Link>
                </div>
                <button className="submit">Signup</button>
            </div >
        </>)
}

export default Signup;