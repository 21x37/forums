const express = require('express');
const router = new express.Router();
const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert({
      "type": "service_account",
      "project_id": "author-de337",
      "private_key_id": "53148204b207f8ede1c85e8ad7d97e36614f3625",
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDEBcMnV0JheYR8\nK4iZ82DiNiDvWTM3cKnI+RoFJqytTJOAnu3nt5bQejKFtafI9AEQSFdTxUhGEWeX\nasdmFDYWwRO5Wj+HUpAV/5uCpZFBMCGsFuvTvo/q2YPKKoyiLcNuzunRJB11p47O\nVppssKhiJCGwFjMN9+ks6hHT454SrGhqKSmOm0ndn02rJN1Jf4W/4O8yLJEdIICd\ngz/ySsHqc3umHnFkqqVr/RV9QfxnpPmIQTZ45cfxZfLPWqyht/cSlt5d9sJMpUYJ\nEaml7OVeL9eFPc38dUBbhMJqHCqwbZo2tfh3Zcl8FD53X1Xn07nmPLtgJfa5W3cN\ndtT6em5lAgMBAAECggEAMFmPglOmnu5fPFVskzSR0Boz03W4CVOzvUucHGsmqnQ5\n6b7JxZ7mBzQs5Agjg5CT9pUxXQtLQWUnnRSMbGRN1xz2pYBaLSGzQonSrM3z3xVl\nKNJahtb5Hp9aP3JxT8tj6iAFUj3LOmsC8WgxHOASGGr7GDjRjP96N0bg8Ney9L29\nQfZetXN7g7JLcdB7ZRxKch589ZqPc6/mtpRGVlH0kOZ06cuo3zx07lTrPFMwijRe\nuw49CQuJhc66ZKpPIrGZcLSrmODByuc/L0bZVH/6u+4K1JMazqyMsxwZcq8C44bO\nR59VWX7IS6rZt9ISeD/qx1V8+ua6kuQMntXPDzMYnQKBgQDqCuieGw7cRvXivRtL\nkuyV7mOm55xOW5nr/mvIAqgWXfBYy2sAJ6hNnx0rua3OaqbFL2ChEYdLXAWWYtpS\nYrdazunWX8OEH6eVwbdxPP5AGMSFP/98tbfMYH8XkiJAj0v/Hm9Z3PzA9auVbEDp\nAK2x59LQ5JxSFVdxTz3Z2xvIYwKBgQDWabXSEemQbSgoDL7xhAc7ivg8tpPKnW2l\ns52/wwjhwpgbXAvAwYZ7SyyyPJiVmfe2ZCtY3xnnok+eVHM+LvbKH2Bgeswu1dte\nfWL7+LlyS1h+zy6V6oBljwjz2q1RvYX7V+ntiTGXpl1tDy0mH6nfBTQVA4QbzUrF\ny930DyqUlwKBgQDiwP7vcDfNo9LHg4DWj9s4yGc0ZmJCaO2QgEfc2PYR9aHP5gYd\neE7QJcEVhCipPRunIGf2pgz3LokbU1tDRvFuwdo9ITtE34Z2yeD5jaaoY1bD42Wd\nZlJVaYi5RZR6CFwRKWOpJTqdmWhMtT2OgmHHZFwUl+n8fUDjP2slj+wzEQKBgB6Y\npyF6/OFnMjvE1dqRBJcylYnUY/Kd1G+42eHravEMW7hLwkGXXCFr8MzeaMewWPDm\nCml8LK4pM0NcubU97mmZYJ9j5o8oZU1uhxl9vLjal55A4lzyQbA8YQKrSeBIMz5S\npUcINNN3Ig3WBJNUIWF51JzLC6cL/IeNN/cD0wexAoGBALz3rM65+n+OHlcfSNPV\nsakXg9kp3RAn1V150EGSh1RtlRmmA8uLi8B7KIBUzqh3RipDieSwNnN+U3EtcH6k\nk86i7mE3oLpWD91nS30dViNXtVwSpaV8hhXp2cZWnsAgnFOCW19/ELPTJPU7gG52\n8CY39OKB0i/fVM8oszDbtAxk\n-----END PRIVATE KEY-----\n",
      "client_email": "firebase-adminsdk-0wgd1@author-de337.iam.gserviceaccount.com",
      "client_id": "112567847795563211941",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-0wgd1%40author-de337.iam.gserviceaccount.com"
    }),
    databaseURL: "https://author-de337.firebaseio.com"
  });

router.post('/api/reset-password', async (req, res) => {
    const uid = req.body.uid;
    const newPassword = req.body.newPassword
    console.log(uid);
    admin.auth().getUser(uid)
        .then((userRecord) => {
            userRecord.passwordHash = newPassword;
            userRecord.passwordSalt = newPassword;
            res.send({ userRecord: 'Complete' })
        })
        .catch((error) => {
            res.send({ error })
        })
});

router.post('/api/fetch-email', async (req, res) => {
    const uid = req.body.uid;

    const user = await admin.auth().getUser(uid)

    if (!user) {
        return res.send({ error: 'failed' })
    }

    res.send({ email: user.email });
})


module.exports = router;
