import { Link, Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <nav>
        {/* Link is used to navigate between routes */}
        <Link to="/">Customers</Link>
        <Link to="/trainings">Trainings</Link>
      </nav>
      {/* Outlet is used to render child routes */}
      <Outlet />
    </>
  )
}

export default App
