const sendForm = (formId, formBody) => {
  const dataBaseUrl = 'https://jsonplaceholder.typicode.com/posts';
  const form = document.getElementById(formId);
  const itWasSent = document.querySelector('.it-was-sent');

  const sendData = (data) => {
    return fetch(dataBaseUrl, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    }).then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${ response.status }`);
      }
      return response.json();
    });
  };

  const deleteBlock = (block,msec) => {
    return new Promise((resolve,reject) => {
      setTimeout(() => {
        if (block) {
          block.remove();
        }
      }, msec);
    });
  };

  try {
    if (!form) {
      throw new Error (`Форма ${formId} отсутствует на странице`);
    }

    let statusBlock = document.getElementById(`status-${formId}`);
    if (!statusBlock) {
      statusBlock = document.createElement('span');
      statusBlock.id = `status-${formId}`;
      statusBlock.style.flexBasis = '100%';
      statusBlock.style.paddingTop = '1rem';
      form.append(statusBlock);
    }
    statusBlock.textContent = 'Отправка...';
    itWasSent.style.display = 'none';

    sendData(formBody)
      .then(data => {
        statusBlock.textContent = 'Спасибо! Наш менеджер свяжется с Вами!';
        deleteBlock(statusBlock,3000);

        // отобразим отправленные сведения где-то справа
        itWasSent.style.display = 'block';
        itWasSent.innerHTML = '';
        itWasSent.insertAdjacentHTML('beforeend',`
        <p>Заявка отправлена:</p>
        `);
        for (let key in data) {
          itWasSent.insertAdjacentHTML('beforeend',`
          <div><b>${key}:</b> ${data[key]}</div>
          `);
        }
      })
      .catch(error => {
        console.log(error.message);
        statusBlock.textContent = 'Ошибка отправки';
      });
  } catch (error) {
    console.log(error.message);
  } 
};

export {sendForm};