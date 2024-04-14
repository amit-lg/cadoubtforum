export const validateName = (name) => {
  if (!name) {
    return false;
  }
  return true;
};

export const validateEmail = (email) => {
  if (!email) {
    return false;
  }

  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) {
    return false;
  }

  return true;
};

export const validatePassword = (password) => {
  if (!password) {
    return false;
  } else if (password.trim().length < 6) {
    return false;
  }
  return true;
};

export const validatePhone = (phone) => {
  if (!phone) {
    return false;
  } else if (phone.length != 10) {
    return false;
  }
  return true;
};

export const validateUrl = (url) => {
  const re = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

  if (!url) {
    return false;
  }else if(!re.test(url)){
    return false
  }
  return true;
};

export const validateLink = (link) => {
  if (!link) {
    return false;
  }
  const re = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.){1,}[a-zA-Z]{2,}(\/\S*)?$/;
  if (!re.test(link)) {
    return false;
  }
  return true;
};
