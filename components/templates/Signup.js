"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import validate from "@/helper/validate";
import { createUser } from "@/api/auth";
import { toast } from "react-hot-toast";
const Signup = () => {
  const { status } = useSession();
  useEffect(() => {
    if (status === "authenticated") router.replace("/");
  }, [status]);
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [userData, setUserData] = useState({
    Email: "",
    Password: "",
    Password2: "",
    name: "",
    lastName: "",
  });
  let finalUserData = {
    email: userData.Email,
    password: userData.Password,
    name: userData.name,
    lastName: userData.lastName,
  };

  useEffect(() => {
    setErrors(validate(userData, false));
  }, [userData, touched]);

  const changeHandler = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const touchHandler = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (Object.keys(errors).length !== 0) {
      setTouched({
        name: true,
        lastName: true,
        Email: true,
        Password: true,
        Password2: true,
      });
    } else if (Object.keys(errors).length == 0) {
      const res = await createUser(finalUserData);
      if (!res.error) {
        toast.success("You Signed Up Successfully");
        router.push("/login");
      } else {
        toast.error(res.data.message);
      }
    }
  };
  return (
    <>
      <main className="w-full mt-24 transition-all duration-400 flex items-center justify-center">
        <div className="flex items-center justify-center flex-col mx-auto gap-8">
          <h2 className="text-center text-3xl lg:text-5xl font-bold mx-auto  ">
            Create New Account
          </h2>
          <p className="text-start">
            Already Have An Account?{" "}
            <Link href={"/login"} className="underline text-[#5142FF]">
              {""}
              Log In
            </Link>
          </p>
          <div>
            <div className="w-full flex items-center justify-center gap-8">
              <input
                onChange={changeHandler}
                onFocus={touchHandler}
                name="name"
                type="text"
                placeholder="Name"
                className={`lg:w-44 w-36 h-14 lg:text-lg placeholder:text-slate-500 focus:border-[#675aff] focus:shadow-md  p-2  rounded-md border-[1px] outline-none ${
                  errors.name && touched.name
                    ? "border-red-400"
                    : "border-slate-300"
                } `}
              />

              <input
                onChange={changeHandler}
                onFocus={touchHandler}
                name="lastName"
                type="text"
                placeholder="Last Name"
                className={`${
                  errors.lastName && touched.lastName
                    ? "border-red-400"
                    : "border-slate-300"
                } lg:w-44 w-36 h-14 lg:text-lg placeholder:text-slate-500 focus:border-[#675aff] focus:shadow-md  p-2 rounded-md border-[1px] outline-none `}
              />
            </div>
            <div className="flex items-center justify-between   w-80 lg:w-96 text-sm mt-2 text-red-500">
              <p>{touched.name ? errors.name : ""}</p>
              <p> {touched.lastName ? errors.lastName : ""}</p>
            </div>
          </div>

          <div>
            <input
              onChange={changeHandler}
              onFocus={touchHandler}
              name="Email"
              type="email"
              placeholder="Email"
              className={` w-80 lg:w-96 h-14 text-lg placeholder:text-slate-500 focus:border-[#675aff] focus:shadow-md  p-4 rounded-md border-[1px] outline-none ${
                errors.Email && touched.Email
                  ? "border-red-400"
                  : "border-slate-300"
              } `}
            />
            <br />
            <p className="text-sm mt-3 text-red-500">
              {touched.Email ? errors.Email : ""}
            </p>
          </div>
          <div>
            <input
              onChange={changeHandler}
              onFocus={touchHandler}
              name="Password"
              type="password"
              placeholder="Password"
              className={` w-80 lg:w-96 h-14 text-lg placeholder:text-slate-500 focus:border-[#675aff] focus:shadow-md  p-4 rounded-md border-[1px] outline-none ${
                errors.Password && touched.Password
                  ? "border-red-400"
                  : "border-slate-300"
              } `}
            />
            <br />
            <p className="text-sm mt-3 text-red-500">
              {touched.Password ? errors.Password : ""}
            </p>
          </div>
          <div>
            <input
              onChange={changeHandler}
              onFocus={touchHandler}
              name="Password2"
              type="password"
              placeholder="Confirm Password"
              className={` w-80 lg:w-96 h-14 text-lg placeholder:text-slate-500 focus:border-[#675aff] focus:shadow-md  p-4 rounded-md border-[1px] outline-none ${
                errors.Password2 && touched.Password2
                  ? "border-red-400"
                  : "border-slate-300"
              } `}
            />
            <br />
            <p className="text-sm mt-3 text-red-500">
              {touched.Password2 ? errors.Password2 : ""}{" "}
            </p>
          </div>
          <button
            className={` w-80 lg:w-96 h-14 text-lg p-2 bg-[#5142FF] text-white rounded-lg hover:shadow-lg transition-all duration-400 hover:shadow-[#685aff96] ${
              Object.keys(errors).length ? "bg-[#7265ff9a]" : "bg-[#675aff]"
            }  `}
            onClick={submitHandler}
          >
            Sign Up
          </button>
        </div>
      </main>
    </>
  );
};

export default Signup;
