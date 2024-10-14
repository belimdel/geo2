const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  console.log("Received request:", event.body);

  try {
    const { email, subject, message } = JSON.parse(event.body);

    // Configuration du transporteur (par exemple pour un compte Gmail)
    let transporter = nodemailer.createTransport({
      service: 'gmail', // Vous pouvez remplacer par un autre service (ex : Outlook, Yahoo)
      auth: {
        user: 'hmher866@gmail.com',
        pass: 'jtxtoxmjefdcamet' // Ton mot de passe ou mot de passe d'application (pas ton mot de passe Gmail normal)
      }
    });

    // Options de l'e-mail
    let mailOptions = {
      from:'hmher866@gmail.com',  // L'adresse d'envoi (peut être la même que le login SMTP)
      to: email,  // L'adresse e-mail reçue depuis le frontend
      subject: subject,  // L'objet de l'e-mail
      text: message  // Le contenu de l'e-mail
    };

    // Envoyer l'e-mail
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email envoyé!' })
    };
  } catch (error) {
    console.error("Error occurred:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erreur lors de l\'envoi de l\'email', error: error.message })
    };
  }
};
