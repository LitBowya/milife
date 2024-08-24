import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Container} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../../slices/authApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  // Access userInfo directly

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("profilePicture", profilePicture);

        const res = await register(formData).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate('/login');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  return (
    <Container className="mt-5 pt-3 d-flex justify-content-center align-items-center min-vh-80">
      <Form
        onSubmit={submitHandler}
        className="p-4 border rounded shadow-sm"
        style={{ maxWidth: "450px", width: "100%" }}
      >
        <h1 className="text-center mb-4">Register</h1>
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="confirmPassword" className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="profilePicture" className="mb-3">
          <Form.Label>Profile Image</Form.Label>
          <Form.Control
            name="profilePicture"
            type="file"
            onChange={handleFileChange}
            required
          />
        </Form.Group>

        <Button type="submit" disabled={isLoading} className="button">
          Register
        </Button>

        <div className="mt-3 text-center">
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </div>
      </Form>
    </Container>
  );
};

export default RegisterPage;
