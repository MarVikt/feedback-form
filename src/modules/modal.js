import { SendingForm } from "./sendForm";

const modal = (idModal) => {
  const modalForm = document.getElementById(idModal);
  const modalOverlay = document.querySelector('.modal-overlay');

  const showModal = () => {
    modalOverlay.style.display = "block";
    document.body.style.overflow = "hidden";
    modalForm.style.opacity = "1";
    modalForm.style.visibility = "visible";
    modalForm.style.transitionDelay = "0s";
  };

  const closeModal = (msec) => {
    return new Promise((resolve,reject) => {
      setTimeout(() => {
        if (modalForm.style.visibility === "visible") {
          modalForm.style.opacity = "0";
          modalForm.style.visibility = "hidden";
          modalOverlay.style.display = "none";
          document.body.style.overflow = "auto";
          document.body.removeEventListener('click', modalProcessing);
        }
      }, msec);
    });
  };

  const modalProcessing = (e) => {
    e.preventDefault();
    if (e.target.closest('.modal-overlay') || e.target.closest('.modal-close')) {
      closeModal(0);
    } else if (e.target.matches('button[type="submit"]')) {
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
      let newLetter = new SendingForm(idModal, formData);
      newLetter.sendForm();
      // sendForm(idModal, formData);

      // очистим поля формы
      formInputs.forEach(elem => {
        if (elem.getAttribute('name') !== null) {
        elem.value = '';
        }
      });
      closeModal(5000);
  }
  };

  showModal();
  document.body.addEventListener("click", modalProcessing);
};
export default modal;
