* Register API
- url: /auth/register
- method: POST
- request [header] : {content-Type:application/json}
- request [body]:{name,email,password
- response [ status]: success:201 , failure:400
- response [header]: {content-Type:application/json}
- response [body]: {message,success,data}

=================================

* verify account API
- url: /auth/verify
- method : PATCH/POST/PUT
- request [ header]: {content-Type:application/json}
- request [body]: {OTP,email} >> update user isVerified >> true
- response [ status] 200/400
- response [ header]: {content-Type:application/json}
- response [ body ]: {message,success,data}

================================

* login API
- URL: /auth/login
- request [ header]: {content-Type:application/json}
- request [body]: {email,passowrd}
- response [ status] 200/400
- response [ header]: {content-Type:application/json}
- response [ body ]: {message,success,data}
