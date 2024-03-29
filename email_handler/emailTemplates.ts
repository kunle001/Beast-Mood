
const emailHeader = (title: string)=>{
    return `  
<!doctype html>
<html lang="en-US">

<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>${title}</title>
    <meta name="description" content="Email From made in Nigeria .">
    <style type="text/css">
        a:hover {text-decoration: underline !important;}
    </style>
</head>

<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
    <!-- 100% body table -->
    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
        <tr>
            <td>
                <table style="background-color: #f2f3f8; max-width:670px; margin:0 auto;" width="100%" border="0"
                    align="center" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="height:25px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td style="text-align:center;">
                            <a href="https://made-n-nigeria.com" title="logo" target="_blank">
                            <img width="150px" src="${process.env.BASEURL}/img/pro-logo.png" title="logo" alt="logo">
                          </a>
                        </td>
                    </tr>
                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td>
                            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                style="max-width:670px; background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>

                                <tr>
                                    <td style="padding:0 35px;">
                                        <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">${title}
                                        </h1>                       
    
    `;
}

const emailFooter = ()=>{
    return `                       
    </td>
    </tr>

    <tr>
     <td style="height:40px;">&nbsp;</td>
    </tr>
    </table>
    </td>
    </tr>
    <tr>
        <td style="height:20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td style="text-align:center;">
                            <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>made in Nigeria</strong> </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="height:25px;">&nbsp;</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <!--/100% body table-->
</body>

</html>
        
    
    `;
}


// module.exports = {
  const otpEmailTemplate =(link: string, duration: string) => {
    return `
     ${emailHeader("OTP Verification")}

       <p style="color:#455056; font-size:15px;line-height:24px; margin-top:10px;">
          Use This OPT to complete your registration
         <br>
         Note that this link expires in <strong> ${duration}</strong>                          
        </p>
         <a href="#"
          style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:16px;padding:10px 24px;display:inline-block;border-radius:50px; letter-spacing:1px;">${link}
         </a>

      ${emailFooter()}                             
        
        `;
  }

  const WelcomeEmailTemplate = () => {
    return `
       ${emailHeader("New User Welcome Email")}
         <p style="color:#455056; font-size:15px;line-height:24px; margin-top:10px;">
         
         Thank you for joining our ever growing community of Nigerian Manufacturers, We will kepp you updated on recent developments, products and industry unpdates, news, analytics, special offers and most especially, the best way to make the most out of our platform
                               
        </p>
         
         ${emailFooter()}   
    `;
  }
  export {otpEmailTemplate, WelcomeEmailTemplate};
// };