// определяет на каком устройстве открыта наша страница
const isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
			isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows());
	}
};

if (isMobile.any()) {
   document.body.classList.add('_touch');

   let menuArrows = document.querySelectorAll('.menu__arrow');
   if (menuArrows.length>0){
      for (let i = 0; i < menuArrows.length; i++) {
         const menuArrow = menuArrows[i];
         menuArrow.addEventListener('click', function (e) {
            // навешиваем класс родителю нажатой стрелки
            menuArrow.parentElement.classList.toggle('_active');
         });
      }
   }
} else {
   document.body.classList.add('_pc');
}

// прокрутка при клике

const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if(menuLinks.length>0) {
   menuLinks.forEach(menuLink => {
      menuLink.addEventListener('click', onMenuLinkClick);
   });

   function onMenuLinkClick(e) {
      // получаем объект на который мы кликнули, т.е. сама ссылка
      const menuLink = e.target;
      // проверяем заполнен ли данный data атрибут и существует ли объект, на который ссылается данный data атрибут
      if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){
         // получаем в константу сам объект и след. действием нужно высчитать положение этого объекта с учетом высоты шапки
         const gotoBlock = document.querySelector(menuLink.dataset.goto);
         // Метод Element.getBoundingClientRect() возвращает размер элемента и его позицию относительно viewport (часть страницы, показанная на экране, и которую мы видим).
         // т.е. получаем местоположение объекта в пикселях
         // pageYOffset - это то же свойство, что и scrollY и, как таковое, оно тоже возвращает количество пикселей, на которое прокручен документ по вертикали (вниз или вверх). 
         // и обязательно отнимает высоту шапки (document.querySelector('header').offsetHeight), без этого при окончании прокрутки часть контента будет скрыта 
         const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

         // делаем автоматическое закрытие меню, при клике на раздел и прокрутке к нему (для моб. устройств) 
         if(iconMenu.classList.contains('_active')) {
            document.body.classList.remove('_lock');
            iconMenu.classList.remove('_active');
            menuBody.classList.remove('_active');
         }

         // заставляем скролл прокрутиться к нужному месту
         // window.scrollTo() - прокрутка документа до указанных координат
         // 
         window.scrollTo({
            top: gotoBlockValue,
            // плавная прокрутка
            behavior: "smooth"
         });
         // отключаем работу ссылки
         e.preventDefault();
      }
   }
}

// меню бургер

const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if(iconMenu){
   iconMenu.addEventListener("click", function (e) {
      document.body.classList.toggle('_lock');
      // класс _active для iconMenu нам нужен для того чтобы анимировать бургер
      iconMenu.classList.toggle('_active');
      menuBody.classList.toggle('_active');
   });
}