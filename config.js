require('dotenv').config()

const development = {
    PORT: process.env.PORT || 3050,
    URL: process.env.URL || '   :',
    AWS_BUCKET_REGION: process.env.AWS_BUCKET_REGION,
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECERET_ACCESS_KEY: process.env.AWS_SECERET_ACCESS_KEY,
    DBUSER: process.env.DBUSER || '',
    DBPASSWORD: process.env.DBPASSWORD || '',
    DBCLUSTER: process.env.DBCLUSTER || '',
    DBCOLLECTION: process.env.DBCOLLECTION || '',
    PRIVATEKEY: process.env.PRIVATEKEY || '',
    PUBLICKEY: process.env.PUBLICKEY || '',
    JWT_KEY: process.env.JWT_KEY || '',
    APP_ID: process.env.APP_ID || '',
    API_KEY: process.env.API_KEY || '',
    FIREBASE_SERVER_KEY: process.env.FIREBASE_SERVER_KEY,

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || 'your-google-client-id',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || 'your-google-client-secret',
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:4000/auth',


}

module.exports = development    