import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div>
        <p>Anuncios</p>
        <Link to={"/login"}>login</Link>
        <Link to={"/about"}>about</Link>
    </div>
  )
}

export default Navbar