import '../styles/App.css'
import { Button } from 'antd';
import { useForm } from "react-hook-form";

function App() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <>
    {/* Tailwind CSS */}
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    <div></div>
    {/* Ant Design */}
    <Button type="primary">Button</Button>

    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input defaultValue="test" {...register("example")} />
      
      {/* include validation with required or other standard HTML validation rules */}
      <input {...register("exampleRequired", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}
      
      <input type="submit" />
    </form>

    </>
  )
}

export default App