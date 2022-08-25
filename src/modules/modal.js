import { sendForm } from "./sendForm";

const modal = (idModal) => {
  const modalForm = document.getElementById(idModal);

  const modalProcessing = (e) => {
    e.preventDefault();
    if (e.target.matches('button[type="submit"]')) {
      const formInputs = modalForm.querySelectorAll("input,textarea");
      const formData = {};
      formInputs.forEach((elem) => {
        if (elem.getAttribute("name") !== null) {
          formData[elem.getAttribute("name")] = elem.value.trim();
        }
      });
      // добавим идентификатор формы, с которой отправлена заявка
      formData.idForm = idModal;

      //отправим форму (без валидации полей)
      sendForm(idModal, formData);

      // очистим поля формы
      formInputs.forEach((elem) => {
          elem.value = "";
      });
    }
  };

  modalForm.addEventListener("click", modalProcessing);
};
export default modal;
