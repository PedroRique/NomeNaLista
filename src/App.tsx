import './App.css'
import { HomePage } from './app/pages/Home'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { NewListPage } from './app/pages/NewList'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" Component={HomePage}></Route>
          <Route path="/new-list" Component={NewListPage}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
