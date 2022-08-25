// анимация
const animate = ({timing, draw, duration}) =>{
  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction изменяется от 0 до 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // вычисление текущего состояния анимации
    let progress = timing(timeFraction);

    draw(progress); // отрисовать её

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }

  });
};

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

export{animate, checkValueForm};