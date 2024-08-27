import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLoginMutation } from "../../slices/authApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";
import { Container, Form, Button, InputGroup } from "react-bootstrap";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      const profilePicture = res.user.profilePicture;
      dispatch(setCredentials({ ...res, profilePicture }));
      if (res.user.isAdmin) {
        navigate("/admindashboard");
      } else {
        navigate("/userdashboard");
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-80 mt-5 pt-3">
      <Form
        onSubmit={submitHandler}
        className="p-4 border rounded shadow-sm"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h1 className="mb-4 text-center">Log In</h1>
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="password" className="mb-4">
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              variant="outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </InputGroup>
        </Form.Group>
        <Button type="submit" className="button" disabled={isLoading}>
          Sign In
        </Button>
        <div className="mt-3 text-center">
          <p>
            New Customer?{" "}
            <Link
              to= "/register"
            >
              Register
            </Link>
          </p>
        </div>
      </Form>
    </Container>
  );
};

export default LoginPage;
