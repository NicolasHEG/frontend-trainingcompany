import { Link, Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <nav>
        <Link to="/">Customers</Link>
        <Link to="/trainings">Trainings</Link>
      </nav>
      <Outlet />
    </>
  )
}

export default App
