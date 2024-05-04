import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({ message: "Registration Success!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold font-poppins">Register with Us</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-black text-sm font-bold font-inter flex-1">
          First Name
          <input
            className="border rounded w-full py-1 px-2 font-normal border-[#BF6BAD]"
            {...register("firstName", { required: "This field is required" })}
          ></input>
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>
        <label className="text-black text-sm font-bold flex-1 font-inter">
          Last Name
          <input
            className="border rounded w-full py-1 px-2 font-normal border-[#BF6BAD]"
            {...register("lastName", { required: "This field is required" })}
          ></input>
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>
      <label className="text-black text-sm font-bold flex-1 font-inter">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal border-[#BF6BAD]"
          {...register("email", { required: "This field is required" })}
        ></input>
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className="text-black text-sm font-bold flex-1 font-inter ">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal border-[#BF6BAD]"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        ></input>
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <label className="text-black text-sm font-bold flex-1 font-inter ">
        Confirm Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal border-[#BF6BAD]"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") !== val) {
                return "Your passwords do no match";
              }
            },
          })}
        ></input>
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>
      <span>
        <button
          type="submit"
          className="bg-[#BF6BAD] rounded-lg text-white p-2 font-bold hover:bg-black text-xl"
        >
          Create Account
        </button>
      </span>
    </form>
  );
};

export default Register;
