* user
- name       [string , required , minlength:3, maxlength:20, trim :true]
- email      [string , required , unique , lowercase,trim , check'@' ]
- password   [string , required , minlength:6]>> optional in case login with google
- provider   [string] enum:[ 'system' , 'google' , 'instaGram' ]
- profilePic:[string]URL
- isVerified [Boolean] default:false
- createdAt  [date]
- updatedAt  [date]
- isDeleted  [Boolean] default:false [ soft delete]
 
==========================

* message
- content   [string   , required ,minlength:1, maxlength:200]
- receiver  [objectId , required ,ref:User]
- sender    [objectId , optional ,ref:User]
- isDeleted [Boolean] default:false [soft delete]
- createdAt [date]
- updatedAt [date]

==========================

* OTP

- value [string , required , length:6]
- email [string , required ]
- expiredAt [ date ] 2026-09-13T07:15:00
- createdAt [ date ] 2026-09-13T07:05:00
- updatedAt [ date ]