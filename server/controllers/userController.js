const User = require('../Model/User');
const Deposit = require('../Model/depositSchema');
const Widthdraw = require('../Model/widthdrawSchema');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");



// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '', };
  
    // duplicate email error
    if (err.code === 11000) {
      errors.email = 'that email is already registered';
      return errors;
    }
  
    // validation errors
    if (err.message.includes('user validation failed')) {
      // console.log(err);
      Object.values(err.errors).forEach(({ properties }) => {
        // console.log(val);
        // console.log(properties);
        errors[properties.path] = properties.message;
      });
    }
  
    return errors;
  }




  const maxAge = 3 * 24 * 60 * 60;
  const createToken = (id) => {
    return jwt.sign({ id }, 'piuscandothis', {
      expiresIn: maxAge
    });
  };




module.exports.homePage = (req, res)=>{
res.render("index")
}

module.exports.aboutPage = (req, res)=>{
    res.render("about")
    }

    module.exports.contactPage = (req, res)=>{
        res.render("contact")
   }
  
    
    module.exports.termsPage = (req, res)=>{
        res.render("market")
    }

    module.exports.registerPage = (req, res)=>{
        res.render("register")
    }
    
    module.exports.referralPage = (req, res)=>{
      res.render("referral")
  }

  module.exports.verifyPage = (req, res)=>{
    res.render("verify")
}

    

const sendEmail = async ( fullname, email,  password ) =>{
    

  try {
    const transporter =  nodemailer.createTransport({
      host: 'mail.globalflextyipsts.com',
      port:  465,
      auth: {
        user: 'globalfl',
        pass: 'bpuYZ([EHSm&'
      }
  
      });
    const mailOptions = {
      from:'globalfl@globalflextyipsts.com',
      to:email,
      subject: 'Welcome to CRYPTOGUIDETRADING1',
      html: `<p>Hello  ${fullname},<br>You are welcome to cryptoguidetrading1, we will help you make profit from the financial market after trading. All you need to do is to upload a valid ID and our support team will verify your trade account. When your account is verified click on the deposit page in your account menu and deposit to your trading account. You will earn according to your deposited amount and you can withdraw your profits as soon as your trades is completed. Good luck and we are waiting to get testimonies from you.

      Please note that your deposit is with the wallet address provided by cryptoguidetrading1 trading Platform, do not invest to any copied wallet address or bank details provided by any account manager or third party other than that provided by cryptoguidetrading1, hence your deposit is invalid.<br><br>
      
      <br><br>Best Regards,
      Management<br><br>
      
      Copyrights 2023 @ Crypto Guide Trading . All Rights Reserved..<br><br>
      Your login information:<br>Email: ${email}<br>Password: ${password}<br><br>You can login here: <br>  Contact us immediately if you did not authorize this registration.<br>Thank you.</p>`
  }
  transporter.sendMail(mailOptions, (error, info) =>{
    if(error){
        console.log(error);
        res.send('error');
    }else{
        console.log('email sent: ' + info.response);
        res.send('success')
    }
})


  } catch (error) {
    console.log(error.message);
  }
}


module.exports.register_post = async (req, res) =>{
    const {fullname,country, username, account, currency,leverage,tel,email, password, } = req.body;
    try {
        const user = await User.create({fullname,country,username, account,currency,leverage, tel, email,  password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });

        // if(user){
        //   sendEmail(req.body.fullname,req.body.email, req.body.password)
        // }else{
        //   console.log(error);
        // }
      }
    
        catch(err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
          }
    
}

module.exports.loginPage = (req, res)=>{
    res.render("login")
}

const loginEmail = async (  email ) =>{
    
  try {
    const transporter =  nodemailer.createTransport({
      host: 'mail.globalflextyipsts.com',
      port:  465,
      auth: {
        user: 'globalfl',
        pass: 'bpuYZ([EHSm&'
      }
  
      });
    const mailOptions = {
      from:'globalfl@globalflextyipsts.com',
      to:email,
      subject: 'Your account has recently been logged In',
      html: `<p>Greetings,${email}<br>your trading account has just been logged in by a device .<br>
     if it's not you kindly message support to terminate access  <br>You can login here: https://vitacoininvestments.com/login.<br>Thank you.</p>`
  }
  transporter.sendMail(mailOptions, (error, info) =>{
    if(error){
        console.log(error);
        res.send('error');
    }else{
        console.log('email sent: ' + info.response);
        res.send('success')
    }
})


  } catch (error) {
    console.log(error.message);
  }
}



module.exports.login_post = async(req, res) =>{
    const { email, password } = req.body;

    try {
      const user = await User.login(email, password);
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({ user: user._id });

        // if(user){
        //   loginEmail(req.body.email)
        // }else{
        //   console.log(error);
        // }
    } 
    catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
}

module.exports.loginAdmin = (req, res)=>{
    res.render("loginAdmin")
}

module.exports.dashboardPage = async(req, res) =>{
  res.render('dashboard');
}

