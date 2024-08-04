"use client";

import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useEffect, useState } from "react";

const AuthButton = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the auth cookie is present
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth="));

    setIsAuthenticated(!!token);
    console.log("isAuthenticated", isAuthenticated);
  }, []);

  const handleLogout = () => {
    document.cookie = "auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  return isAuthenticated ? (
    <Button color="primary" variant="flat" onClick={handleLogout}>
      Logout
    </Button>
  ) : (
    <Button as={Link} color="primary" href="/login" variant="flat">
      Login
    </Button>
  );
};

export default AuthButton;
