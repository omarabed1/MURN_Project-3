import { useRef } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
    const userName = useRef('')
    const firstName = useRef('')
    const lastName = useRef('')
    const password = useRef('')

    const {signup, error, isloading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()
        signup(userName.current.value, firstName.current.value, lastName.current.value, password.current.value)
    }

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign Up</h3>

            <label>User Name:</label>
            <input
                type="text"
                ref={userName}
            />
            <label>First Name:</label>
            <input
                type="text"
                ref={firstName}
            />
            <label>Last Name:</label>
            <input
                type="text"
                ref={lastName}
            />
            <label>Password:</label>
            <input
                type="password"
                ref={password}
            />

            <button disabled={isloading}>Sign up</button>
            {error && <div className="error">{error}</div>}

        </form>
    )
}

export default Signup