"use client";

import { useEffect, useState } from "react";
import { type SessionData } from "../lib";
import { defaultSession } from "../lib";

export function Form() {
  const [session, setSession] = useState<SessionData>(defaultSession);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    void fetch("session")
      .then((res) => res.json())
      .then((session) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setSession(session);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p className="text-lg">Loading...</p>;
  }

  if (!session.isLoggedIn) {
    return <LoginForm />;
  }

  return (
    <>
      <p className="text-lg">
        Logged in user: <strong>{session.username}</strong>
      </p>
      <p>
        This is protected content and can only be accessed if you are logged in.
      </p>
      <p>
        <a href="/session?action=logout"> Logout </a>
      </p>
    </>
  );
}

function LoginForm() {
  return (
    <form action="/session" method="POST">
      <label className="block text-lg">
        <span>Username</span>
        <input type="text" name="username" required />
      </label>
      <div>
        <input type="submit" value="Login" />
      </div>
    </form>
  );
}
