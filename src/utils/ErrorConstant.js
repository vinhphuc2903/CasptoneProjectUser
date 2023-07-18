import React from "react";

function getErrorMessage(errorCode) {
    switch (errorCode) {
        case "E001":
            return "Tên đăng nhập hoặc mật khẩu không chính xác, vui lòng nhập lại.";
        case "E002":
            return "Số điện thoại đã tồn tại.";
        case "E003":
            return "Email hoặc tên đăng nhập đã tồn tại.";
        case "E004":
            return "Tên đăng nhập đã tồn tại.";
        case "E005":
            return "Giới tính không tồn tại.";
        case "E006":
            return "Suất chiếu đã tồn tại.";
        case "E007":
            return "Film dài hơn so với thời gian chiếu.";
        case "E008":
            return "Email hoặc tên đăng nhập đã tồn tại.";
        case "E009":
            return "Độ dài của tên đăng nhập ít nhất 6 kí tự.";
        case "E010":
            return "Tài khoản của bạn không có quyền thực hiện chức năng này.";
        case "E011":
            return "Suất chiếu phải nằm trong từ 8h => 25h hôm qua.";
        case "E012":
            return "Chỗ ngồi đã được chọn hoặc thanh toán, vui lòng chọn lại chỗ ngồi.";
        case "E013":
            return "Suất chiếu không tồn tại, vui lòng kiểm tra lại.";
        case "E014":
            return "Đồ ăn đang tạm ngưng bán hoặc đã hết.";
        case "E015":
            return "Vui lòng đăng nhập để thực hiện chức năng này.";
        case "E016":
            return "Vui lòng chọn vé để tiếp tục.";
        case "E017":
            return "Đã quá hạn thời gian thanh toán, vui lòng tạo đơn hàng mới.";
        case "E018":
            return "Tên đã tồn tại.";
        case "E019":
            return "Phòng chiếu không đã tồn tại.";
        case "E020":
            return "Vui lòng tạo tối đa 7 ngày.";
        case "E021":
            return "Ngày chiếu từ phải lớn ngày ngày chiếu đến.";
        case "E022":
            return "Phim chiếu không tồn tại.";
        case "E023":
            return "Ngày bắt đầu chiếu lại phải lớn hơn ngày tạm hoãn.";
        case "E024":
            return "Ngày gia hạn phải lớn hơn ngày kết thúc.";
        case "E025":
            return "Vui lòng chọn ngày gia hạn khi chọn ngày bắt đầu lại để tiếp tục chiếu phim.";
        case "E026":
            return "Ngày phát hành phải nhỏ hơn ngày bắt đầu.";
        case "E027":
            return "Nhân viên không tồn tại.";
        case "E028":
            return "Suất chiếu từ phải lớn hơn ngày hiện tại.";
        case "E029":
            return "Khách hàng không tồn tại.";
            default:
        return "Lỗi không xác định.";
    }
}

export default getErrorMessage; 