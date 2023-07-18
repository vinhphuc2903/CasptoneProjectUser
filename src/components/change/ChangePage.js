import React from "react";
import styles from "./ChangePage.module.scss"
import { TextLabel } from "@findxdn/erp-theme";
import { TextInput, CustomDateTimePickerX } from "../CustomMUI/ListCustomMui";
import { Button } from "@mui/material";
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import LoginAction from "../../redux/login/action";
import Utils from "../../utils/Utils";
import getErrorMessage from "../../utils/ErrorConstant";
import useRouter from "../../hooks/use-router";
import * as RouterPath from '../../router/RouterPath'

function ChangePage(props) {
    const {} = props
    const router = useRouter();
    const {
      handleSubmit,
      control,
      setValue,
      formState: { errors },
    } = useForm()
    const dispatch = useDispatch()

    const setLocation = () => {
      window.location = '/login'
    }

    const excuteChangePass = async (data) => {
      const DateSubmit = {
          Username: data.inputName,
          Password: data.inputPassword,
          PasswordNew: data.inputPasswordNew,
          Type: 2
      }
      try {
          dispatch({
              type: LoginAction.CHANGE_PASSWORD,
              data: DateSubmit,
              onSuccess: (data) => {
                  Utils.showSuccessToast({
                      message: "Đổi mật khẩu thành công, vui lòng đăng nhập lại",
                  })
                  setLocation()
                  // router.push({
                  //   pathname: RouterPath.LOGIN,
                  // })
              },
              onError: (data) => {
                  Utils.showErrorToast({
                    message: 
                    `Đổi mật khẩu thất bại: ${getErrorMessage(data)}`,
                  })
              },
          })
      } catch (err) {
          console.log(err)
      }
  };

    const onSubmit = (data) => {
      // data = { gender: gender,...data}
      excuteChangePass(data)
    }
    return (
    <form onSubmit={handleSubmit(onSubmit)}
      style={{ display: "flex", flexDirection: "column", maxWidth: "900xp" }}
    >
      <div className={styles.ChangePage}>
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
          Thông tin đổi mật khẩu
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
                maxLength: 20,
                minLength: 8,
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
                Tên đăng nhập tối thiểu 8 kí tự!{" "}
              </p>
            )}
            {errors?.inputName?.type === "maxLength" && (
              <p style={{ color: "red", marginBottom: 0 }}>
                Tên đăng nhập tối đa 20 kí tự!{" "}
              </p>
            )}
          </div>
          <div>
            <TextLabel>Mật khẩu<p style={{ margin: 0 }}>*</p></TextLabel>
            <Controller
              control={control}
              rules={{
                required: true,
                maxLength: 20,
                minLength: 8,
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
                Mật khẩu tối thiểu 8 kí tự!{" "}
              </p>
            )}
            {errors?.inputPassword?.type === "maxLength" && (
              <p style={{ color: "red", marginBottom: 0 }}>
                Mật khẩu tối đa 20 kí tự!{" "}
              </p>
            )}
          </div>
          <div>
            <TextLabel>Mật khẩu mới<p style={{ margin: 0 }}>*</p></TextLabel>
            <Controller
              control={control}
              rules={{
                required: true,
                maxLength: 20,
                minLength: 8,
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
              name="inputPasswordNew"
            />
            {errors?.inputPasswordNew?.type === "required" && (
              <p style={{ color: "red", marginBottom: 0 }}>
                Vui lòng nhập mật khẩu mới!{" "}
              </p>
            )}
            {errors?.inputPasswordNew?.type === "minLength" && (
              <p style={{ color: "red", marginBottom: 0 }}>
                Mật khẩu tối thiểu 8 kí tự!{" "}
              </p>
            )}
            {errors?.inputPasswordNew?.type === "maxLength" && (
              <p style={{ color: "red", marginBottom: 0 }}>
                Mật khẩu tối đa 20 kí tự!{" "}
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
          Đổi mật khẩu
        </Button>
      </div>
    </form>
  );
}

export default ChangePage;