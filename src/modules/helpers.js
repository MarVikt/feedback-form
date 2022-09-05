// проверка полей формы (dataForm - это Object, а не FormData)
const checkValueForm = (dataForm) => {
  let isValid = true;
  let name = '';
  let phone = '';
  let message = '';

  for (let key in dataForm) {
    if (/fio/gi.test(key)) {
      name = dataForm[key];
    }
    if (/tel/gi.test(key)) {
      phone = dataForm[key];
    }
    if (/message/gi.test(key)) {
      message = dataForm[key];
    }
  }

  if (/[^а-я\s]+/gi.test(name) || name.replace(/[\s]/g,"") == '') {
    alert('введите имя кириллицей, можно использовать пробел');
    isValid = false;
  }

  if (/[^\d\+]+/gi.test(phone) || phone.replace(/[\s]/g,"") == '') {
    alert('введите телефон цифрами, можно использовать плюс');
    isValid = false;
  }

  if (message !== '') {
    if (/[^а-я\d\s\-\.\,\!\?\:\;\(\)\"]+/gi.test(message)) {
      alert('введите сообщение кириллицей, можно использовать цифры, пробел и знаки препинания');
      isValid = false;
    }
  }

  return isValid;
};

export{checkValueForm};