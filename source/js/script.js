/* eslint-disable no-shadow */
/* eslint-disable id-length */
const page = document.querySelector('.page');
const body = page.querySelector('.body');
const form = body.querySelector('.form');
const formBlock = body.querySelector('.form__block-select');
const selectMenu = body.querySelector('#select-menu');

const dataSabmitUrl = 'https://echo.htmlacademy.ru/';

const getTemplateContent = (block, item) =>
  block.querySelector(`#${item}`)
    .content
    .querySelector(`.${item}`);

const select = getTemplateContent(body, 'select-template');

const selectElement = select.cloneNode(true);

selectMenu.classList.add('visually-hidden');
formBlock.append(selectElement);

const success = getTemplateContent(body, 'alert__success');
const errorLoading = getTemplateContent(body, 'alert__error-loading');

const successElement = success.cloneNode(true);
const successErrorLoading = errorLoading.cloneNode(true);

const selectInput = body.querySelector('#select-input');
const selectTemplate = body.querySelector('.select-template');
const selectItems = selectTemplate.querySelectorAll('.select-template__item');

const getActiveMenu = (evt) => {
  evt.preventDefault();
  selectTemplate.classList.toggle('select-template--active');
};

const getRemoveMenu = () => {
  selectTemplate.classList.remove('select-template--active');
};

const switchMenu = (buttons, element) => {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', (evt) => {
      evt.preventDefault();
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('select-template__item--active');
      }

      buttons[i].classList.add('select-template__item--active');
      element.value = buttons[i].textContent;
      getRemoveMenu();
    });
  }
};

const keys = {
  escape: 'Escape',
  esc: 'Escape',
};

const isEscEvent = (evt) => evt.key === keys.escape || evt.key === keys.esc;

const goTogglePage = () => {
  page.classList.toggle('page--active');
};

const onErrorRemove = () => {
  successErrorLoading.remove();
  goTogglePage();
  document.removeEventListener('click', onErrorRemove);
};

const onSuccessRemove = () => {
  successElement.remove();
  goTogglePage();
  document.removeEventListener('click', onSuccessRemove);
};

const onElementEscRemove = () => {
  if (isEscEvent) {
    onSuccessRemove();
    goTogglePage();
    document.removeEventListener('keydown', onElementEscRemove);
  }
};

const onErrorEscRemove = () => {
  if (isEscEvent) {
    onErrorRemove();
    goTogglePage();
    document.removeEventListener('keydown', onErrorEscRemove);
  }
};

const alertSuccess = () => {
  body.append(successElement);
  goTogglePage();
  document.addEventListener('click', onSuccessRemove); document.addEventListener('keydown', onElementEscRemove);
};

const alertError = () => {
  body.append(successErrorLoading);
  goTogglePage();
  document.addEventListener('click', onErrorRemove);
  document.addEventListener('keydown', onErrorEscRemove);
};

const sendData = (url, bodyForm, alertSucces, error) => {
  fetch(url, {
    method: 'POST',
    body: bodyForm,
  })
    .then((response) => {
      if (response.ok) {
        alertSucces();
      } else {
        error();
      }
    })
    .catch(() => {
      error();
    });
};

const onFormSend = (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);

  sendData(dataSabmitUrl, formData, alertSuccess, alertError);
};
form.addEventListener('submit', onFormSend);

selectInput.addEventListener('click', getActiveMenu);
switchMenu(selectItems, selectInput);
