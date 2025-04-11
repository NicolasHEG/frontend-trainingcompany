import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CustomerList from './components/CustomerList.tsx'
import TrainingList from './components/TrainingList.tsx'
import TrainingCalendar from './components/TrainingCalendar.tsx'

const router = createBrowserRouter([
  {
    // The root path ("/") renders the App component as the main layout.
    path: "/",
    element: <App />,
    children: [
      {
        // The default child route renders the CustomerList component.
        element: <CustomerList />,
        index: true
      },
      {
        path: "/trainings",
        element: <TrainingList />
      },
      {
        path: "/calendar",
        element: <TrainingCalendar />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
