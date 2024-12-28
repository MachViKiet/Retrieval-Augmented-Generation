var nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mvkiet21@clc.fitus.edu.vn',
    pass: 'uboy zuwd vpjf cyjl'
  }
})
const subject = 'Dự án Chatbot tư vấn FIT-HCMUS'
const html = `
<h1>Thư Xác Nhận</h1>
Kính chào quý thầy cô/bạn sinh viên,

<p>Để hoàn tất việc đăng ký, vui lòng sử dụng mã đăng ký bên dưới:</p>

<a>a06280be-209a-4709-aca7-b66b0e978cd0</a>

<p>Mã sẽ hết hiệu lực vào 12h tối cùng ngày và tài khoản này sẽ bị xóa nếu chưa được xác thực</p>

<p>Trân trọng,</p>

<h3>Dự án Chatbot tư vấn FIT-HCMUS</h3>
------------------------
<br>Nhóm sinh viên thực hiện: </br>
<p>Nguyễn Duy Đăng Khoa, Mạch Vĩ Kiệt</p>
`
var mailOptions = {
  from: 'UniBot-KHTN (2024) <machkiet2003@gmail.com>',
  to: 'machkiet252003@gmail.com',
  subject,
  html:  `
<h1>Thư Xác Nhận</h1>

<p>Kính chào quý thầy cô/bạn sinh viên,</p>

<p>Để hoàn tất việc <em>xác minh tài khoản</em> , vui lòng sử dụng click vào đường dẫn bên dưới: </p>

<strong> Liên kết: </strong> 
<a href="https://nodemailer.com" target="_blank">a06280be-209a-4709-aca7-b66b0e978cd0</a>

<p>Mã sẽ hết hiệu lực vào 12h tối cùng ngày và tài khoản này sẽ bị xóa nếu chưa được xác thực</p>

<strong>Dự án Chatbot tư vấn FIT-HCMUS</strong>
<p>------------------------</p>
<p>Nhóm sinh viên thực hiện: </p>
<p>Nguyễn Duy Đăng Khoa, Mạch Vĩ Kiệt</p>

Trân trọng,
  <footer>
    <br>Mọi thắc mắc và phản hồi bạn có thể liên hệ với chúng tôi qua email này!</br>
  </footer>
`
}

transporter.sendMail(mailOptions, function(error, info) {
  if (error) {
    console.log(error)
  } else {
    console.log('Email sent: ' + info.response)
  }
})