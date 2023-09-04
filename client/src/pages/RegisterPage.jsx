import { useNavigate } from "react-router-dom"

function RegisterForm() {

    const navigate = useNavigate();
    return (
        <h1
        onClick={() => navigate("/")}>Hello World</h1>
    )
}

export default RegisterForm