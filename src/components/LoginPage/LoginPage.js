import React from "react";
import styles from "./LoginPage.module.scss"
import { TextLabel } from "@findxdn/erp-theme";
import { TextInput, CustomDateTimePickerX } from "../CustomMUI/ListCustomMui";
import { Button } from "@mui/material";
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import LoginAction from "../../redux/login/action";
import Utils from "../../utils/Utils";
import getErrorMessage from "../../utils/ErrorConstant";
import useRouter from "../../hooks/use-router";
import * as RouterPath from "../../router/RouterPath"

function LoginPage(props) {
    const {} = props

    const {
      handleSubmit,
      control,
      setValue,
      formState: { errors },
    } = useForm()
    const router = useRouter();
    const dispatch = useDispatch()

    const setLocation = () => {
      window.location = '/'
    }

    const excuteLogin = async (data) => {
      const DateSubmit = {
          Username: data.inputName,
          Password: data.inputPassword,
          email: data.inputEmail,
      }
      try {
          dispatch({
              type: LoginAction.SUBMIT_LOGIN,
              data: DateSubmit,
              onSuccess: (data) => {
                  Utils.showSuccessToast({
                      message: "Đăng nhập thành công",
                  })
                  router.push({
                    pathname: RouterPath.HOME,
                    // page: newValue,
                  })
              },
              onError: (data) => {
                  Utils.showErrorToast({
                      message: data ?? "Đăng nhập thất bại, vui lòng kiểm tra tên đăng nhập và mật khẩu",
                  })
              },
          })
      } catch (err) {
          console.log(err)
      }
  };

    const onSubmit = (data) => {
      // data = { gender: gender,...data}
      excuteLogin(data)
    }
    return (
    <form onSubmit={handleSubmit(onSubmit)}
      style={{ display: "flex", flexDirection: "column", maxWidth: "900xp" }}
    >
      <div className={styles.loginPage}>
        <div
          style={{
            color: "grey",
            borderBottom: "0.2px solid grey",
            fontSize: "25px",
            fontWeight: "600px",
            margin: "25px",
            maxWidth: "600xp",
          }}
        >
          Thông tin đăng nhập
        </div>
        <div className={styles.Details}>
          <div>
            <TextLabel>
              Tên đăng nhập <p style={{ margin: 0 }}>*</p>
            </TextLabel>
            <Controller
              control={control}
              rules={{
                required: true,
                minLength: 8,
                maxLength: 20,
              }}
              render={({ field: { ref, ...rest } }) => (
                <TextInput
                  {...rest}
                  // label='Họ '
                  disablePortal
                  variant="outlined"
                  InputLabelProps={{ style: { fontSize: 13 } }}
                  sx={{ width: "300px" }}
                />
              )}
              name="inputName"
            />
            {errors?.inputName?.type === "required" && (
              <p style={{ color: "red", marginBottom: 0 }}>
                Vui lòng nhập tên đăng nhập!{" "}
              </p>
            )}
            {errors?.inputName?.type === "minLength" && (
              <p style={{ color: "red", marginBottom: 0 }}>
                Tên đăng nhập tối thiểu 8 ký tự!{" "}
              </p>
            )}
            {errors?.inputName?.type === "maxLength" && (
              <p style={{ color: "red", marginBottom: 0 }}>
                Tên đăng nhập tối đa 20 ký tự!{" "}
              </p>
            )}
          </div>
          <div>
            <TextLabel>Mật khẩu<p style={{ margin: 0 }}>*</p></TextLabel>
            <Controller
              control={control}
              rules={{
                required: true,
                minLength: 8,
                maxLength: 20,
              }}
              render={({ field: { ref, ...rest } }) => (
                <TextInput
                  {...rest}
                  variant="outlined"
                  isPassword
                  InputLabelProps={{ style: { fontSize: 13 } }}
                  sx={{ width: "300px" }}
                />
              )}
              name="inputPassword"
            />
            {errors?.inputPassword?.type === "required" && (
              <p style={{ color: "red", marginBottom: 0 }}>
                Vui lòng nhập mật khẩu!{" "}
              </p>
            )}
            {errors?.inputPassword?.type === "minLength" && (
              <p style={{ color: "red", marginBottom: 0 }}>
                Mật khẩu tối thiểu 8 ký tự!{" "}
              </p>
            )}
            {errors?.inputPassword?.type === "maxLength" && (
              <p style={{ color: "red", marginBottom: 0 }}>
                Mật khẩu tối đa 20 ký tự!{" "}
              </p>
            )}
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
          width: '100%'
        }}
      >
        <Button
          style={{
            width: "300px",
            backgroundColor: "#F20707",
            color: "#FFFFFF",
            marginTop: "20px",
            height: "38px",
          }}
          type="submit"
        >
          Đăng nhập
        </Button>
      </div>
    </form>
  );
}

export default LoginPage;