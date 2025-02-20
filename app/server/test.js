/* eslint-disable no-console */
var nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mvkiet21@clc.fitus.edu.vn',
    pass: 'uboy zuwd vpjf cyjl'
  }
})
const subject = 'Dự án Chatbot tư vấn FIT-HCMUS'
var mailOptions = {
  from: 'UniBot-KHTN (2024) <machkiet2003@gmail.com>',
  to: '2112734@student.hcmus.edu.vn',
  subject,
  html: `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mã Xác Minh</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 10px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .header {
            background: #007bff;
            color: #ffffff;
            text-align: center;
            padding: 20px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            font-size: 16px;
            color: #333333;
            line-height: 1.5;
        }
        .otp {
            display: block;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            color: #007bff;
            margin: 20px 0;
        }
        .footer {
            background: #f4f4f4;
            text-align: center;
            padding: 10px;
            font-size: 14px;
            color: #777777;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Mã Xác Minh Của Bạn</h1>
        </div>
        <div class="content">
            <p>Xin chào [Tên người nhận],</p>
            <p>Bạn vừa yêu cầu một mã xác minh để [lý do gửi mã: đăng nhập, đăng ký, xác nhận giao dịch, v.v.]. Đây là mã xác minh của bạn:</p>
            <div class="otp">[MÃ XÁC MINH]</div>
            <p>Vui lòng sử dụng mã này trong vòng <strong>10 phút</strong>. Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này hoặc liên hệ với chúng tôi để được hỗ trợ.</p>
            <p>Trân trọng,</p>
            <p><strong>[Tên công ty/dịch vụ]</strong></p>
        </div>
        <div class="footer">
            <p>Đây là email tự động, vui lòng không trả lời email này.</p>
            <p>Nếu bạn cần hỗ trợ, vui lòng liên hệ: [email hỗ trợ]</p>
        </div>
    </div>
</body>
</html>

  `
}

transporter.sendMail(mailOptions, function(error, info) {
  if (error) {
    console.log('Gởi Email Thất Bại: ', error)
  } else {
    console.log('Gởi Email Thành Công: ' + info.response)
  }
})