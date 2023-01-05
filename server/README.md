## User
    * firstName: string , required
    * lastname : string, required
    * password : string , required
    * middleName : string
    * preferName : string
    * isAdmin : boolean
    * profilePicture : string
    * currentAddress : string , required
    * cellPhone : string, required
    * car: obj { make : string, color :string , model : string }
    * email: string ( receive from the invitation email and cannot be editted)
    * ssn : string, required
    * DOB : string, required
    * gender : string ( could be male, female, I do not wish to answer)
    * workStatus : {
                      type: string, it should be "green card", "citizen", "h1-b", "l2", "f1(cpt/opt)", "other" , required
                      other: string, could use this one if type is not specified
                      dateStart: Date,
                      dateEnd: Date,
                      file: string
                    }
    * driverLicense : {
                        licenseNum : string,
                        expiration: string,
                        file: string 
                      }
    * reference :     {
                          firstName: string, required
                          lastName: string, required
                          middleName: string
                          phone: string, required
                          email: string, required
                          relationship: string, required
                      }
    * emergencyContact : {
                            firstName: string, required,
                            lastName: string, required,
                            middleName: string,
                            phone: string, required
                            email: string, required
                            relationship: string, required
                          }
    * applicationStatus: string ( only Admin change this)
    * report : Report[]
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