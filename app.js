//1
// Всплытие событий 18мин
//вешаем на общего родителя слушателя
/*
const container = document.querySelector('.js-container');

container.addEventListener('click', onClick)

function onClick(evt) {
  if (evt.target.nodeName !== 'BUTTON') {
    return;//этот if что бы кликалась только кнопка
};//фильтр цели клика
  //console.log(evt);
  //console.log(evt.target);
  console.log(evt.target.textContent);
}
//Код добавления кнопок
const addBtn = document.querySelector('.js-add-btn');
let labelCounter = 6;

addBtn.addEventListener('click', onAddBtnClick);

function onAddBtnClick() {
  const btn = document.createElement('button');
  btn.textContent = 'Кнопка ${labelCounter}';
  btn.type = 'button';

  container.appendChild(btn);
  labelCounter += 1;
} */

//2
// Делегирование событий 1 вариант 25 мин

/*const tagsContainer = document.querySelector('.js-tags');
let selectedTag = null;//для вывода в консоль dataset

tagsContainer.addEventListener('click', onTagsContainerClick);

function onTagsContainerClick(evt) {
  if (evt.target.nodeName !== 'BUTTON') {//для клика только на кнопку
    return;
  }

  const currentActiveBtn = document.querySelector('.tags__btn--active');
  //этим делаем нажатую кнопку не активной при нажатии на другую кнопку
  if (currentActiveBtn) {
    currentActiveBtn.classList.remove('tags__btn--active');
  }
//currentActiveBtn?.classList.remove('tags__btn--active');//вместо if
  //выделяется синим при нажатии
  const nextActiveBtn = evt.target;
  nextActiveBtn.classList.add('tags__btn--active');
  selectedTag = nextActiveBtn.dataset.value;//для вывода в консоль dataset

  console.log(selectedTag)//для вывода в консоль dataset
}*/

// Делегирование событий 2 вариант 43 мин
/*const tagsContainer = document.querySelector('.js-tags');
const selectedTag = new Set();

tagsContainer.addEventListener('click', onTagsContainerClick);

function onTagsContainerClick(evt) {
  if (evt.target.nodeName !== 'BUTTON') {
    return;
  }
  
  const btn = evt.target;
  const tag = btn.dataset.value;
  const isActive = btn.classList.contains('tags__btn--active')
  if (isActive) {
    selectedTag.delete(tag);
  } else {
    selectedTag.add(tag);
    }
  
  btn.classList.toggle('tags__btn--active');//делает активным и не активным
  console.log(selectedTag)
}*/

// Как в домашке
// Мастерская колорпикер 1:00:00 на 1:24:00 обьясняет как делал 

const colors = [
  { hex: '#F44336', rgb: '244,67,54' },
  { hex: '#e91e63', rgb: '233,30,99' },
  { hex: '#9c27b0', rgb: '156,39,176' },
  { hex: '#673ab7', rgb: '103,58,183' },
  { hex: '#3f51b5', rgb: '63,81,181' },
  { hex: '#2196f3', rgb: '33,150,243' },
];

const paletteContainer = document.querySelector('.js-palette');
const cardsMarkup = createColorCardsMarkup(colors);// 1.2 вызвали функцию createColorCardsMarkup

// 1.3 повесили стороку разметки cardsMarkup с помощью 
// этого метода insertAdjacentHTML
paletteContainer.insertAdjacentHTML('beforeend', cardsMarkup);

// 2 шаг реализация делегирования
paletteContainer.addEventListener('click', onPaletteContainerClick)

// 1 createColorCardsMarkup через map div сделалу одну шаблоную строку разметки
function createColorCardsMarkup(colors) {
  return colors.map(({ hex, rgb }) => {
    return `
  <div class=" palette js-palette">
  <div class="color-card">
      <div
        class="color-swatch"
        data-hex = "${hex}"
        data-rqb = "${rgb}"
        style="background-color: ${hex}"
      ></div>
    <div class="color-meta">
      <p>HEX: ${hex}</p>
      <p>RGB: ${rgb}</p>
    </div>
  </div>
</div>
`;
  })
    .join('');
}
// 2.1 Обработчик события клика, сделали клацанье кода только в color-swatch
function onPaletteContainerClick(evt) {
  const isColorSwatchEl = evt.target.classList.contains('color-swatch');
  if (!isColorSwatchEl) {
    return;
  }

// 2.3
  const swatchEl = evt.target;
  const parentColorCard = swatchEl.closest('.color-card');
//3
//3.1 здесь вызываются 3 функции 
  removeActiveCardClass(); // убрать активный класс
  addActiveCardClass(parentColorCard) // добавить активный класс
  setBodyBgColor(swatchEl.dataset.hex)
}
// 3.1 анимашки и backgroundColor
function setBodyBgColor(color) {
  document.body.style.backgroundColor = color
}
 // 3 анимашки с помощью класса
function removeActiveCardClass() {
  const currentActiveCard = document.querySelector('.color-card.is-active');
  if (currentActiveCard) {
    currentActiveCard.classList.remove('is-active');
  }
}
// 3 добавляем
function addActiveCardClass(card) {
  card.classList.add('is-active')
}