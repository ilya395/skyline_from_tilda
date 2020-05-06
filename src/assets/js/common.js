//////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// модули ///////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

let globalDataArray = [];
const namesOfMonths = ['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь'];

let greetingBlock = function(elem) {
    console.log(elem);
    if (elem) {
        let greetingBlock = elem;
        setTimeout(function() {
            function greetingHandler() {
                greetingBlock.classList.add('go-away-plz');
                greetingBlock.classList.remove('go-movie', 'transparent');               
            }
            greetingBlock.addEventListener('transitionend', greetingHandler)
            greetingBlock.classList.add('go-movie', 'transparent');
        }, 2500);
    } else {
        console.log('не найден элемент для greetingBlock')
    }
}

let NavigationBar = function(
    elem, // главная обертка
    elemForMonts, // обертка для перечня месяцев по годам
    parentForDaysOfOneMonth, // обертка для дней одного месяца
    parentForTitle, // обертка для заголовка страницы
    parentForText, // обертка для текста страницы
    parentForImages, // обертка для картинок
    parentForDaysInGallery, // обертка для дней в галлерее
    parentForTitleInGallery, // обертка для заголовка в галлерее
    parentForImagesInGallery // обертка для картинок в галлерее
    ) {
    // console.log(elem)
    if (elem) {

        // elem's
        const awaitPlz = 200
        // const items = elem.querySelectorAll('.month-navigation__list-item')
        const leftArrow = elem.querySelector('.navigation__arrow.left')
        const rightArrow = elem.querySelector('.navigation__arrow.right')
        let slaiderAlredyStarted = false
        let sdvig = 0
        let permissionOnLeft = false
        let permissionOnRight = true

        const allMySlides = elem.querySelectorAll('.month-navigation__list-item');
        const startElem = elem.querySelector('.month-navigation__list-wrap');
        let startLength = 0;
        allMySlides.forEach((item) => {
            startLength += item.offsetWidth;
        });
        console.log(startLength);

        // слайдер
        function goSlaiding(direction) {
            console.log('goSlaiding')
            slaiderAlredyStarted = true
            //
            const items = elem.querySelectorAll('.month-navigation__list-item')

            // let collectionOfItens = []
            // items.forEach((element, index) => {
            //     let obj = {}
            //     obj.id = index
            //     if (element.classList.contains('this-item')) {
            //         obj.class = 'this-item'
            //     } else if (element.classList.contains('next-item')) {
            //         obj.class = 'next-item'
            //     } else if (element.classList.contains('opacity-for-rhird')) {
            //         obj.class = 'opacity-for-rhird'
            //     } else if (element.classList.contains('opacity-for-fourth')) {
            //         obj.class = 'opacity-for-fourth'
            //     } else if (element.classList.contains('opacity-for-fifth')) {
            //         obj.class = 'opacity-for-fifth'
            //     } else {
            //         obj.class = null
            //     }
            //     collectionOfItens.push()
            // });


            // const list = elem.querySelectorAll('.month-navigation__list')

            const listWrap = elem.querySelector('.month-navigation__list-wrap')

            const activeItem = elem.querySelector('.month-navigation__list-item.active')
            let activeItemWidth = activeItem.offsetWidth

            const thisItem = elem.querySelector('.month-navigation__list-item.this-item')
            const thisItemWidth = thisItem.offsetWidth

            const nextItem = elem.querySelector('.month-navigation__list-item.next-item')

            const rhirdItem = elem.querySelector('.month-navigation__list-item.opacity-for-rhird')

            const fourthItem = elem.querySelector('.month-navigation__list-item.opacity-for-fourth')

            let fifthItemIndex = null;
            let previousItemIndex = null;
            for (let i = 0; i < items.length; i++) {
                if (items[i].classList.contains('opacity-for-fourth')) {
                    fifthItemIndex = i + 1
                }
                //
                if (items[i].classList.contains('this-item') && (i - 1 > -1)) {
                    previousItemIndex = i - 1
                }
            }
            const fifthItem = items[fifthItemIndex]
            const previousItem = items[previousItemIndex]

            function slidingToLeft() {
                console.log('slidingToLeft')

                let activeIndex = 0;

                for (let i = 0; i < items.length; i++) {
                    if (items[i].classList.contains('active')) {
                        items[i].classList.remove('active');
                        activeIndex = i;
                    }
                }

                items[activeIndex - 1].classList.add('active');

                // if (previousItem) {
                //     previousItem.classList.remove('opacity-for-fifth');
                //     previousItem.classList.add('this-item');
                // }

                // thisItem.classList.remove('this-item');
                // thisItem.classList.add('next-item');

                // nextItem.classList.remove('next-item');
                // nextItem.classList.add('opacity-for-rhird');

                // rhirdItem.classList.remove('opacity-for-rhird');
                // rhirdItem.classList.add('opacity-for-fourth');

                // fourthItem.classList.remove('opacity-for-fourth');
                // fourthItem.classList.add('opacity-for-fifth');

                // fifthItem.classList.remove('opacity-for-fifth');
                // fifthItem.classList.add('opacity-for-fourth');
            }
            function slidingToRight() {
                console.log('slidingToRight');

                let activeIndex = 0;

                for (let i = 0; i < items.length; i++) {
                    if (items[i].classList.contains('active')) {
                        items[i].classList.remove('active');
                        activeIndex = i;
                    }
                }

                items[activeIndex + 1].classList.add('active');

                // thisItem.classList.remove('this-item');
                // thisItem.classList.add('opacity-for-fifth');

                // nextItem.classList.remove('next-item');
                // nextItem.classList.add('this-item');

                // rhirdItem.classList.remove('opacity-for-rhird');
                // rhirdItem.classList.add('next-item');

                // fourthItem.classList.remove('opacity-for-fourth');
                // fourthItem.classList.add('opacity-for-rhird');

                // fifthItem.classList.remove('opacity-for-fifth');
                // fifthItem.classList.add('opacity-for-fourth');
            }
            //
            
            if (direction == 'left') {
                // sdvig += thisItemWidth
                sdvig += activeItemWidth
                listWrap.style.transform = `translateX(${sdvig}px)`;
                slidingToLeft();
                console.log(`-${thisItemWidth}`)
            } else if (direction == 'right') {
                // sdvig -= thisItemWidth
                sdvig -= activeItemWidth
                listWrap.style.transform = `translateX(${sdvig}px)`;
                slidingToRight();
                console.log(`+${thisItemWidth}`)
            } else {
                console.log('Барин, да не могу я!!!')
            }
            console.log(sdvig)
            // arrow controls
            const itemsNew = elem.querySelectorAll('.month-navigation__list-item')
            let visibleSlides = 5;
            for (let i = 0; i < itemsNew.length; i++) {
                // console.log(items[i], i)
                // if (items[i].classList.contains('this-item') && i == 0) {
                if (items[i].classList.contains('active') && i == 0) {
                    console.log('left not')
                    // moreSlides('left')
                    leftArrow.classList.add('end')
                    permissionOnLeft = false
                    break
                } 
                else {
                    leftArrow.classList.remove('end')
                    permissionOnLeft = true
                }
                if (items[i].classList.contains('active') && i == items.length - visibleSlides) {
                    rightArrow.classList.add('end')
                    // moreSlides('right')
                    permissionOnRight = false
                    break
                } 
                else {
                    rightArrow.classList.remove('end')
                    permissionOnRight = true
                }
            }
            //
            slaiderAlredyStarted = false
        }

        function moreSlides(direction) {
            const itemsArray = [];
            const instance = allMySlides;
            // const ofset .offsetWidth
            instance.forEach((item) => {
                let clone = item.cloneNode(true);
                clone.classList.remove('this-item', 'next-item', 'opacity-for-rhird', 'opacity-for-fourth');
                clone.classList.add('opacity-for-fifth');
                itemsArray.push(clone);
            })
            if (direction == 'left') {
                // elem.querySelector('.month-navigation__list-wrap').style.transform = `translateX(-${startLength}px)`;
                let n = 0;

                let reverseArray = itemsArray;
                reverseArray.reverse().forEach((item) => {
                    elem.querySelector('.month-navigation__list-wrap').prepend(item);
                    n += item.offsetWidth;
                    elem.querySelector('.month-navigation__list-wrap').style.transform = `translateX(-${n}px)`;
                });
                // let str = startElem.style.transform;
                // let array = str.split('(');
                // let arrayParth = array[1].split('px');
                // let number = Number(arrayParth[0]) + startLength;
                // console.log(Number(arrayParth[0]), startLength);
                
            } else if (direction == 'right') {
                itemsArray.forEach((item) => {
                    elem.querySelector('.month-navigation__list-wrap').append(item);
                });
            } else {
                console.log(`can't`);
            }
        }

        function openMonth() {
            let parent = event.target.parentElement;

            for (let i of elemForMonts.children) {
                if (i.classList.contains('this-item')) {
                    i.classList.remove('this-item');
                    i.classList.add('opacity-for-fifth');
                }
            }

            parent.classList.remove('opacity-for-fifth');
            parent.classList.add('this-item');

            console.log(parent)

            let year = parent.querySelector('span').innerText;
            let month = parent.querySelector('a').dataset.hodDate;
            console.log(month, year);

            // очисти все обертки верстке во избежании смешивания данных
            parentForDaysOfOneMonth.innerHTML = '';
            parentForDaysInGallery.innerHTML = '';
            parentForImagesInGallery.innerHTML = '';
            // 

            let firstMatch = 0

            globalDataArray.forEach((item, index) => {
                if (
                    item['date-mod'][1] == +month &&
                    item['date-mod'][0] == +year
                ) {
                    _collectionOfDays(parentForDaysOfOneMonth, item['date-mod'][2], namesOfMonths[item['date-mod'][1] - 1], item.id);
                    _collectionOfDaysInGallery(parentForDaysInGallery, item['date-mod'][2], namesOfMonths[item['date-mod'][1] - 1], item.id);

                    if (firstMatch == 0) {
                        _titleOnPage(parentForTitle, item.title);
                        _textOnPage(parentForText, item.content);
                        _imagesOnPage(parentForImages, item.gallery);
                        _titleInGallery(parentForTitleInGallery, item.title);
                        _imagesInGallery(parentForImagesInGallery, item.gallery);

                        firstMatch++;
                    }

                }


            });
        }
        // первичная отрисовка
        function workWithData(object) {
            let thisMonth = 0;
            let newYear = true;
            let thisYear = 0;

            let firstMonth = 0;
            let firstYear = 0;
            console.log(object);

            // очисти все обертки верстке во избежании смешивания данных
            elemForMonts.innerHTML = '';
            parentForDaysOfOneMonth.innerHTML = '';
            parentForDaysInGallery.innerHTML = '';
            parentForImagesInGallery.innerHTML = '';
            // 

            for (let obj of object) {
                let timestamp = obj.date * 1000;
                let t = new Date(timestamp);
                let array = [];
                array.push(t.getFullYear());
                array.push(t.getMonth() + 1);
                array.push(t.getDate());
                obj['date-mod'] = array;
                globalDataArray.push(obj);

                if (thisYear != t.getFullYear()) {
                    thisYear = t.getFullYear();
                    newYear = true
                } else {
                    newYear = false
                }

                if (thisMonth != t.getMonth() + 1) {
                    thisMonth = t.getMonth() + 1;

                    _collectionOfMonths(elemForMonts, t.getMonth(), t.getFullYear(), newYear);
                }

                if (firstMonth == 0) {
                    firstMonth = t.getMonth() + 1;
                    firstYear = t.getFullYear();
                    //
                    _titleOnPage(parentForTitle, obj.title);
                    _textOnPage(parentForText, obj.content);
                    _imagesOnPage(parentForImages, obj.gallery);
                    //
                    _titleInGallery(parentForTitleInGallery, obj.title);
                    _imagesInGallery(parentForImagesInGallery, obj.gallery);
                }

                if (t.getMonth() + 1 == firstMonth && t.getFullYear() == firstYear) {
                    _collectionOfDays(parentForDaysOfOneMonth, t.getDate(), namesOfMonths[t.getMonth()], obj.id);
                    _collectionOfDaysInGallery(parentForDaysInGallery, t.getDate(), namesOfMonths[t.getMonth()], obj.id)
                }
            }
            // console.log(globalDataArray);

        }
        // в навигацию по месяцам
        function _collectionOfMonths(element, month, year, newYear) {
            let html = ``;
            const newY = newYear == true ? 'visible' : ''
            if (element.children.length > 0) {
                html = `
                <div class="month-navigation__list-item hovered opacity-for-fifth">
                    <span class="no-tach ${newY}">
                        ${year}
                    </span>
                    <a href="#" data-hod-date="${month + 1}">
                        ${namesOfMonths[month]}
                    </a>
                </div>
                `;
            } else {
                html = `
                <div class="month-navigation__list-item hovered this-item active">
                    <span class="no-tach ${newY}">
                        ${year}
                    </span>
                    <a href="#" data-hod-date="${month + 1}">
                        ${namesOfMonths[month]}
                    </a>
                </div>
                `;                    
            }
            element.insertAdjacentHTML('beforeend', html);
            
        }
        // дни месяца
        function _collectionOfDays(element, day, month, id) {
            let html = ``;
            if (element.children.length > 0) {
                html = `
                    <div class="inner-block mob-next-article" data-event-id="${id}">
                        ${day} ${month}
                    </div>
                `;
            } else {
                html = `
                    <div class="inner-block active" data-event-id="${id}">
                        ${day} ${month} 
                    </div>
                `;
            }
            element.insertAdjacentHTML('beforeend', html)
        }
        // контент
        function _titleOnPage(element, title) {
            element.innerHTML = title;
        }
        function _textOnPage(element, text) {
            element.innerHTML = text;
        }
        function _imagesOnPage(element, gallery) {
            element.querySelector('.vertical-image').setAttribute('src', gallery[0]);
            element.querySelector('.horizontal-image').setAttribute('src', gallery[1]);
        }
        // галлерея
        function _collectionOfDaysInGallery(element, day, month, id) {
            let html = ``;
            if (element.children.length > 0) {
                html = `
                    <div class="inner-block not-visible-in-mob" data-event-id="${id}">
                        ${day} ${month}
                    </div>
                `;
            } else {
                html = `
                    <div class="inner-block active" data-event-id="${id}">
                        ${day} ${month}
                    </div>
                `;
            }
            element.insertAdjacentHTML('beforeend', html);
        }
        function _titleInGallery(element, title) {
            element.innerHTML = title;
        }
        function _imagesInGallery(element, gallery) {
            for (let i = 0; i < gallery.length; i++) {
                let html = ``;
                if (i == 0) {
                    html = `
                        <div class="modal-gallery__content-item active">
                            <img src="${gallery[i]}" alt="" class="modal-gallery__content-image">
                        </div>
                    `;
                } else {
                    html = `
                        <div class="modal-gallery__content-item">
                            <img src="${gallery[i]}" alt="" class="modal-gallery__content-image">
                        </div>            
                    `;
                }
                element.insertAdjacentHTML('beforeend', html);
            }
        }
        // выкачать все данные по месяцам
        function fetchOnWp() {
            let sendAjax = function (formData) {
                fetch(
                    window.wp.ajax_url, // '/wp-admin/admin-ajax.php', // точка входа
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded', // отправляемые данные 
                        },
                        body: formData
                    }
                )
                .then(
                    response => {
                        console.log('Сообщение отправлено методом fetch')
                        return response.json()
                    }
                )
                .then(
                    response => {
                        // console.log(response)
                        workWithData(response)
                    }
                )
                .catch(
                    error => {
                        console.error(error)
                    }
                )
            }
            let formData = `action=all_data_about_hod&type=event`;
            sendAjax(formData);            
        }

        const methods = {
            giveMeDataPlz() {
                fetchOnWp();
            },
            clickOnLeftArrow() {
                if (!leftArrow.classList.contains('end') && permissionOnLeft == true) {
                    if (slaiderAlredyStarted == false) {
                        goSlaiding('left')
                    } else {
                        setTimeout(function(){
                            goSlaiding('left')
                        }, awaitPlz);
                    }
                }
            },
            clickOnRightArrow() { 
                if (!rightArrow.classList.contains('end') && permissionOnRight == true) {
                    if (slaiderAlredyStarted == false) {
                        goSlaiding('right')
                    } else {
                        setTimeout(function(){
                            goSlaiding('right')
                        }, awaitPlz);
                    }
                }
            },
            openThisMonth() {
                openMonth()
            }
        }

        leftArrow.addEventListener('click', function() {
            methods.clickOnLeftArrow()
        });
        rightArrow.addEventListener('click', function() {
            methods.clickOnRightArrow()
        });

        elem.addEventListener('click', function(){
            event.preventDefault();
            if (event.target.dataset.hodDate) {
                methods.openThisMonth();
            }
        })

        return methods
    } else {
        console.log('не найден элемент для navigationBar')
    }
}

