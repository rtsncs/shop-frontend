import { UserCredentials } from "../../hooks/Auth";

function Register() {
  const handleRegister = (event: React.FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    if (form.password.value !== form.repeat_password.value) {
      alert("Passwords do not match!");
      return;
    }

    const credentials: UserCredentials = {
      name: form.username.value as string,
      password: form.password.value as string,
    };

    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => {
        if (response.ok) {
          alert("Registered successfully!");
        } else {
          alert("Registration failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Register failed:", error);
        alert("Registration failed. Please try again.");
      });
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <label>
          <p>Name:</p>
          <input type="text" name="username" required />
        </label>
        <br />
        <label>
          <p>Password:</p>
          <input type="password" name="password" required />
        </label>
        <label>
          <p>Repeat password:</p>
          <input type="password" name="repeat_password" required />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </>
  );
}

export default Register;
