import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../app/zustandStore.js";
import styled from "styled-components";

const CredentialsContainer = styled.div`
  display: flex;
  /* flex-direction: column; */

  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  height: 75vh;
  /* background-color: cyan; */
  /* input {
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid #ccc;
  } */
`;

const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  /* height: 50%; */
  background-color: #fab005;
  margin-top: 4rem auto 4rem auto;
  max-width: 24rem;
  min-width: 18rem;
  border-radius: 5px;
  max-height: 28rem;
  justify-content: center;
  align-items: center;
  text-align: center;
  .titleContainer {
    font-size: 2rem;
    font-weight: bold;
    color: #F5F5F5;
  }
  /* .login-button {
    background-color: #007bff;
    color: white;
    padding: 0.5rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  } */
`;

const Login = () => {
  const [registering, setRegistering] = useState(false);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  const { user } = useUserStore((state) => state);

  const signupUser = useUserStore((state) => state.signupUser);
  const loginUser = useUserStore((state) => state.loginUser);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  const onButtonClick = async () => {
    if (registering) {
      // Signup
      if (!email || !password || !name) {
        setNameError(!name ? "se requiere nombre" : "");
        setEmailError(!email ? "se requiere correo" : "");
        setPasswordError(!password ? "se requiere password" : "");
        return;
      }
      try {
        await signupUser({ email, password, name });
        navigate("/"); // Navigate to the desired route after signup
      } catch (error) {
        console.error("Signup error:", error);
        // Handle signup error
      }
    } else {
      // Login
      if (!email || !password) {
        setEmailError(!email ? "se requiere correo" : "");
        setPasswordError(!password ? "se requiere password" : "");
        return;
      }
      try {
        await loginUser({ email, password });
        navigate("/"); // Navigate to the desired route after login
      } catch (error) {
        console.error("Login error:", error);
        // Handle login error
      }
    }
  };

  return (
    <CredentialsContainer>
      <StyledLogin>
        <div className="titleContainer">
          {registering ? <div>Regístrate</div> : <div>Inicia Sesión</div>}
        </div>
        {registering && (
          <>
            <br />
            <div className="inputContainer">
              <input
                value={name}
                placeholder="Ingresa tu nombre..."
                onChange={(ev) => setName(ev.target.value)}
                onFocus={() => setNameError("")}
                onBlur={() => !name && setNameError("se requiere nombre")}
                className="inputBox"
              />
              <br />
              <span className="errorLabel">{nameError}</span>
            </div>
          </>
        )}
        <br />
        <div className="inputContainer">
          <input
            value={email}
            placeholder="Ingresa tu correo..."
            onChange={(ev) => setEmail(ev.target.value)}
            onFocus={() => setEmailError("")}
            onBlur={() => !email && setEmailError("se requiere correo")}
            className="inputBox"
          />
          <br />
          <span className="errorLabel">{emailError}</span>
        </div>
        <br />
        <div className="inputContainer">
          <input
            value={password}
            placeholder="Ingresa tu password..."
            onChange={(ev) => setPassword(ev.target.value)}
            onFocus={() => setPasswordError("")}
            onBlur={() => !password && setPasswordError("se requiere password")}
            className="inputBox"
          />
          <br />
          <span className="errorLabel">{passwordError}</span>
        </div>
        <br />
        <div className="inputContainer">
          <input
            className="inputButton"
            type="button"
            onClick={onButtonClick}
            value={!registering ? "Iniciar Sesion" : "Registrarse"}
          />
        </div>
        <div>
          {!registering ? (
            <p onClick={() => setRegistering(true)}>
              ¿Aún no tienes cuenta? Regístrate
            </p>
          ) : (
            <p onClick={() => setRegistering(false)}>
              ¿Ya tienes cuenta? Inicia Sesión
            </p>
          )}
        </div>
      </StyledLogin>
    </CredentialsContainer>
  );
};

export default Login;