let modalGallery = function(elemForClick, elemForMovie, wrapForDayOfOneMonth, wrapForTitle, wrapForImagesOfDay, wrapForManageButtonsSlider) {

    const closeBtn = elemForMovie.querySelector('.modal-gallery__close')

    function openModal() {
        elemForMovie.classList.add('active');
        raf(function(){
            elemForMovie.classList.add('movie');
        })
    }

    function closeModal() {
        function handlerCloseModal() {
            elemForMovie.classList.remove('active');
            //
            elemForMovie.removeEventListener('transitionend', handlerCloseModal)
        }
        elemForMovie.addEventListener('transitionend', handlerCloseModal)
        elemForMovie.classList.remove('movie');
    }

    function openDay(parameter) {
        let id = parameter || event.target.dataset.eventId;

        const parent = event.target.parentElement;
        for (let j of wrapForDayOfOneMonth.children) {
            if (j.classList.contains('active')) {
                j.classList.remove('active');
                j.classList.add('not-visible-in-mob');
            }

            if (j.dataset.eventId == id) {
                j.classList.remove('not-visible-in-mob');
                j.classList.add('active');
            }
        }

        // event.target.classList.remove('not-visible-in-mob');
        // event.target.classList.add('active');

        let item = globalDataArray.find((item) => {
            if (item.id == id) {
                return item
            }
        })

        wrapForTitle.innerHTML = item.title;

        wrapForImagesOfDay.innerHTML = '';

        for (let i = 0; i < item.gallery.length; i++) {
            let html = ``;
            if (i == 0) {
                html = `
                <div class="modal-gallery__content-item active">
                    <img src="${item.gallery[i]}" alt="" class="modal-gallery__content-image">
                </div>
                `;
            } else {
                html = `
                <div class="modal-gallery__content-item">
                    <img src="${item.gallery[i]}" alt="" class="modal-gallery__content-image">
                </div>
                `;
            }
            wrapForImagesOfDay.insertAdjacentHTML('beforeend', html);
        }

    }

    function sliding(param) {
        let indexActive = null;
        for (let i = 0; i < wrapForImagesOfDay.children.length; i++) {
            if (wrapForImagesOfDay.children[i].classList.contains('active')) {
                indexActive = i;
                wrapForImagesOfDay.children[i].classList.remove('active');
            }
        }

        let indexNext = param == 'right' ? indexActive + 1 : indexActive - 1;

        if (indexNext >= wrapForImagesOfDay.children.length) {
            indexNext = 0;
        }
        if (indexNext < 0) {
            indexNext = wrapForImagesOfDay.children.length - 1;
        }
        console.log(indexActive, indexNext);
        wrapForImagesOfDay.children[indexNext].classList.add('active');
    }

    const modal = {
        open() {
            openModal();
            let items = document.querySelector('.content-block .content-item__tab-title').children;
            for (let i of items) {
                if (i.classList.contains('active')) {
                    openDay(i.dataset.eventId);
                }
            }
        },
        close() {
            closeModal()
        },
        openNewDay() {
            openDay()
        },
        nextSlide() {
            sliding('right');
        },
        prevSlide() {
            sliding('left');
        }
    }

    elemForClick.addEventListener('click', function() {
        console.log(event.target)
        if (
            event.target.dataset.modal
        ) {
            modal.open()
        }
    })

    closeBtn.addEventListener('click', function() {
        modal.close()
    })

    wrapForDayOfOneMonth.addEventListener('click', function() {
        if (event.target.dataset.eventId) {
            modal.openNewDay()
        }
    })

    wrapForManageButtonsSlider.addEventListener('click', function () {
        if (event.target.dataset.manageBtn || event.target.parentElement.dataset.manageBtn || event.target.parentElement.parentElement.dataset.manageBtn) {
            
            let target = event.target.dataset.manageBtn ? event.target.dataset.manageBtn : event.target.parentElement.dataset.manageBtn;
            if (!target) {
                target = event.target.parentElement.parentElement.dataset.manageBtn;
            } 

            target == 'left' ? modal.prevSlide() : modal.nextSlide();
        }
    })

    return modal
}

