import Background from "@/assets/login2.png";
import Victory from "@/assets/victory.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client.js";
import { SIGNUP_ROUTE, LOGIN_ROUTE } from "@/utils/constants.js";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";

const Auth = () => {
  const navigate = useNavigate();

  const { setUserInfo } = useAppStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const validateLogin = () => {
    if (!email.length) {
      toast.error("Email is required.");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required.");
      return false;
    }
    return true;
  };

  const validateSignup = () => {
    console.log(email)
    console.log(password)
    if (!email.length) {
      toast.error("Email is required.");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required.");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Password and Confirm password should match.");
      return false;
    }

    return true;
  };

const handleLogin = async () => {
  if (validateLogin()) {
    try {
      // yahan email & password bhejo, assume email & password variables defined hain
      const response = await apiClient.post(LOGIN_ROUTE, { email, password });
      console.log(response);

      if (response?.data?.user?.id) {
        setUserInfo(response.data.user);
        if (response.data.user.profileSetup) {
          navigate("/chat");
        } else {
          navigate("/profile");
        }
      } else {
        // Agar user id nahi mili response me
        toast.error("Invalid login response");
      }
    } catch (error) {
      toast.error("Login failed. Check your credentials.");
      console.error("Login error:", error);
    }
  }
};


  const handleSignup = async () => {
    if (validateSignup()) {
      const response = await apiClient.post(SIGNUP_ROUTE, { email, password });
      console.log(response);
      if (response.status === 201) {
        setUserInfo(response.data.user);
        navigate("/profile");
      }
    }
  };
  
  return (
    <div className="h-[100vh] w-[100vw] items-center justify-center flex">
      <div
        className="h-[80vh] w-[80vw] bg-white border-2 border-white text-opacity-90 shadow-2xl md:w-[90vw] lg:w-[70vw] xl:w-[60vw]
                rounded-3xl grid xl:grid-cols-2"
      >
        {/* Left Panel */}
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
              <img src={Victory} alt="Victory Emoji" className="h-[100px]" />
            </div>
            <p className="font-medium text-center">
              Fill in the details to get started with the best chat app!
            </p>
            <div className="flex items-center justify-center w-full">
              <Tabs defaultValue="login" className="w-3/4">
                <TabsList className="bg-transparent rounded-none w-full flex flex-row">
                  <TabsTrigger
                    value="login"
                    className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 border-transparent rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                  >
                    Login
                  </TabsTrigger>
                  <TabsTrigger
                    value="signup"
                    className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 border-transparent rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                  >
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="flex flex-col gap-5 mt-4">
                  <Input
                    placeholder="Login Email"
                    type="email"
                    className="rounded-full p-5"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    placeholder="Password"
                    type="password"
                    className="rounded-full p-5"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button className="rounded-full p-6" onClick={handleLogin}>
                    Login
                  </Button>
                </TabsContent>

                <TabsContent
                  value="signup"
                  className="flex flex-col gap-5 mt-4"
                >
                  <Input
                    placeholder="Sign Up Email"
                    type="email"
                    className="rounded-full p-5"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    placeholder="Password"
                    type="password"
                    className="rounded-full p-5"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Input
                    placeholder="Confirm Password"
                    type="password"
                    className="rounded-full p-5"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <Button className="rounded-full p-6" onClick={handleSignup}>
                    Sign Up
                  </Button>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="hidden xl:flex items-center justify-center">
          <img src={Background} alt="Background Login" className="h-[500px]" />
        </div>
      </div>
    </div>
  );
};

export default Auth;