const verifyEmail = async (email,fullname ) =>{
    
    try {
      const transporter =  nodemailer.createTransport({
        host: 'mail.globalflextyipsts.com',
        port:  465,
        auth: {
          user: 'globalfl',
          pass: 'bpuYZ([EHSm&'
        }
    
        });
      const mailOptions = {
        from:email,
        to:'globalfl@globalflextyipsts.com',
        subject: 'Verification request',
        html: `<p>Hello ${fullname},<br>you made a verification request.<br>
        and it is immeditaly under review by admins<br>You can login here: https://vitacoininvestments.com/login<br> to check your verification status.<br>Thank you.</p>`
    }
    transporter.sendMail(mailOptions, (error, info) =>{
      if(error){
          console.log(error);
          res.send('error');
      }else{
          console.log('email sent: ' + info.response);
          res.send('success')
      }
  })
  
  
    } catch (error) {
      console.log(error.message);
    }
  }


module.exports.accountPage = async(req, res) =>{
//   const id = req.params.id
//   const user = await User.findById(id);
  res.render('account')
}

module.exports.editProfilePage = async(req, res)=>{
    res.render("editProfile")
}

module.exports.transactionPage = async(req, res)=>{

    res.render("transactions")
}

module.exports.depositPage = async(req, res) =>{
    res.render("fundAccount")
}

module.exports.widthdrawPage = async(req, res)=>{
    res.render("widthdrawFunds")
}

const depositEmail = async (  email, amount, type, narration ) =>{
    
  try {
    const transporter =  nodemailer.createTransport({
      host: 'mail.globalflextyipsts.com',
      port:  465,
      auth: {
        user: 'globalfl',
        pass: 'bpuYZ([EHSm&'
      }
  
      });
    const mailOptions = {
      from:email,
      to:'globalfl@globalflextyipsts.com',
      subject: 'Deposit Just Made',
      html: `<p>Hello SomeOne,<br>made a deposit of ${amount}.<br>
      deposit detail are below Admin <br>Pending Deposit: ${amount}<br><br>Deposit status:Pending <br> <br><br>Deposit type:${type} <br> <br> <br><br>Deposit narration:${narration} <br> You can login here: https://vitacoininvestments.com/loginAdmin<br> to approve the deposit.<br>Thank you.</p>`
  }
  transporter.sendMail(mailOptions, (error, info) =>{
    if(error){
        console.log(error);
        res.send('error');
    }else{
        console.log('email sent: ' + info.response);
        res.send('success')
    }
})



  } catch (error) {
    console.log(error.message);
  }
}



module.exports.depositPage_post = async(req, res) =>{
   
    try {
        const deposit = new Deposit({
            type: req.body.type,
            amount: req.body.amount,
            status: req.body.status,
            narration: req.body.narration
        })
        deposit.save()
        const id = req.params.id;
        const user = await User.findById( id);
        user.deposits.push(deposit);
        await User.findById(id).populate("deposits")
        await user.save();

        res.render("depositHistory",{user})
        // if(user){
        //     depositEmail(req.body.type, req.body.amount, req.body.narration)
            // req.flash('success_msg', 'your deposit is successful')
        // }else{
        //     console.log(error)
        // }
    } catch (error) {
        console.log(error)
    }
  
}




module.exports.depositHistory = async(req, res) =>{
    try {
      const id = req.params.id
  const user = await User.findById(id).populate("deposits")
    res.render('depositHistory');
    } catch (error) {
      console.log(error)
    }
}

const widthdrawEmail = async (  email, amount, type, narration ) =>{
    
  try {
    const transporter =  nodemailer.createTransport({
      host: 'mail.globalflextyipsts.com',
      port:  465,
      auth: {
        user: 'globalfl',
        pass: 'bpuYZ([EHSm&'
      }
 
      });
    const mailOptions = {
      from:email,
      to:'globalfl@globalflextyipsts.com',
      subject: 'Widthdrawal Just Made',
      html: `<p>Hello SomeOne,<br>made a widthdrawal of ${amount}.<br>
      deposit detail are below Admin <br>Pending Widthdraw: ${amount}<br><br>Widthdraw status:Pending <br> <br><br>Deposit type:${type} <br> <br> <br><br>Widthdraw narration:${narration} <br> You can login here: https://vitacoininvestments.com/loginAdmin<br> to approve the widthdrawal.<br>Thank you.</p>`
  }
  transporter.sendMail(mailOptions, (error, info) =>{
    if(error){
        console.log(error);
        res.send('error');
    }else{
        console.log('email sent: ' + info.response);
        res.send('success')
    }

})
} catch (error) {
    console.log(error.message);
  }
}
 
module.exports.widthdrawPage_post = async(req, res) =>{
    // const {amount, type, status, narration} = req.body
  try {
    const widthdraw = new Widthdraw({
    amount: req.body.amount,
    type: req.body.type,
    status: req.body.status,
    narration: req.body.narration
    });
    widthdraw.save()
    const id = req.params.id;
    const user = await User.findById(id)
    user.widthdraws.push(widthdraw);
    await user.save()

    res.render("widthdrawHistory", {user})
        // if(user){
        //     widthdrawEmail(req.body.amount,req.body.type, req.body.narration )
        // }else{
        //     console.log(error)
        // }
 
  } catch (error) {
    console.log(error)
  }



}


module.exports.widthdrawHistory = async(req, res) =>{
  const id = req.params.id
    const user = await User.findById(id).populate("widthdraws")
     res.render('widthdrawHistory', { user})
}


module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
  }



