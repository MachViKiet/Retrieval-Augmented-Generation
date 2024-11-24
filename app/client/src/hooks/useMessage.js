const ErrorMessage = {
    'WRONG_PASSWORD' : 'Tài Khoản hoặc mật khẩu không hợp lệ',
    'USER_DOES_NOT_EXIST': 'Tài Khoản hoặc mật khẩu không hợp lệ',
    'ERR_CONNECTION_REFUSED': 'Server Không Hoạt Động'
}

const Code = {
    'DEPT-GV' : 'Ban Giáo Vụ',
    'female': 'Nam',
    'school_year': 'Năm Học',
    'keywords': 'Từ Khóa',
    'majors': 'Chuyên Ngành',
    'subjects_code': 'Mã Môn Học',
    'subjects_name': 'Tên Môn Học'
}

export const useErrorMessage = (code) => {
    return ErrorMessage[code] ? ErrorMessage[code] : code
}

export const useCode = (code) => {
    return Code[code] ? Code[code] : code
}

const message = {
    useErrorMessage,
    useCode
}

export default message