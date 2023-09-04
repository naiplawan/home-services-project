import '../styles/App.css'
import { Button } from 'antd';
import LoginForm from './LoginPage';

function App() {


  return (
    <>
    {/* Tailwind CSS */}
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    <LoginForm/>

    </>
  )
}

export default App
