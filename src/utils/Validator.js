import _ from "lodash"
import EmployeeFactory from '../../src/redux/employee/factory'
import AppConfig from "./AppConfig"
import { EMAIL, EMPLOYEE_ID, PHONE, PROFILE_CODE, TIME_SHEET_CODE, USERNAME } from "./Constants"
import MESSAGE_ERROR from "./ErrorCode"

export default class Validator {
    static genValidate = (validate, fieldName) => {
        let _validate = {}
        validate.forEach((e, i) => {
            _validate[`${fieldName}_${i}`] = e
        })
        
        return _validate
    }

    static asyncValidate =  (fieldName, UserId)=> async(value) => {
        // 1: Check username
        // 2: Check email
        // 3: Check phone
        // 4: Check mã nhân viên
        // 5: Check mã chấm công
        // 6: Check mã hồ sơ
        let type = 0;
        switch (fieldName) {
            case USERNAME:
                type = 1;
                break;
            case EMAIL:
                type = 2;
                break;
            case PHONE:
                type = 3;
                break;
            case EMPLOYEE_ID:
                type = 4;
                break;
            case PROFILE_CODE:
                type = 5;
                break;
            case TIME_SHEET_CODE:
                type = 6;
                break;
            default:
                break;
        }
        const response = await EmployeeFactory.checkInfoEmployee({
            "Value": value,
            "UserId": Number(UserId),
            "Type": type
        });
        if(response){
            const message_error = MESSAGE_ERROR.find(msg => msg.Id == response?.MsgNo);
            return message_error?.Content
        }
        return null;
    }
    static required = (message) => (value) => {
        return value ? undefined : (message ||'* Không được để trống');
    }
    static maxLength = (max) => (value) =>
        value && value.length > max ? `* Không quá ${max} kí tự` : undefined;

    static email = (value) =>
        value && ! /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(value)
            ? 'Email không đúng định dạng'
            : undefined
    static regexSpace = (value) =>
        value && ! /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(value)
            ? 'Vui lòng nhập dúng dữ liệu'
            : undefined
    static Username = (value) =>
        value && !/^[a-zA-Z0-9-]+$/i.test(value)
            ? 'Tên tài khoản không được chứa kí tự đặc biệt'
            : undefined
    static phone = (value) =>
        value &&
  !/(090|093|070|072|079|077|076|078|089|088|091|094|083|084|085|081|082|032|033|034|035|036|037|038|039|086|096|097|098|099|059|092|052|056|058)+([0-9]{7})\b/i.test(
      value,
  )
            ? 'Số điện thoại không hợp lệ'
            : undefined
    static emoji = (value) =>
        value &&  /(u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]+)$/i.test(value)
            ? 'Vui lòng nhập dúng dữ liệu'
            : undefined
    static phoneRegex = (value) =>
        value && !/^[0-9]+$/i.test(value)
            ? 'Số điện thoại không đúng định dạng'
            : undefined
    static confirmPassword = (password) => (value) =>
        value != password ? 'Mật khẩu không trùng khớp' : undefined
    
    static passWord = (value) =>
        value && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/i.test(value)
            ? 'Mật khẩu phải có ít nhất 8 ký tự, ít nhất 1 ký tự thường - 1 ký tự viết hoa - 1 ký tự số - 1 ký tự đặc biệt'
            : undefined
    static CheckIdcard = (value) =>
        value && !/[0-9]+$/i.test(value)
            ? 'Căn cước công dân khẩu phải chứa số'
            : undefined
    static CheckNumberBank = (value) =>
        value && !/^[0-9]+$/i.test(value)
            ? 'Số tài khoản phải là chữ số'
            : undefined
    static CheckNumber = (value) =>
        value && /^[0-9]+$/i.test(value)
            ? 'Không được phép nhập'
            : undefined
    static checkSymbols = (value) => {
        return value && /[!$%^&*()_+|~=`{}\[\]:\/;<>?@#]/i.test(value)
            ? 'Không chứa kí tự đặc biệt'
            : undefined;
    };
    static Taxcode = (value) =>
        value && !/^[a-zA-Z0-9-]+$/i.test(value)
            ? 'Mã số thuế cá nhân không được chứa kí tự đặc biệt'
            : undefined
    static CheckUserNamBank = (value) =>
        value && !/[A-Z]+$/i.test(value)
            ? 'Tên Tài khoản phải được viết in hoa'
            : undefined
    static enterText = (value) =>
        value && !/[0-9]+$/i.test(value)
            ? 'Mã số cá nhân chỉ chứa ký tự số!'
            : undefined
    static checkMinAge = (value) => {
        return _calculateAge(value) < AppConfig.MIN_AGE
            ? `Phải đủ ${AppConfig.MIN_AGE} tuổi trở lên mới được đăng ký`
            : undefined;
    };
    static checkMaxDate = (value) => {
        return _calculateAge(value) > AppConfig.MAX_DATE
            ? `Ngày vào phải là ngày hiện tại, không được chọn ngày tương lai! `
            : undefined;
    };
    static checkNumber = (value) =>
        value && !/[0-9]+$/i.test(value)
            ? 'Chỉ chứa ký tự số!'
            : undefined
    // function _calculateAge(birthday) {
    //     // birthday is a date
    //     var ageDifMs = Date.now() - birthday.getTime();
    //     var ageDate = new Date(ageDifMs); // miliseconds from epoch
    //     return Math.abs(ageDate.getUTCFullYear() - 1970);
    // }            
}
function _calculateAge (birthday){
    var ageDifMs = Date.now() - new Date(birthday)?.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}
