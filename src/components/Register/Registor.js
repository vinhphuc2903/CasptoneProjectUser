import React from "react";
import styles from "./Registor.module.scss";
import { TextLabel } from "@findxdn/erp-theme";
import { TextInput, CustomDateTimePickerX } from "../CustomMUI/ListCustomMui";
import { Button } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from 'react-redux';
import LoginAction from "../../redux/login/action";
import Utils from "../../utils/Utils";
import getErrorMessage from "../../utils/ErrorConstant";
import * as RouterPath from "../../router/RouterPath"
import useRouter from "../../hooks/use-router";

function Registor(props) {
  const {} = props;

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    watch,
  } = useForm();
  const router= useRouter()

  const dispatch = useDispatch();

  const [gender, setGender] = React.useState(0);

  const isValidPhone = (value) =>
    value &&
    !/(090|093|070|072|079|077|076|078|089|088|091|094|083|084|085|081|082|032|033|034|035|036|037|038|039|086|096|097|098|099|059|092|052|056|058)+([0-9]{7})\b/i.test(
      value
    )
      ? "Số điện thoại không hợp lệ"
      : undefined;
  const isValidEmail = (email) =>
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );

  const handleEmailValidation = (email) => {
    const isValid = isValidEmail(email);
    return isValid;
  };

  const handlePhoneValidation = (phone) => {
    const isValid = isValidPhone(phone);
    return isValid;
  };

  const onSubmit = (data) => {
    var genderData = 'M'
    switch(gender)
    {
      case 0:
        genderData = 'M'
        break;
      case 1:
        genderData = 'F'
        break;
      case 2:
        genderData = 'O'
        break;
      default:
        genderData = ''
    }

    data = { gender: genderData, ...data };
    excuteLogin(data)
    // handleSubmitData(data)
  };

  const password = watch("password");
  const excuteLogin = async (data) => {
    const DateSubmit = {
      Username: data.username,
      Password: data.password,
      Email: data.email,
      DateOfBirth: data.birthDay,
      Phone: data.phone,
      Gender: data.gender,
      Name: data.name
    };
    try {
      dispatch({
        type: LoginAction.SUBMIT_REGISTER,
        data: DateSubmit,
        onSuccess: (data) => {
          Utils.showSuccessToast({
            message: "Đăng kí thành công",
          });
          router.push({
            pathname: RouterPath.LOGIN,
            // page: newValue,
            params: {
                page: 0,
            }
        })
        },
        onError: (data) => {
          Utils.showErrorToast({
            message:
              `Đăng ký thất bại: ${getErrorMessage(data)}`,
          });
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "flex", flexDirection: "column", maxWidth: "900xp" }}
    >
      <div className={styles.registor}>
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
          Thông tin đăng ký
        </div>
        <div className={styles.Details}>
          <div>
            <TextLabel>
              Họ & Tên <p style={{ margin: 0 }}>*</p>
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
              name="name"
            />
            {errors?.name?.type === "required" && (
              <p style={{ color: "red", marginBottom: 0 }}>
                Vui lòng nhập họ & tên!{" "}
              </p>
            )}
            {errors?.name?.type === "minLength" && (
              <p style={{ color: "red", marginBottom: 0 }}>
                Họ & tên tối thiểu 8 ký tự!{" "}
              </p>
            )}
            {errors?.name?.type === "maxLength" && (
              <p style={{ color: "red", marginBottom: 0 }}>
                Họ & tên tối đa 20 ký tự!{" "}
              </p>
            )}
          </div>
          <div>
            <TextLabel>
              Mật khẩu<p style={{ margin: 0 }}>*</p>
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
                  variant="outlined"
                  InputLabelProps={{ style: { fontSize: 13 } }}
                  sx={{ width: "300px" }}
                  isPassword
                />
              )}
              name="password"
            />
            {errors?.password?.type === "required" && (
              <p style={{ color: "red", marginBottom: 0 }}>
                Vui lòng nhập mật khẩu!{" "}
              </p>
            )}
            {errors?.password?.type === "minLength" && (
              <p style={{ color: "red", marginBottom: 0 }}>
                Mật khẩu tối thiểu 8 ký tự!{" "}
              </p>
            )}
            {errors?.password?.type === "maxLength" && (
              <p style={{ color: "red", marginBottom: 0 }}>
                Mật khẩu tối đa 20 ký tự!{" "}
              </p>
            )}
          </div>
          <div>
            <TextLabel>
              Tên đăng nhập<p style={{ margin: 0 }}>*</p>
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
                  label="   "
                  variant="outlined"
                  InputLabelProps={{ style: { fontSize: 13 } }}
                  sx={{ width: "300px" }}
                />
              )}
              name="username"
            />
            {errors?.username?.type === "required" && (
              <p style={{ color: "red", marginBottom: 0 }}>
                Vui lòng nhập tên đăng nhập!{" "}
              </p>
            )}
            {errors?.username?.type === "minLength" && (
              <p style={{ color: "red", marginBottom: 0 }}>
                Tên đăng nhập tối thiểu 8 ký tự!{" "}
              </p>
            )}
            {errors?.username?.type === "maxLength" && (
              <p style={{ color: "red", marginBottom: 0 }}>
                Tên đăng nhập tối đa 20 ký tự!{" "}
              </p>
            )}
          </div>
          <div>
            <TextLabel>
              Nhập lại mật khẩu<p style={{ margin: 0 }}>*</p>
            </TextLabel>
            <Controller
              control={control}
              rules={{
                required: true,
                minLength: 8,
                validate: (value) =>
                  value === password || "Mật khẩu nhập lại không trùng khớp!",
              }}
              render={({ field: { ref, ...rest } }) => (
                <TextInput
                  {...rest}
                  isPassword
                  variant="outlined"
                  InputLabelProps={{ style: { fontSize: 13 } }}
                  sx={{ width: "300px" }}
                />
              )}
              name="passwordUpdate"
            />
            {errors?.passwordUpdate?.type === "required" && (
              <p style={{ color: "red", marginBottom: 0 }}>
                Vui lòng nhập lại mật khẩu!{" "}
              </p>
            )}
            {errors?.passwordUpdate?.type === "minLength" && (
              <p style={{ color: "red", marginBottom: 0 }}>
                Mật khẩu phải có ít nhất 8 ký tự!{" "}
              </p>
            )}
            {errors?.passwordUpdate?.message && (
              <p style={{ color: "red", marginBottom: 0 }}>
                {errors.passwordUpdate.message}
              </p>
            )}
          </div>
          <div
            style={{
              maxWidth: "300px",
              minHeight: "40px",
            }}
          >
            <TextLabel>
              Ngày sinh<p style={{ margin: 0 }}>*</p>
            </TextLabel>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              defaultValue={null}
              render={({ field: { ref, ...rest } }) => (
                <CustomDateTimePickerX
                  {...rest}
                  variant="outlined"
                  label="DD/M/YYYY"
                  inputFormat="dd/MM/yyyy"
                  InputLabelProps={{ style: { fontSize: 13, height: "40px" } }}
                  sx={{ width: "300px", height: "40px" }}
                />
              )}
              name="birthDay"
            />
            {errors?.birthDay?.type === "required" && (
              <p style={{ color: "red", marginBottom: 0 }}>
                Vui lòng chọn ngày sinh!{" "}
              </p>
            )}
          </div>
          <div>
            <TextLabel>
              Số điện thoại<p style={{ margin: 0 }}>*</p>
            </TextLabel>
            <Controller
              control={control}
              rules={{
                required: true,
                validate: handlePhoneValidation,
              }}
              render={({ field: { ref, ...rest } }) => (
                <TextInput
                  {...rest}
                  variant="outlined"
                  InputLabelProps={{ style: { fontSize: 13 } }}
                  sx={{ width: "300px" }}
                />
              )}
              name="phone"
            />
            {errors?.phone?.type === "required" && (
              <p style={{ color: "red", marginBottom: 0 }}>
                Vui lòng nhập số điện thoại!{" "}
              </p>
            )}
            {errors?.phone?.type === "validate" && (
              <p style={{ color: "red", marginBottom: 0 }}>
                Vui lòng nhập số điện thoại đúng định dạng!{" "}
              </p>
            )}
          </div>
          <div>
            <FormControl>
              <TextLabel>
                Giới tính<p style={{ margin: 0 }}>*</p>
              </TextLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={gender}
                onChange={(e, id) => {
                  setGender(parseInt(id, 10));
                }}
              >
                <FormControlLabel value={0} control={<Radio />} label="Nam" />
                <FormControlLabel value={1} control={<Radio />} label="Nữ" />
                <FormControlLabel value={2} control={<Radio />} label="Khác" />
              </RadioGroup>
            </FormControl>
          </div>
          <div>
            <TextLabel>
              Email<p style={{ margin: 0 }}>*</p>
            </TextLabel>
            <Controller
              control={control}
              rules={{
                required: true,
                validate: handleEmailValidation,
              }}
              render={({ field: { ref, ...rest } }) => (
                <TextInput
                  {...rest}
                  variant="outlined"
                  InputLabelProps={{ style: { fontSize: 13 } }}
                  sx={{ width: "300px" }}
                />
              )}
              name="email"
            />
            {errors?.email?.type === "required" && (
              <p style={{ color: "red", marginBottom: 0 }}>
                Vui lòng nhập email để đăng ký!{" "}
              </p>
            )}
            {errors?.email?.type === "validate" && (
              <p style={{ color: "red", marginBottom: 0 }}>
                Vui lòng nhập email đúng định dạng!{" "}
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
          Lưu thông tin đăng ký
        </Button>
      </div>
    </form>
  );
}

export default Registor;
