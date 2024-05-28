import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Schema, resolvers } from "../form/singIn";
import { type SinginInput } from "../schema/singin";
import { URL, KEY } from "../config";
import Cookies from "js-cookie";
import axios from "axios";

export default function Singin() {
  const { control, handleSubmit } = useForm<Schema>({
    resolver: resolvers,
  });
  const onSubmit: SubmitHandler<Schema> = (data) => {
    const { username, password } = data;

    axios
      .post(`${URL}v2/admin/signin`, {
        username,
        password,
      })
      .then((data) => {
        console.log(data);
        if (data.data.success) {
          console.log(data.data.token);
          const token = data.data.token;
          Cookies.set("token", token, { expires: 7 });

          fetchData();
        } else {
          alert(data.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchData = () => {
    const token = Cookies.get("token");

    if (token) {
      axios
        .get(`${URL}v2/api/${KEY}/admin/products/all`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("No token found");
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <Controller
              name="username"
              control={control}
              render={({ field, formState: { errors } }) => (
                <>
                  <input
                    {...field}
                    type="text"
                    className="form-control"
                    id="email"
                    placeholder="請輸入帳號"
                  />
                  {errors.username && (
                    <span className="text-danger">
                      {errors.username.message}
                    </span>
                  )}
                </>
              )}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>

            <Controller
              control={control}
              name="password"
              render={({ field, formState: { errors } }) => (
                <>
                  <input
                    {...field}
                    type="password"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="請輸入密碼"
                  />
                  {errors.password && (
                    <span className="text-danger">
                      {errors.password.message}
                    </span>
                  )}
                </>
              )}
            />
          </div>
          <div className="mb-3 form-check">
            <Controller
              control={control}
              name="_remmeberMe"
              render={({ field, formState: { errors } }) => (
                <>
                  <input
                    {...field}
                    type="checkbox"
                    value={field.name}
                    className="form-check-input"
                    id="exampleCheck1"
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    服務條款
                  </label>
                  <div className="form-check-label text-danger">
                    {errors._remmeberMe?.message}
                  </div>
                </>
              )}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            登入
          </button>
        </form>
      </div>
    </>
  );
}
