import AuthText from "../../components/auth/AuthText";
import AuthForm from "../../components/auth/AuthForm";

const AuthPage = () => {
  return (
    // [@media(hover)]:mt-[-62px] [@media(hover)]:items-center flex flex-row w-full [@media(pointer:coarse)]:p-[12px] [@media(pointer:coarse)]:flex-col justify-between [@media(pointer:coarse)]:justify-start
    <div className="w-full h-full flex flex-row justify-between items-center">
      <AuthText />
      <AuthForm />
    </div>
  );
};

export default AuthPage;
