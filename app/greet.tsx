"use client";

import { ChangeEventHandler, useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { message } from "@tauri-apps/api/dialog";

interface GreetState {
  name: string;
  message: string;
}

export default function Greet() {
  const [greeting, setGreeting] = useState<GreetState>({
    name: "",
    message: "",
  });

  useEffect(() => {
    invoke<GreetState>("greet", { name: "Amit", message: "Hello" })
      .then((result) => setGreeting({ ...result }))
      .catch(console.error);
  }, []);

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setGreeting({ ...greeting, [name]: event.target.value });
  };

  return (
    <div>
      {greeting.name && <h1>Hello, {greeting.name}!</h1>}
      <div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          onChange={handleChange}
          name="name"
          value={greeting.name}
        />
        <textarea
          className="textarea textarea-bordered"
          placeholder="Bio"
          onChange={handleChange}
          name="message"
          value={greeting.message}
        ></textarea>
      </div>
    </div>
  );
}
