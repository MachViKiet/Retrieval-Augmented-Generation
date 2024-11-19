export const getTime = (DateString) => {
    const date = new Date(DateString);

    // Lấy giờ, phút và xác định AM/PM
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';

    // Chuyển sang định dạng 12 giờ
    hours = hours % 12 || 12; // Nếu giờ là 0, chuyển thành 12

    // Định dạng chuỗi kết quả
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;
}