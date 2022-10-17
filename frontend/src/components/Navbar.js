import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useUserContext } from '../hooks/useUserContext'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useUserContext()

const handleClick= ()=>{
    logout()
    console.log(user);
}

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1> home</h1>
        </Link>

        <nav>
          {user && (
            <div>
              <span>{user.userName}</span>
              {user.role==='admin' && <Link to="/graph"><button>Graph</button></Link>}
              <button onClick={handleClick}>Log out</button>

            </div>
          )}
          {!user && (
            <div>
              <Link to="/login"><button>Login</button></Link>
              <Link to="/signup"><button>Signup</button></Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar