import React from "react";
import AuthLayout from "../components/AuthLayout";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to access your notes">
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;