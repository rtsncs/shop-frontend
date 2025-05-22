import { useAuth, UserCredentials } from "../../hooks/Auth";

function Login() {
  const { login } = useAuth();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const credentials: UserCredentials = {
      name: form.username.value as string,
      password: form.password.value as string,
    };

    login(credentials);
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>
          <p>Name:</p>
          <input type="text" name="username" required />
        </label>
        <br />
        <label>
          <p>Password:</p>
          <input type="password" name="password" required />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default Login;
