import modal from "./modal";

const servicesSection = () => {
  const servicesBlock = document.querySelector('.services-section');

  servicesBlock.addEventListener('click', (e) => {
    if (e.target.matches('button')) {
      modal('form1');
    }
  });
};

export default servicesSection;
