

export const errorMessages = {
  email: "Email is not valid",
  maxChar: (num: number) =>
    `This field cannot have more than ${num} characters`,
  minChar: (num: number) => `This field must be at least ${num} characters`,
  minLowerCase: (num: number) =>
    `This field must be at least ${num} lower case character`,
  minUpperCase: (num: number) =>
    `This field must be at least ${num} upper case character`,
  minNumber: (num: number) => `This field must be at least ${num} number`,
  minSymbol: (num: number) =>
    `This field must be at least ${num} special character`,
  required: "This field is compulsory",
  passwordMatch: "Passwords don't match",
  positiveInteger: "The number must be greater than 0",
  integer: "No decimals allowed",
};


