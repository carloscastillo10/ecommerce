require('dotenv').config();

const config = {
    env: process.env.NODE_ENV || 'dev',
    isProd: process.env.NODE_ENV === 'production',
    port: process.env.PORT || 3000,
    dbUrl: process.env.DATABASE_URL,
    apiKey: process.env.API_KEY,
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
    jwtRecoverySecret: process.env.JWT_RECOVERY_SECRET,
    smptEmail: process.env.SMTP_EMAIL,
    smtpPassword: process.env.SMTP_PASSWORD,
};

module.exports = { config };
