import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";
import { useLogin } from "../Network/User";
import { BASE_URL } from "../constants";
import Link from "next/link";
import { useRouter } from "next/router";

const Login = ({ display }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { mutate: login } = useLogin();
  const router = useRouter();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const { register, handleSubmit } = useForm();

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmitUser = async (values) => {
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    display(true);
  };

  return (
    <div className="w-100 h-screen relative grid place-items-center">
      <div className="w-[70%] h-[70vh] shadow-md shadow-gray-500 flex items-center justify-center ">
        <div className="w-[50%] h-100 grid place-items-center">
          <img
            src="data:image/jpeg;base64,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"
            alt=""
          />
        </div>
        <div className="w-[50%]">
          <Box
            sx={{
              width: 500,
              maxWidth: "100%",
            }}
            className="flex flex-col gap-4"
          >
            <h2 className=" font-semibold text-2xl border-b-4 border-blue-900 border-solid w-fit">
              Login
            </h2>
            <form
              className="flex gap-2 flex-col"
              onSubmit={handleSubmit((data) => handleSubmitUser(data))}
            >
              <TextField
                {...register("email")}
                fullWidth
                label="Email"
                id="fullWidth"
              />

              <input
                {...register("password")}
                type="password"
                placeholder="Mot de passe"
                className="w-100 px-2 py-3 bg-gray-300"
              />

              <Button
                type="submit"
                className="bg-blue-900 text-white font-semibold hover:text-blue-900 hover:border-blue-900 border-2 border-solid"
              >
                <Link href="/Voiture">Login</Link>
              </Button>
            </form>
          </Box>
          <div className="flex justify-start mt-2">
            <span>
              Vous n'avez pas de compte? <Button>S'inscrire</Button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
