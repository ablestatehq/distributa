export const welcomeEmailTemplate = {
  subject: "Welcome to Distributa",
  getContent: () => `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome Email</title>
          <style>
              body {
                  font-family: Satoshi, sans-serif;
                  margin: 0;
                  padding: 0;
                  background-color: #f4f4f9;
                  color: #333333;
              }
              .email-container {
                  max-width: 600px;
                  margin: 20px auto;
                  background: #ffffff;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                  overflow: hidden;
              }
              .header {
                  background-color: #000000;
                  color: #ffffff;
                  text-align: center;
                  padding: 40px;
              }
              .header h1 {
                  margin: 0;
                  font-size: 36px;
                  font-family: Archivo, sans-serif;
              }
              .header h1 span {
                  text-decoration: underline;
                  color: #0D6EFD;
              }
              .content {
                  padding: 20px;
              }
              .content h2 {
                  font-size: 20px;
                  color: #000000;
              }
              .content p {
                  font-size: 16px;
                  line-height: 1.6;
                  margin: 10px 0;
              }
              .content ul {
                  padding-left: 20px;
              }
              .content ul li {
                  margin-bottom: 10px;
              }
              .cta {
                  margin: 20px 0;
                  text-align: center;
              }
              .cta a {
                  text-decoration: none;
                  color: #ffffff;
                  background: #0D6EFD;
                  padding: 10px 20px;
                  border-radius: 4px;
                  display: inline-block;
                  font-size: 16px;
              }
              .footer {
                  text-align: center;
                  padding: 10px;
                  font-size: 14px;
                  background: #f4f4f9;
                  color: #777777;
              }
              .footer a {
                  color: #0D6EFD;
                  text-decoration: none;
              }
          </style>
      </head>
      <body>
          <div class="email-container">
              <div class="header">
                  <h1>Welcome to 
                      <span>Distributa</span>
                  </h1>
              </div>
              <div class="content">
                  <h2>Hi,</h2>
                  <p>We're thrilled to have you on board! Managing your finances just got easier with Distributa</p>
                  <p>Here's what you can do:</p>
                  <ul>
                      <li><strong>Track your income and expenses effortlessly</strong></li>
                      <li><strong>Generate and share invoices with ease</strong></li>
                      <li><strong>Issue receipts and maintain detailed records</strong></li>
                      <li><strong>Gain valuable insights into your financial health</strong></li>
                  </ul>
                  <p>To help you get started, check out our quick-start guide or explore the app to see how easy it is to manage your transactions.</p>
                  <p>If you have any questions, our support team is always here to help.</p>
                  <div class="cta">
                      <a href="https://distributa.ablestate.africa/">Get Started Now</a>
                  </div>
                  <p>Let's make financial management simple and stress-free!</p>
                  <p>Cheers,<br>The Distributa Team</p>
              </div>
              <div class="footer">
                  <p>Need help? Visit our Support Center or contact us directly.</p>
              </div>
          </div>
      </body>
      </html>
    `,
};
