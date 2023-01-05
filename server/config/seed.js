const db = require("./config");

const { User } = require("../models");

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

  console.log("Seeded");
  process.exit();
});