let ModalMenu = function(elemForClick, elemForMovie, elemForCorrection) {

    const closeBtn = elemForMovie.querySelector('.navigation-bar__burger svg.fa-times')

    function openModalMenu() {
        elemForCorrection.classList.add('correction')
        elemForMovie.classList.add('mobile')
        raf(function(){
            elemForMovie.classList.add('active', 'background')
        })
    }

    function closeModalMenu() {
        function handler() {

            elemForCorrection.classList.remove('correction')
            elemForMovie.classList.remove('mobile')

            //
            elemForMovie.querySelector('.navigation-bar__list ul').removeEventListener('transitionend', handler)
        }
        elemForMovie.querySelector('.navigation-bar__list ul').addEventListener('transitionend', handler)
        elemForMovie.classList.remove('active')
        elemForMovie.classList.remove('background')
    }

    const menu = {
        open() {
            openModalMenu() 
        },
        close() {
            closeModalMenu()
        }
    }

    elemForClick.addEventListener('click', function(){
        menu.open()
    })
    closeBtn.addEventListener('click', function(){
        menu.close()
    })

    return menu
}

let tabsMonths = function(parentOfDaysFromOneMonth, attr, elemForText, elemForImages) {

    function openTab() {
        let id = 0;
        for (let i = 0; i < parentOfDaysFromOneMonth.children.length; i++) {
            if (parentOfDaysFromOneMonth.children[i].classList.contains('active')) {
                id = parentOfDaysFromOneMonth.children[i].getAttribute(attr);
            }
        }

        function draw(obj) {
            // console.log(obj.title, elemForText.querySelector('[data-title]'));
            elemForText.innerHTML = '';

            let title = document.createElement('h3')
            title.classList.add('content-item__item-title');
            title.innerHTML = obj.title;
            elemForText.append(title);

            let content = document.createElement('div');
            content.classList.add('all-text__wrap');
            content.innerHTML = obj.content;
            elemForText.append(content);

            console.log(obj.gallery[0]);

            elemForImages.querySelectorAll('[data-modal]').forEach((item, index) => {
                item.setAttribute('src', obj.gallery[index]);
            })
            
        }

        let sendAjax = function (formData) {
            fetch(
                window.wp.ajax_url, // '/wp-admin/admin-ajax.php', // точка входа
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded', // отправляемые данные 
                    },
                    body: formData
                }
            )
            .then(
                response => {
                    console.log('Сообщение отправлено методом fetch')
                    return response.json()
                }
            )
            .then(
                response => {
                    console.log(response)
                    draw(response)
                }
            )
            .catch(
                error => {
                    console.error(error)
                }
            )
        }
        let formData = `action=ajax_even_article&id=${id}&type=event`;
        sendAjax(formData);
    }

    const tabs = {
        open() {
            openTab();
        }
    }

    parentOfDaysFromOneMonth.addEventListener('click', function() {
        if (event.target.hasAttribute(attr)) {

            for (let j of parentOfDaysFromOneMonth.children) {
                j.classList.remove('active');
            }

            event.target.classList.remove('mob-next-article');
            event.target.classList.add('active');

            tabs.open();
        } else {
            console.log('Барин, что переключать-то?')
        }
    })

    return tabs
}

