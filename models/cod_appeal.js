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


     function send(e,course,teacher) {
        const mail = {
            // 发件人 邮箱  '昵称<发件人邮箱>'
            from: '学生成绩管理系统<3026683545@qq.com>',
            // 主题
            subject: '成绩申诉',
            // 收件人 的邮箱 可以是其他邮箱 不一定是qq邮箱
            to: '"'+e+'"',
            // 内容
            text: `成绩申诉成功` ,
            //这里可以添加html标签
            html: `
            <p>同学你好！</p>
            <p>你申诉的<strong style="color: red;">${course}</strong>成绩 <strong style="color: skyblue;">${teacher}</strong>老师已受理完成 你可登陆学生查询系统进行查看</p>`
         }

         return new Promise((resolve, reject)=>{
            transporter.sendMail(mail, (err, data) => {
                if(err){
                    reject()    //出错
                    console.log(err);
                }else{
                    resolve()    //成功
                }
            })
        })
     }

     function back(e,course,teacher) {
        const mail = {
            // 发件人 邮箱  '昵称<发件人邮箱>'
            from: '学生成绩管理系统<3026683545@qq.com>',
            // 主题
            subject: '成绩申诉',
            // 收件人 的邮箱 可以是其他邮箱 不一定是qq邮箱
            to: '"'+e+'"',
            // 内容
            text: `成绩申诉成功` ,
            //这里可以添加html标签
            html: `
            <p>同学你好！</p>
            <p>你申诉的<strong style="color: red;">${course}</strong>成绩已被 <strong style="color: skyblue;">${teacher}</strong>老师驳回</p>`
         }

         return new Promise((resolve, reject)=>{
            transporter.sendMail(mail, (err, data) => {
                if(err){
                    reject()    //出错
                    console.log(err);
                }else{
                    resolve()    //成功
                }
            })
        })
     }

     module.exports = { send , back }

