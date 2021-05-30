const nodemailer = require('nodemailer')

    const config = {
        // 163邮箱 为smtp.163.com
        host: 'smtp.qq.com',//这是qq邮箱
        //端口
        port: 465,
        auth: {
            // 发件人邮箱账号
            user: '3026683545@qq.com', 
            //发件人邮箱的授权码 这里可以通过qq邮箱获取 并且不唯一
            pass: 'yeeipzolhsjpdcdi'  
        }
     }
     
     
     const transporter = nodemailer.createTransport(config);


     function send(e,d) {
        const mail = {
            // 发件人 邮箱  '昵称<发件人邮箱>'
            from: 'hls<3026683545@qq.com>',
            // 主题
            subject: '找回密码',
            // 收件人 的邮箱 可以是其他邮箱 不一定是qq邮箱
            to: '"'+e+'"',
            // 内容
            text: `您的激活验证码为： 请24小时内有效，请谨慎保管。` ,
            //这里可以添加html标签
            html: `
            <p>你好！</p>
            <p>你正在进行密码修改操作</p>
            <p>你的验证码是：<strong style="color: #ff4e2a;">${d}</strong></p>
            <p>***该验证码5分钟内有效***</p>`
         }

         return new Promise((resolve, reject)=>{
            transporter.sendMail(mail, (err, data) => {
                if(err){
                    reject()    //出错
                }else{
                    resolve()    //成功
                }
            })
        })
     }

     module.exports = { send }