let TabsForNews = function(parentOfTabs, itemsOfTabs, elemTarget, button) {



    function changeViewTab() {
        itemsOfTabs.forEach((item) => {
            item.classList.remove('active');
            event.target.dataset.postFlag ? event.target.classList.add('active') : foo()
        });
    }

    function open() {

        let flag = event.target.dataset.postFlag;
        console.log(elemTarget.children, elemTarget.children.length)
        let count_default = 5;
        let count_new = 0;

        console.log(event.target, flag)

        let sendAjax = function (formData) {
            fetch(
                window.wp.ajax_url, // '/wp-admin/admin-ajax.php', // точка входа
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded', // отправляемые данные 
                    },
                    body: formData
                }
            )
            .then(
                response => {
                    console.log('Сообщение отправлено методом fetch')
                    return response.json()
                }
            )
            .then(
                response => {
                    console.log(response)
                    draw(response, false)
                }
            )
            .catch(
                error => {
                    console.error(error)
                }
            )
        }
        let formData = `action=ajax_tabs_news&flag=${flag}&count_default=${count_default}&count_new=${count_new}`;
        sendAjax(formData);

    }

    function draw(ob, paste) {

        let obj = ob.datas;
        let content = ob['has-content'];

        console.log(content, ob['has-content'])

        paste == false ? elemTarget.innerHTML = "" : foo()

        let str = '';

        let article = function(object) {
            const type = object.type == 'news' ? 'НОВОСТЬ' : 'АКЦИЯ';
            const html = `
            <article class="content-block__content-item">
                <a href="${object.link}" class="content-item">
                    <div class="content-item__info">
                        <div class="content-item__tab-title content-prev-title">
                            ${type}  |  ${object.date}
                        </div>
                        <h3 class="content-item__item-title">
                            ${object.title}
                        </h3>
                        <div class="content-item__description">
                            ${object['sub-title']}
                        </div>
                    </div>
                    <div class="content-item__preview-img">
                        <img src="${object.img}" alt="Preview Image" class="content-item__img">
                    </div>
                </a>                
            </article>
            `;
            return html;
        }

        for (let o of obj) {
            str += article(o);
        }

        paste == false ? elemTarget.insertAdjacentHTML('afterbegin', str) : elemTarget.insertAdjacentHTML('beforeend', str);
        // elemTarget.innerHTML(str);

        content == false ? button.classList.add('not-visible') : button.classList.remove('not-visible')
    }

    function giveMoreContent() {
        let flag = 'all';
        itemsOfTabs.forEach((item) => {
            item.classList.contains('active') ? flag = item.dataset.postFlag : foo()
        });    

        let count_default = elemTarget.children.length || 5;
        let count_new = 5;
        
        let sendAjax = function (formData) {
            fetch(
                window.wp.ajax_url, // '/wp-admin/admin-ajax.php', // точка входа
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded', // отправляемые данные 
                    },
                    body: formData
                }
            )
            .then(
                response => {
                    console.log('Сообщение отправлено методом fetch')
                    return response.json()
                }
            )
            .then(
                response => {
                    console.log(response)
                    draw(response, true)
                }
            )
            .catch(
                error => {
                    console.error(error)
                }
            )
        }
        let formData = `action=ajax_tabs_news&flag=${flag}&count_default=${count_default}&count_new=${count_new}`;
        sendAjax(formData);        
    }

    function foo() {

    }

    const methods = {
        openTab() {
            open();
            changeViewTab();
        },
        moreContent() {
            giveMoreContent();
        }
    }

    parentOfTabs.addEventListener('click', function(){
        event.target.dataset.postFlag ? methods.openTab() : foo();
    })

    button.addEventListener('click', function(){
        methods.moreContent();
    })

    return methods;
}

