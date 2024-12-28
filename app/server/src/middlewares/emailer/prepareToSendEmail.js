/* eslint-disable no-console */
const { sendEmail } = require('./sendEmail')

/**
 * Prepares to send email
 * @param {string} user - user object
 * @param {string} subject - subject
 * @param {string} htmlMessage - html message
 */
const prepareToSendEmail = (user = {}, subject = '') => {
  user = {
    name: user.name,
    email: user.email,
    verification: user.verification
  }
  subject = 'Dự án Chatbot tư vấn FIT-HCMUS'
  const html = `
  <h1>Thư Xác Nhận</h1>
  
  <p>Kính chào quý thầy cô/bạn sinh viên,</p>
  
  <p>Để hoàn tất việc <u>xác minh tài khoản</u> , vui lòng sử dụng click vào đường dẫn bên dưới: </p>
  
  <strong> Liên kết: </strong> 
  <a href="${ process.env.APP_PROTOCOL }://${ process.env.APP_HOST }:${ process.env.APP_PORT }/verifyEmail?_id=${user.verification}" target="_blank">Liên Kết Xác Thực Tài Khoản</a>
  
  <p>Mã sẽ hết hiệu lực vào 12h tối cùng ngày và tài khoản này sẽ bị xóa nếu chưa được xác thực</p>
  
  <strong>Dự án Chatbot tư vấn FIT-HCMUS</strong>
  <p>------------------------</p>
  <p>Nhóm sinh viên thực hiện: </p>
  <p>Nguyễn Duy Đăng Khoa, Mạch Vĩ Kiệt</p>
  
  Trân trọng,
    <footer>
      <br>Mọi thắc mắc và phản hồi bạn có thể liên hệ với chúng tôi qua chính email này!</br>
    </footer>
  `
  const data = {
    user,
    subject,
    htmlMessage : html
  }
  if (process.env.NODE_ENV === 'production') {
    sendEmail(data, (messageSent) =>
      messageSent
        ? console.log(`Email SENT to: ${user.email}`)
        : console.log(`Email FAILED to: ${user.email}`)
    )
  } else if (process.env.NODE_ENV === 'development') {
    console.log('Xác thực email thành công')
  }
}

module.exports = { prepareToSendEmail }
