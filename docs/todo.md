* NGL APP
- features :

1. authentication flow :
    - register
    - send verification email [otp,link]
    - verify email using [otp,link]
    - login
    - forgotten password
    - reset password
      
2. user flow :

        - update profile.
        - view profile.
        - view all users.

   3. messages flow:
    - send message.
    - view incoming messages.
    - delete a message.

* no SQL
for social media like : facebook
1. high availability.[view]
2. eventual consistency.

* OTP [one time password]

- generate OTP.[register,resetPassword,moneyTransactions]
- save OTP into DB within the register.
- delete OTP after usage... verify an account.
- or deleted after certain time 10 minutes.[TTL]>> time to live



* modules :

1. commonJs -> ES5 -> const require() >> module.exports = fn;
2. moduleJS -> ES6 -> import fn from 'module-name' >> export fn;