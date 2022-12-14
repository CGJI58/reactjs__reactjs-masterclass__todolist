import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  passwordConfirm: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  const onValid = (data: any) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("email", {
            required: true,
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com emails allowed",
            },
          })}
          placeholder="email"
        />
        <span>{errors?.email?.message}</span>
        <input
          {...register("firstName", { required: "write here." })}
          placeholder="firstName"
        />
        <span>{errors?.firstName?.message}</span>
        <input
          {...register("lastName", { required: "write here." })}
          placeholder="Last Name"
        />
        <span>{errors?.lastName?.message}</span>
        <input
          {...register("userName", { required: "write here.", minLength: 10 })}
          placeholder="UserName"
        />
        <span>{errors?.userName?.message}</span>
        <input
          {...register("password", { required: "write here", minLength: 5 })}
          placeholder="Password"
        />
        <span>{errors?.password?.message}</span>
        <input
          {...register("passwordConfirm", {
            required: "confirm your password here.",
            minLength: {
              value: 5,
              message: "password length should be longer than 5.",
            },
          })}
          placeholder="passwordConfirm"
        />
        <span>{errors?.passwordConfirm?.message}</span>
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
