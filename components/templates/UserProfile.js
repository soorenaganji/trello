import { getUser, updateUser } from "@/api/profile";
import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { signOut } from "next-auth/react";
const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const [isOnEdit, setIsOnEdit] = useState(false);

  const logOutHandler = async () => {
    signOut();
  };
  const postUpdatedUser = async () => {
    const res = await updateUser(userData);
    setIsOnEdit(false);
    if (res.status == 201) {
      toast.success("User Updated Successfully");
    }
  };
  const inputChangeHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    getUser()
      .then((res) => res.data.data)
      .then((data) => setUserData(data));
  }, [isOnEdit]);
  return (
    <div className=" pt-12 md:pt-24 flex items-center justify-center">
      {isOnEdit ? (
        <div className="lg:w-96 w-64 h-[36rem] shadow-xl border border-indigo-500 rounded-2xl px-6  ">
          <Image
            src={"/user.png"}
            width={120}
            height={120}
            className="rounded-full mt-8 mx-auto"
          />
          <div className="mt-16 text-sm md:text-base flex flex-col items-start justify-start gap-8">
            <p>
              Name :{" "}
              <input
                onChange={inputChangeHandler}
                type="text"
                name="name"
                id=""
                value={userData.name}
                className="p-2 border border-indigo-400 shadow-md text-xs lg:text-sm rounded-md w-36 outline-none"
              />
            </p>
            <p>
              Last Name :{" "}
              <input
                onChange={inputChangeHandler}
                type="text"
                name="lastName"
                id=""
                value={userData.lastName}
                className="p-2 border border-indigo-400 shadow-md text-xs lg:text-sm rounded-md w-36 outline-none"
              />
            </p>
            <p>
              Email :{" "}
              <input
                onChange={inputChangeHandler}
                type="text"
                name="email"
                id=""
                value={userData.email}
                className=" p-2 border w-36   border-indigo-400 shadow-md text-xs lg:text-sm lg:w-56 rounded-md outline-none "
              />
            </p>
            <button
              className="px-6 py-3 rounded-lg bg-indigo-500 text-white mt-12 mx-auto"
              onClick={postUpdatedUser}
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="md:w-96 w-64 h-[34rem] shadow-xl border border-indigo-500 rounded-2xl px-6 ">
          <Image
            src={"/user.png"}
            width={120}
            height={120}
            className="rounded-full mt-8 mx-auto"
          />
          <div className="mt-16 flex text-sm md:text-base flex-col items-start justify-start gap-8">
            <p>Name : {userData.name}</p>
            <p>Last Name : {userData.lastName}</p>
            <p>Email : {userData.email}</p>
            <div className="w-full flex items-center justify-between">
              <button
                className="md:px-6 md:py-3 px-4 py-2 rounded-lg bg-rose-500 text-white mt-12 mx-auto"
                onClick={logOutHandler}
              >
                Log Out
              </button>
              <button
                className="md:px-6 md:py-3 px-4 py-2 rounded-lg bg-indigo-500 text-white mt-12 mx-auto"
                onClick={() => setIsOnEdit(true)}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
