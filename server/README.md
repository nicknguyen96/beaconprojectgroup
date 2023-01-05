## User

    * firstName: string
    * lastname : string
    * password : string
    * middleName : string ?
    * preferName : string
    * profilePicture : string
    * currentAddress : string
    * cellPhone : string
    * car: obj { make : string, color :string , model : string }
    * email: string
    * ssn : string
    * DOB : string
    * gender : string ( could be male, female, I do not wish to answer)
    * legalStatus : obj { }
    * driverLicense : obj { licenseNum : string, expiration: string, upload: string }
    * reference : obj {}
    * emergencyContact : obj {}
    * applicationStatus: string ( only Admin change this)
    * isAdmin : boolean
    * report : Report[]
    * registrationToken : string

## Report

    * author : ref User
    * title : string
    * description : string
    * status : string
    * comments: 'ref User'
    * timeStamp : could be automated add with mongoose

## Housing

    * address : string
    * tenants : User[]
    * landlord : obj {}
    * email : string
    * beds: number
    * mattress : number
    * tables : number
    * chairs : number
    * timestamp: Date
