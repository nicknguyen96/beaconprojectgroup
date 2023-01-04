## User
    * firstName: string
    * lastname : string
    * password : string
    * middleName : string ?
    * preferName : string
    * isAdmin : boolean
    * profilePicture : string
    * currentAddress : string
    * cellPhone : string
    * car: obj { make : string, color :string , model : string }
    * email: string
    * ssn : string
    * DOB : string
    * gender : string ( could be male, female, I do not wish to answer)
    * workStatus : obj { }
    * driverLicense : obj { licenseNum : string, expiration: string, upload: string }
    * reference : obj {}
    * emergencyContact : obj {}
    * applicationStatus: string ( only Admin change this)
    * report : Report[]
    * registrationToken : string
    * files : string[]
## Report
    * author : ref User
    * title : string
    * description : string
    * status : string
    * timeStamp : could be automated add with mongoose

## Housing
    * address : string
    * roomate : User[]
    * landlord : obj {}
    * email : string
    * beds: number
    * mattress : number
    * tables : number
    * chairs : number
    * timestamp: Date


## Routes

* /auth:
  * POST /login: 
  * POST /signup:
  * POST /logout:
  * GET /:registrationtoken : verify the registration token, if valid then continue the signup or else just display 403 page (Unauthorization Page)
* /user ( HR )
  * POST /sendInvitation: send the invitation to new employee
  * GET /users : get all the users
  * GET /users/search 
  * GET /user/:userid : get user detail for the userid
  * PUT /user/:userid : edit user detail ( like pending status ,...);
  * 
* /house:
  * POST /create : create new house from
  * DELETE /delete/:houseid : delete the house
  * PUT /edit/:houseid update the report
  * GET / : get all house

* /report:
  * GET / : get all report
  * DELETE /delete/:reportid : delete report
  * POST /create : create new report
  * PUT /edit/:reportid : update the report