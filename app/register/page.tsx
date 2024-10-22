"use client";
import { useState } from "react";
import "./register.css";
import { createUser } from "../actions";
import { useRouter } from "next/navigation";

export default function Page() {
  const [id, setId] = useState(""); // Assuming you also want an id
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [sex, setSex] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
    const  router = useRouter();

  const handleSave = async () => {
    const userDto1: any = {
      name,
      age:Number(age),
      email,
      phone:Number(phone),
      sex,
      username,
      password,
      country,
    };
    await createUser(userDto1);
    router.push("/login")

  };
  
  return (
    <div className="r-container">
      <h2>Register</h2>
      <form className="regis">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="text"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter your age"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="sex">Sex:</label>
          <input
            type="text"
            id="sex"
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            placeholder="Enter your sex"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Enter your country"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Choose a username"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <button className="rbutton" type="button" onClick={handleSave}>
          Save
        </button>
      </form>
    </div>
  );
}