//////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// логика ///////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

window.addEventListener('load', function(){
    greetingBlock( document.querySelector('.work-area .greeting-block') );
    // что-то мутим на страницах
    let modalMenuInHeader = ModalMenu(
        document.querySelector('.menu-block .navigation-bar__burger svg.fa-bars'),
        document.querySelector('.menu-block'),
        document.querySelector('.content-block')
    );
    modalMenuInHeader;

    if (window.location.pathname == '/event/') {
        let navbar = NavigationBar(
            document.querySelector('.month-navigation'),
            document.querySelector('.month-navigation__list-wrap'),
            document.querySelector('.content-item__tab-title'),
            document.querySelector('.content-item__item-title'),
            document.querySelector('.all-text__wrap'),
            document.querySelector('.content-item__preview-img'),
            document.querySelector('.modal-gallery__content .modal-gallery__monts-list'),
            document.querySelector('.modal-gallery__content .modal-gallery__title'),
            document.querySelector('.modal-gallery__content .modal-gallery__wrap .modal-gallery__content-with-images')
        )
        // navigationBar.giveMeDataPlz()
        navbar.giveMeDataPlz()

        let modGal = modalGallery(
            document.querySelector('.content-item__preview-img'),
            document.querySelector('.modal-gallery'),
            document.querySelector('.modal-gallery .modal-gallery__monts-list'),
            document.querySelector('.modal-gallery .modal-gallery__title'),
            document.querySelector('.modal-gallery .modal-gallery__content-with-images'),
            document.querySelector('.modal-gallery .modal-gallery__manage-buttons'),
        )
        modGal;

        let modalMenuInGallery = ModalMenu(
            document.querySelector('.modal-gallery .menu-block .navigation-bar__burger svg.fa-bars'),
            document.querySelector('.modal-gallery .menu-block'),
            document.querySelector('.modal-gallery .modal-gallery__content')
        )
        modalMenuInGallery;

        tabsMonths(
            document.querySelector('.content-item__info .content-item__tab-title'),
            'data-event-id',
            // document.querySelector('.content-item__info .month-navigation__list-wrap'),
            document.querySelector('.content-item__info .content-item__all-text'),
            document.querySelector('.content-item .content-item__preview-img')
        )
    }

    if (window.location.pathname == '/news/') {
        let tabsForNews = TabsForNews(
            document.querySelector('.content-block .tabs-list'),
            document.querySelectorAll('.content-block .tabs-list__item-title'),
            document.querySelector('.content-block .content-block__list-items'),
            document.querySelector('.content-block .content-block__more-content')
        );
        tabsForNews;
    }

    // включаем вкладку новости
    let url = window.location.pathname;
    let myStr = url.split('/');
    console.log(url, myStr);
    myStr.forEach((item) => {
        if (item == 'news') {
            document.getElementById('menu-item-78').classList.add('current-menu-item')
        }
    })
})

//////////////////////////////////////////////////////////////////////////////
/////////////////////////// вспомогательные модули ///////////////////////////
//////////////////////////////////////////////////////////////////////////////

function raf(fn){
    window.requestAnimationFrame(function(){
        window.requestAnimationFrame(function(){
            fn();
        });
    });
}