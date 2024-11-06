const ErrorMessage = {
    'WRONG_PASSWORD' : 'Tài Khoản hoặc mật khẩu không hợp lệ',
    'USER_DOES_NOT_EXIST': 'Tài Khoản hoặc mật khẩu không hợp lệ'
}

export const useErrorMessage = (code) => {
    return ErrorMessage[code] ? ErrorMessage[code] : code
}

const message = {
    useErrorMessage
}

export default message