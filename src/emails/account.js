const sgMail = require("@sendgrid/mail");
const chalk = require("chalk");

const sendGridApiKey = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(sendGridApiKey);

const sendWelcomeEmail = (email, password) => {
  sgMail.send({
    to: email,
    from: "manofApp2020@gmail.com",
    subject: 'הצטרפותך למערכת מנו"ף',
    html: `<div dir="rtl" style="width: 100px; height:100px; border:">
            <h1 style="color: #333">סיסמתך החדשה</h1>
            <h3 style="font-size: 20px; font-weight:bold;">ברוך הבא למערכת מנו"ף</h3>
            <h4>פרטי ההתחברות שלך הם :</h4>
            <p>שם משתמש : ${email} </p>
            <p>סיסמא : ${password} </p> 
          </div>`,
  });
};

const resetPassword = (email, password) => {
  sgMail
    .send({
      to: email,
      from: "manofApp2020@gmail.com",
      subject: "איפוס סיסמת משתמש",
      html: `<div dir="rtl" style="width: 100px; height:100px; border:">
              <h1 style="color: #333">סיסמתך החדשה</h1>
              <p style="font-size: 20px; font-weight:bold;">${password}</p>
            </div>`,
    })
    .then(() => {
      console.log(chalk.bgGreen("Email sent"));
    })
    .catch((error) => {
      console.error(chalk.bgGreen(`${error}`));
    });
};

module.exports = {
  sendWelcomeEmail: sendWelcomeEmail,
  resetPassword: resetPassword,
};
