import React, { useState } from "react";
import { useForm } from "react-hook-form";

function ToDoList() {
  const { register, handleSubmit, formState } = useForm();
  const onValid = (data: any) => {
    console.log(data);
  };
  console.log(formState.errors);
  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register("email", { required: true })} placeholder="email" />
        <input {...register("firstName")} placeholder="firstName" />
        <input {...register("lastName")} placeholder="lastName" />
        <input
          {...register("userName", { required: true, minLength: 10 })}
          placeholder="UserName"
        />
        <input {...register("password")} placeholder="password" />
        <input
          {...register("passwordConfirm", {
            required: true,
            minLength: {
              value: 5,
              message: "password length should be longer than 5.",
            },
          })}
          placeholder="passwordConfirm"
        />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
