import { Button, Input } from "@material-tailwind/react";
// import animations from "./animation.json";
// import Lottie from "lottie-react";
import { useState } from "react";
// import { Alert } from "@material-tailwind/react";
import { ZodError, object, z } from "zod";
import { useProvider } from "../../components/provider";
import { AppContextType } from "../../App";
// import Loader from "../../components/loader";
import { AxiosError } from "axios";
import LogoImage from "../../assets/icons/loginImage.png"
import { ReactComponent as Logo } from "../../assets/icons/logo.svg";
import { toast } from "react-toastify";
import { Spinner } from "@material-tailwind/react";
import { User } from "../../utils/types";

const loginDataSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

type LoginDataType = z.infer<typeof loginDataSchema>;
function LoginPage() {
  const [errors, setErrors] = useState<string[]>([]);
  const [loginData, setLoginData] = useState<LoginDataType>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const { backendApi, setAccessToken, setRefreshToken, setUser } =
    useProvider<AppContextType>();

  async function handleLogin() {
    setLoading(true);
    // trottle the login button
    await new Promise((resolve) => setTimeout(resolve, 500));
    try {
      const data = loginDataSchema.parse(loginData);
      const { accessToken, refreshToken, user } = await backendApi.login(data);
      setUser(user as User)
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        setErrors(error.issues.map((issue) => issue.message));
      } else if (
        error instanceof AxiosError &&
        error.response?.status &&
        [401, 404].includes(error.response?.status)
      ) {
        toast.error("Invalid email or password");
      } else {
        toast.error(["Something went wrong, please try again later"]);
      }
    }
    setLoading(false);
  }
  return (
    <div className="flex h-screen  min-h-[40rem] overflow-x-hidden">
      <div className="flex-center flex-1  flex-col gap-[2rem] px-[4rem] py-12 [&>*]:w-80">
        <Logo className="w-52" />
        <div className="flex  flex-col gap-6">
          <div>
            <Input
              type="text"
              label="Username"
              value={loginData.email}
              onChange={(e) => setLoginData((prev) => ({ ...prev, email: e.target.value }))}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }} crossOrigin={undefined} />
          </div>
          <div>
            <Input
              type="password"
              label="Password"
              value={loginData.password}
              onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }} crossOrigin={undefined} />
          </div>
        </div>
        <Button color="purple" className=" relative h-11" onClick={handleLogin} disabled={loading} placeholder={undefined}>
          {loading ? (
            <div className="absolute-center">
              <Spinner />
            </div>
          ) : (
            "Login"
          )}
        </Button>
      </div>
      <div className="flex-2 relative hidden flex-col items-center justify-center gap-6  bg-[#3C56A0]/5 lg:flex">
        <img src={LogoImage} className="h-full w-full" />
      </div>
    </div>
  );
}
export default LoginPage;