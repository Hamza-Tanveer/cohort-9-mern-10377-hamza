import AuthLayout from "../components/AuthLayout";
import SignupForm from "../components/SignUpForm";

const SignupPage = () => {
  return (
    <AuthLayout
      title="Create an Account"
      subtitle="Start capturing and organizing your thoughts">
      <SignupForm />
    </AuthLayout>
  );
};

export default SignupPage;