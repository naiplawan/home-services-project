
import RegisterPage from './RegisterPage';
import '../styles/App.css'
import { Button } from 'antd';

function App() {

  return (
    <>
        <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    <div></div>
    <Button type="primary">Button</Button>

    <RegisterPage />

    
    </>
  )
}

export default App
