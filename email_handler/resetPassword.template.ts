import sendEmail from "./sendEmail"


const passLink = async(user: {name: string; email: string; },  link: string,) => {
  const transporter = sendEmail();

    const registrationHTML = `
  <div style="background-color:white; padding-bottom:2rem; ">
    <div class="container" style ="margin: auto; color: black; margin: auto; background-color:white; width: 80%; height: 80%; border-radius: 0.4rem;
    box-shadow: 1px 2px whitesmoke; margin-top:1rem;border: 2px solid rgb(237, 230, 230) " >
    <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
  />
      <link href='http://fonts.googleapis.com/css?family=Lato' rel='stylesheet' type='text/css'>
  
      <head> <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"> </head>
  <div class="btnContainer" style=" padding:1rem;text-align: center;border-radius: 25px;" ><img style= "margin: auto; width:80%;
  height: 90%; display:block;border-radius: 25px; ";
      class="imgClass"
      src=https://res.cloudinary.com/drho9mnyb/image/upload/v1663944871/Ribi.png
    /></div>
  
    <p style = " margin: auto; padding:2rem;text-align: center; font-family: 'Lato'; font-size:18px";  >Hi ${user.name}, <br>Click the button below to reset your password.</p> 
  <div class="btnContainer" ><a href='${link}'style=" text-decoration: none; cursor: pointer; background-color: #01051A; border: none; border-radius: 8px; 
  margin-top: 6rem; color: white; padding: 15px; text-align: center;  
  display:block; font-size: 16px; margin:auto; width: 250px; min-width: 250px;" >Reset Password</a>
  </div>
  
  <div> <p style=" text-align: center;font-family: 'Lato';" >Copyright &copy; 2022 Ribi, Inc.</p>
  </div>
  </div>
  `;
   
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: user.email,
    subject: "Password Recovery",
    html: registrationHTML

  }
 
  transporter.sendMail(mailOptions, (error, result) => {
    if (error){
    console.log(error)
       console.log( 'Opps error occured')
    } else{
        console.log('Check Your Email for OTP Code');
    }
   })
}
export default passLink;