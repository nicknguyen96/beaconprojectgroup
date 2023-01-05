const db = require("./config");

const { User, Housing, Report } = require("../models");

db.once("open", async () => {
  await User.deleteMany();

  await User.insertMany([
    {
      firstName: "John",
      lastName: "Doe",
      middleName: "",
      prefferedName: "Joey",
      profilePicture: "none",
      currentAddress: "1234 Fake Address St. Fake Address, CA 92530",
      phoneNumber: "9512617552",
      car: {
        make: "Dodge",
        model: "Caliber",
        color: "White",
      },
      email: "cruzcordero@gmail.com",
      SSN: "123-45-6789",
      DOB: "01-02-03",
      gender: "",
      legalStatus: {
        status: "none",
        workStatus: {
          status: "DACA",
        },
      },
      driversLicense: {
        number: "12345678",
        expiration: "01-09-2111",
        picture: "required",
      },
      reports: [{ _id: "63b74582f642d6e6d82c2b40" }],
    },
    {
      firstName: "Prince",
      lastName: "Harry",
      middleName: "",
      prefferedName: "Joey",
      profilePicture: "none",
      currentAddress: "1234 Fake Address St. Fake Address, CA 92530",
      phoneNumber: "9512617552",
      car: {
        make: "Dodge",
        model: "Caliber",
        color: "White",
      },
      email: "cruzcordero@gmail.com",
      SSN: "123-45-6789",
      DOB: "01-02-03",
      gender: "",
      legalStatus: {
        status: "none",
        workStatus: {
          status: "DACA",
        },
      },
      driversLicense: {
        number: "12345678",
        expiration: "01-09-2111",
        picture: "required",
      },
    },
    {
      firstName: "Darren",
      lastName: "Loe",
      middleName: "",
      prefferedName: "Joey",
      profilePicture: "none",
      currentAddress: "1234 Fake Address St. Fake Address, CA 92530",
      phoneNumber: "9512617552",
      car: {
        make: "Dodge",
        model: "Caliber",
        color: "White",
      },
      email: "cruzcordero@gmail.com",
      SSN: "123-45-6789",
      DOB: "01-02-03",
      gender: "",
      legalStatus: {
        status: "none",
        workStatus: {
          status: "DACA",
        },
      },
      driversLicense: {
        number: "12345678",
        expiration: "01-09-2111",
        picture: "required",
      },
    },
    {
      firstName: "Darren",
      lastName: "Aoe",
      middleName: "",
      prefferedName: "Joey",
      profilePicture: "none",
      currentAddress: "1234 Fake Address St. Fake Address, CA 92530",
      phoneNumber: "9512617552",
      car: {
        make: "Dodge",
        model: "Caliber",
        color: "White",
      },
      email: "cruzcordero@gmail.com",
      SSN: "123-45-6789",
      DOB: "01-02-03",
      gender: "",
      legalStatus: {
        status: "none",
        workStatus: {
          status: "DACA",
        },
      },
      driversLicense: {
        number: "12345678",
        expiration: "01-09-2111",
        picture: "required",
      },
    },
    {
      firstName: "Darren",
      lastName: "Boe",
      middleName: "",
      prefferedName: "Joey",
      profilePicture: "none",
      currentAddress: "1234 Fake Address St. Fake Address, CA 92530",
      phoneNumber: "9512617552",
      car: {
        make: "Dodge",
        model: "Caliber",
        color: "White",
      },
      email: "cruzcordero@gmail.com",
      SSN: "123-45-6789",
      DOB: "01-02-03",
      gender: "",
      legalStatus: {
        status: "none",
        workStatus: {
          status: "DACA",
        },
      },
      driversLicense: {
        number: "12345678",
        expiration: "01-09-2111",
        picture: "required",
      },
    },
    {
      firstName: "Darren",
      lastName: "Coe",
      middleName: "",
      prefferedName: "Joey",
      profilePicture: "none",
      currentAddress: "1234 Fake Address St. Fake Address, CA 92530",
      phoneNumber: "9512617552",
      car: {
        make: "Dodge",
        model: "Caliber",
        color: "White",
      },
      email: "cruzcordero@gmail.com",
      SSN: "123-45-6789",
      DOB: "01-02-03",
      gender: "",
      legalStatus: {
        status: "none",
        workStatus: {
          status: "DACA",
        },
      },
      driversLicense: {
        number: "12345678",
        expiration: "01-09-2111",
        picture: "required",
      },
    },
  ]);

  await Report.deleteMany();

  await Report.insertMany([
    {
      author: "John",
      title: "Sink does not work",
      description: "The sink does not work properly",
      comments: [],
      status: "In Progress",
    },
  ]);

  await Housing.deleteMany();

  await Housing.create({
    address: "1234 Fake Address St. Fake Address, CA 92530",
    landlord: {
      fullName: "Landlord Doe",
      phoneNumber: "2145239999",
      email: "landlorddoe@gmail.com",
    },
    tenants: [{ _id: "63b72305bfb09d434a91b281" }, { _id: "63b72305bfb09d434a91b286" }],
    summary: {
      furniture: {
        beds: 2,
        matresses: 2,
        tables: 1,
        chairs: 2,
      },
      reports: [{ _id: "63b7465c3ce8382e1cd248c6" }],
      employeeInfo: [{ _id: "63b72305bfb09d434a91b281" }, { _id: "63b72305bfb09d434a91b286" }],
    },
  });
  console.log("Seeded");
  process.exit();
});
