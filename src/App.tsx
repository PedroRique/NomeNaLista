import './App.css'
import { HomePage } from './app/pages/Home'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { NewListPage } from './app/pages/NewList'
import { ListPage } from './app/pages/List'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" Component={HomePage}></Route>
          <Route path="/new-list" Component={NewListPage}></Route>
          <Route path="/list/:slug" Component={ListPage}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
