const validate = (data , isForLogIn) => {
  const errors = {};
  if (isForLogIn){
    if (!data.email.trim()) {
      errors.Email = "Email required";
    } else if (!/\S+@\S+\.\S+/.test(data.Email)) {
      errors.Email = "Email address is invalid";
    } else {
      delete errors.Email;
    }
    if (!data.password.trim()) {
      errors.Password = "Password is required";
    } else if (data.password.length < 6) {
      errors.Password = "Password need to be 6 character or more";
    } else {
      delete errors.Password;
    }
  
  }else{
      if (!data.name.trim()) {
    errors.name = "Username required";
  } else {
    delete errors.name;
  }
  if (!data.lastName.trim()) {
    errors.lastName = "LastName  required";
  } else {
    delete errors.lastName;
  }
  if (!data.Email.trim()) {
    errors.Email = "Email required";
  } else if (!/\S+@\S+\.\S+/.test(data.Email)) {
    errors.Email = "Email address is invalid";
  } else {
    delete errors.Email;
  }
  if (!data.Password.trim()) {
    errors.Password = "Password is required";
  } else if (data.Password.length < 6) {
    errors.Password = "Password need to be 6 character or more";
  } else {
    delete errors.Password;
  }

    if (!data.Password2.trim()) {
      errors.Password2 = "Confirm the password";
    } else if (data.Password2 !== data.Password) {
      errors.Password2 = "Password do not match";
    } else {
      delete errors.Password2;
    }
  }
    return errors;
  }
;
export default validate;
