import { useRef } from "react"
import { useLogin } from "../hooks/useLogin"
const Login = () => {
  const userName = useRef('')
  const password = useRef('')
  const { login, isloading, error } = useLogin()
  const handleSubmit = async (e) => {
    e.preventDefault()

    login(userName.current.value, password.current.value)
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>

      <label>user name:</label>
      <input
        type="text"
        ref={userName}
      />
      <label>Password:</label>
      <input
        type="password"
        ref={password}
      />

      <button disabled={isloading}>Log In</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Login