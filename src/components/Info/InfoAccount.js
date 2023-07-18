import React, { useEffect } from "react";
import styles from "./InforAccount.module.scss";
import { TextLabel } from "@findxdn/erp-theme";
import {
  TextInput,
  CustomDateTimePickerX,
  CustomAutocomplete,
} from "../CustomMUI/ListCustomMui";
import { Button } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useForm, Controller } from "react-hook-form";
import LoginAction from "../../redux/login/action";
import { useDispatch } from "react-redux";
import AddressAction from "../../redux/address/action";
import { useSelector } from "react-redux";
import Utils from "../../utils/Utils";
import getErrorMessage from "../../utils/ErrorConstant";

function InforAccount(props) {
  const {} = props;

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const [gender, setGender] = React.useState(0);
  const dispatch = useDispatch();
  var userLogin = useSelector((state) => state?.Login?.userLogin);
  // console.log(userLogin)
  useEffect(() => {
    if( userLogin !== null && typeof userLogin !== 'undefined' && userLogin?.length != 0)
    {
      getCommunity(userLogin?.districtId)
      getDistrict(userLogin?.provinceId)
      setValue("name", userLogin?.name);
      setValue("username", userLogin?.username);
      setValue("phone", userLogin?.phone);
      setValue("address", userLogin?.address);
      setValue("province", userLogin?.provinceId);
      setValue("district", userLogin?.districtId);
      setValue("commune", userLogin?.communeId);
      setValue("email", userLogin?.email);
      setValue("point", userLogin?.point);
      setValue("rank", userLogin?.rank);
      setValue("birthDay", userLogin?.dateOfBirth); //moment(data?.data?.result?.birthDay).format("DD/MM/YYYY"))
      setValue("avatarUrl", userLogin?.avatarUrl);
      // eslint-disable-next-line default-case
      switch (userLogin?.gender) {
        case "M":
          setValue("gender", 0);
          break;
        case "F":
          setValue("gender", 1);
          break;
        case "O":
          setValue("gender", 2);
          break;
      }
    }
  }, [userLogin])
  // const getUseInfor = async () => {
  //   dispatch({
  //     type: LoginAction.GET_USER_DETAIL,
  //     onSuccess: (data) => {
  //       getCommunity(data?.districtId)
  //       getDistrict(data?.provinceId)
  //       setValue("name", data?.name);
  //       setValue("username", data?.username);
  //       setValue("phone", data?.phone);
  //       setValue("address", data?.address);
  //       setValue("province", data?.provinceId);
  //       setValue("district", data?.districtId);
  //       setValue("commune", data?.communeId);
  //       setValue("email", data?.email);
  //       setValue("birthDay", data?.dateOfBirth); //moment(data?.data?.result?.birthDay).format("DD/MM/YYYY"))
  //       setValue("avatarUrl", data?.avatarUrl);
  //       // eslint-disable-next-line default-case
  //       switch (data?.gender) {
  //         case "M":
  //           setValue("gender", 0);
  //           break;
  //         case "F":
  //           setValue("gender", 1);
  //           break;
  //         case "O":
  //           setValue("gender", 2);
  //           break;
  //       }
  //       // setGender(parseInt(data?.gender, 10))
  //     },
  //   });
  // };

  const address = useSelector((state) => state.Address);
  const getProvice = async () => {
    dispatch({
      type: AddressAction.GET_PROVINCE,
    });
  };
  const listProvince = address?.provinces?.map((item) => ({
    key: item?.id,
    label: item?.name,
  }));

  const listDistrict = address?.districts?.map((item) => ({
    key: item?.id,
    label: item?.name,
  }));

  const listCommune = address?.communes?.map((item) => ({
    key: item?.id,
    label: item?.name,
  }));
  const getDistrict = async (id) => {
    dispatch({
      type: AddressAction.GET_DISTRICT,
      data: { provinceId: id },
    });
  };

  const getCommunity = async (id) => {
    dispatch({
      type: AddressAction.GET_COMMUNITY,
      data: { districtId: id },
    });
  };
  React.useEffect(() => {
    // getUseInfor();
    getProvice();
  }, []);
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

  const handleUpdateData = async (data) => {
    var genderData = 'M'
    switch(data?.gender)
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
    const DateSubmit = {
      Username: data.username,
      Password: data.password,
      Email: data.email,
      DateOfBirth: data.birthDay,
      Phone: data.phone,
      Gender: genderData,
      Name: data.name,
      Address: data.address,
      ProvinceId: data.province,
      DistrictId: data.district,
      CommuneId: data.commune,
    };
    try {
      dispatch({
        type: LoginAction.CHANGE_PROFILE,
        data: DateSubmit,
        onSuccess: () => {
          Utils.showSuccessToast({
            message: "Cập nhật tài khoản thành công",
          });
          dispatch({
            type: LoginAction.GET_USER_DETAIL,
          });
          // getUseInfor()
        },
        onError: (data) => {
          Utils.showErrorToast({
            message:
              `Cập nhật tài khoản thất bại: ${getErrorMessage(data)}`,
          });
        },
      });
    } catch (err) {
      console.log(err);
    }
};

  const onSubmit = (data) => {
    data = { gender: gender,...data}
    handleUpdateData(data)
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "flex", flexDirection: "column", width: "60%" }}
    >
      <div className={styles.infoDetails}>
        <div
          style={{
            color: "grey",
            borderBottom: "0.2px solid grey",
            fontSize: "25px",
            fontWeight: "600px",
            margin: "25px",
            maxWidth: "800xp",
          }}
        >
          Thông tin cá nhân
        </div>
        <div className={styles.Details}>
          <div>
            <TextLabel>Họ & Tên</TextLabel>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { ref, ...rest } }) => (
                <TextInput
                  {...rest}
                  // label='Họ '
                  maxLength={30}
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
                Vui lòng nhập họ!{" "}
              </p>
            )}
          </div>
          <div>
            <TextLabel>Tên đăng nhập</TextLabel>
            <Controller
              control={control}
              rules={{
                required: true,
                maxLength: 20,
              }}
              render={({ field: { ref, ...rest } }) => (
                <TextInput
                  {...rest}
                  label="   "
                  variant="outlined"
                  maxLength={20}
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
          </div>
          <div>
            <TextLabel>Địa chỉ</TextLabel>
            <Controller
              control={control}
              rules={{
                required: true,
                maxLength: 50,
              }}
              render={({ field: { ref, ...rest } }) => (
                <TextInput
                  {...rest}
                  label="   "
                  variant="outlined"
                  maxLength={50}
                  InputLabelProps={{ style: { fontSize: 13 } }}
                  sx={{ width: "300px" }}
                />
              )}
              name="address"
            />
            {errors?.address?.type === "required" && (
              <p style={{ color: "red", marginBottom: 0 }}>
                Vui lòng nhập địa chỉ!{" "}
              </p>
            )}
          </div>
          <div>
            <TextLabel>Tỉnh/ Thành phố</TextLabel>
            <Controller
              control={control}
              rules={{
                required: true,
                maxLength: 50,
              }}
              render={({ field: { ref, onChange, ...rest } }) => (
                <CustomAutocomplete
                  {...rest}
                  placeholder="Chọn Tỉnh/ Thành phố"
                  variant="outlined"
                  options={listProvince}
                  onChange={(value) => {
                    onChange(value);
                    getDistrict(value == null ? 'xxx' : value)
                    getCommunity(value == null ? 'xxx' : value)
                    setValue('district', null)
                    setValue('commune', null)
                  }}
                  maxLength={50}
                  InputLabelProps={{ style: { fontSize: 13 } }}
                  sx={{ width: "300px" }}
                />
              )}
              name="province"
            />
            {errors?.province?.type === "required" && (
              <p style={{ color: "red", marginBottom: 0 }}>
                Vui lòng chọn tỉnh!{" "}
              </p>
            )}
          </div>
          <div>
            <TextLabel>Quận/ Huyện</TextLabel>
            <Controller
              control={control}
              rules={{
                required: true,
                maxLength: 50,
              }}
              render={({ field: { ref, onChange, ...rest } }) => (
                <CustomAutocomplete
                  {...rest}
                  placeholder="Chọn Quận/ Huyện"
                  variant="outlined"
                  options={listDistrict}
                  onChange={(value) => {
                    onChange(value)
                    if(value == null)
                    {
                      getCommunity('xxx')
                      setValue('commune', null)
                    }
                    else {
                      getCommunity(value)
                    }
                  }}
                  maxLength={50}
                  InputLabelProps={{ style: { fontSize: 13 } }}
                  sx={{ width: "300px" }}
                />
              )}
              name="district"
            />
            {errors?.district?.type === "required" && (
              <p style={{ color: "red", marginBottom: 0 }}>
                Vui lòng chọn quận, huyện!{" "}
              </p>
            )}
          </div>
          <div>
            <TextLabel>Phường/ Xã</TextLabel>
            <Controller
              control={control}
              rules={{
                required: true,
                maxLength: 50,
              }}
              render={({ field: { ref, ...rest } }) => (
                <CustomAutocomplete
                  {...rest}
                  placeholder="Chọn Phường/ Xã"
                  variant="outlined"
                  options={listCommune}
                  maxLength={50}
                  InputLabelProps={{ style: { fontSize: 13 } }}
                  sx={{ width: "300px" }}
                />
              )}
              name="commune"
            />
            {errors?.commune?.type === "required" && (
              <p style={{ color: "red", marginBottom: 0 }}>
                Vui lòng chọn phường, xã!{" "}
              </p>
            )}
          </div>
          <div
            style={{
              minHeight: "40px",
            }}
          >
            <TextLabel>Ngày sinh</TextLabel>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
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
            <TextLabel>Hạng khách hàng</TextLabel>
            <Controller
              control={control}
              render={({ field: { ref, ...rest } }) => (
                <TextInput
                  {...rest}
                  // label='Họ '
                  maxLength={30}
                  disablePortal
                  disabled
                  variant="outlined"
                  InputLabelProps={{ style: { fontSize: 13 } }}
                  sx={{ width: "300px" }}
                />
              )}
              name="rank"
            />
          </div>
          <div>
            <TextLabel>Số điện thoại</TextLabel>
            <Controller
              control={control}
              rules={{
                required: true,
                validate: handlePhoneValidation,
              }}
              render={({ field: { ref, onChange, ...rest } }) => (
                <TextInput
                  {...rest}
                  maxLength={10}
                  variant="outlined"
                  onChange={(e, value) => {
                    if (
                      e.nativeEvent.data >= "0" &&
                      e.nativeEvent.data <= "9"
                    ) {
                      onChange(e);
                    }
                  }}
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
            <TextLabel>Điểm tích lũy</TextLabel>
            <Controller
              control={control}
              render={({ field: { ref, ...rest } }) => (
                <TextInput
                  {...rest}
                  label="   "
                  disabled  
                  variant="outlined"
                  maxLength={20}
                  InputLabelProps={{ style: { fontSize: 13 } }}
                  sx={{ width: "300px" }}
                />
              )}
              name="point"
            />
          </div>
          <div>
            <FormControl>
              <TextLabel>Giới tính</TextLabel>
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
            <TextLabel>Email</TextLabel>
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
                  maxLength={30}
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
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          width: "100%",
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
          Cập nhật thông tin cá nhân
        </Button>
      </div>
    </form>
  );
}

export default InforAccount;
