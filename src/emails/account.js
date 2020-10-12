const sgMail = require('@sendgrid/mail');

const sendGridApiKey = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(sendGridApiKey);

const sendWelcomeEmail = (email, password) => {
  console.log(email);
  console.log(password);
  sgMail.send({
    to: email,
    from: 'manof.application@gmail.com',
    subject: 'הצטרפותך למערכת מנו"ף',
    html: `<div style="width: 100px; height:100px; border:">
        <h1 style="color: #333">סיסמתך החדשה</h1>
       <h3 style="font-size: 20
       px; font-weight:bold;">ברוך הבא למערכת מנו"ף</h3>
          <h4>פרטי ההתחברות שלך הם :</h4>
          <p>שם משתמש : ${email} </p>
          <p>סיסמא : ${password} </p> 
        </div>
        `,
  });
};

const resetPassword = (email, user) => {
  sgMail.send({
    to: email,
    from: 'manof.application@gmail.com',
    subject: 'איפוס סיסמת משתמש',
    html: `<div style="width: 100px; height:100px; border:">
    <h1 style="color: #333">סיסמתך החדשה</h1>
   <p style="font-size: 20
   px; font-weight:bold;">${user.password}</p>

    </div>
    `,
  });
};

module.exports = {
  sendWelcomeEmail: sendWelcomeEmail,
  resetPassword: resetPassword,
};