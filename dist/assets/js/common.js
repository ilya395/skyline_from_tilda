//////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// модули ///////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

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

let navigationBar = function(elem) {
    console.log(elem)
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

        // слайдер
        function goSlaiding(direction) {
            console.log('goSlaiding')
            slaiderAlredyStarted = true
            //
            const items = elem.querySelectorAll('.month-navigation__list-item')
            let collectionOfItens = []
            items.forEach((element, index) => {
                let obj = {}
                obj.id = index
                if (element.classList.contains('this-item')) {
                    obj.class = 'this-item'
                } else if (element.classList.contains('next-item')) {
                    obj.class = 'next-item'
                } else if (element.classList.contains('opacity-for-rhird')) {
                    obj.class = 'opacity-for-rhird'
                } else if (element.classList.contains('opacity-for-fourth')) {
                    obj.class = 'opacity-for-fourth'
                } else if (element.classList.contains('opacity-for-fifth')) {
                    obj.class = 'opacity-for-fifth'
                } else {
                    obj.class = null
                }
                collectionOfItens.push()
            });


            // const list = elem.querySelectorAll('.month-navigation__list')

            const listWrap = elem.querySelector('.month-navigation__list-wrap')
            // const listWidth = listWrap.offsetWidth

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

                if (previousItem) {
                    previousItem.classList.remove('opacity-for-fifth');
                    previousItem.classList.add('this-item');
                }

                thisItem.classList.remove('this-item');
                thisItem.classList.add('next-item');

                nextItem.classList.remove('next-item');
                nextItem.classList.add('opacity-for-rhird');

                rhirdItem.classList.remove('opacity-for-rhird');
                rhirdItem.classList.add('opacity-for-fourth');

                fourthItem.classList.remove('opacity-for-fourth');
                fourthItem.classList.add('opacity-for-fifth');

                // fifthItem.classList.remove('opacity-for-fifth');
                // fifthItem.classList.add('opacity-for-fourth');
            }
            function slidingToRight() {
                console.log('slidingToRight');

                thisItem.classList.remove('this-item');
                thisItem.classList.add('opacity-for-fifth');

                nextItem.classList.remove('next-item');
                nextItem.classList.add('this-item');

                rhirdItem.classList.remove('opacity-for-rhird');
                rhirdItem.classList.add('next-item');

                fourthItem.classList.remove('opacity-for-fourth');
                fourthItem.classList.add('opacity-for-rhird');

                fifthItem.classList.remove('opacity-for-fifth');
                fifthItem.classList.add('opacity-for-fourth');
            }
            //
            
            if (direction == 'left') {
                sdvig += thisItemWidth
                listWrap.style.transform = `translateX(${sdvig}px)`;
                slidingToLeft();
                console.log(`-${thisItemWidth}`)
            } else if (direction == 'right') {
                sdvig -= thisItemWidth
                listWrap.style.transform = `translateX(${sdvig}px)`;
                slidingToRight();
                console.log(`+${thisItemWidth}`)
            } else {
                console.log('Барин, да не могу я!!!')
            }
            console.log(sdvig)
            // arrow controls
            const itemsNew = elem.querySelectorAll('.month-navigation__list-item')
            for (let i = 0; i < itemsNew.length; i++) {
                // console.log(items[i], i)
                if (items[i].classList.contains('this-item') && i == 0) {
                    console.log('left not')
                    leftArrow.classList.add('end')
                    permissionOnLeft = false
                    break
                } 
                else {
                    leftArrow.classList.remove('end')
                    permissionOnLeft = true
                }
                if (items[i].classList.contains('opacity-for-fourth') && i == items.length - 2) {
                    rightArrow.classList.add('end')
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

        const methods = {
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
            }
        }

        leftArrow.addEventListener('click', function() {
            methods.clickOnLeftArrow()
        })
        rightArrow.addEventListener('click', function() {
            methods.clickOnRightArrow()
        })

        return methods
    } else {
        console.log('не найден элемент для navigationBar')
    }
}

let modalGallery = function(elemForClick, elemForMovie) {

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

    const modal = {
        open() {
            openModal()
        },
        close() {
            closeModal()
        },
        nextSlide() {

        },
        prevSlide() {

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
        // if (
        //     event.target.
        // ) {
            modal.close()
        // }
    })

    return modal
}

let modalMenu = function(elemForClick, elemForMovie, elemForCorrection) {

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

//////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// логика ///////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

window.addEventListener('load', function(){
    greetingBlock( document.querySelector('.work-area .greeting-block') );
    // что-то мутим на страницах
    // if (window.location.pathname == '/xod-stroitelstva') {
        console.log(window.location.pathname, )
        navigationBar( document.querySelector('.month-navigation') )

        modalGallery(
            document.querySelector('.content-item__preview-img'),
            document.querySelector('.modal-gallery')
        )

        modalMenu(
            document.querySelector('.menu-block .navigation-bar__burger svg.fa-bars'),
            document.querySelector('.menu-block'),
            document.querySelector('.content-block')
        )

        modalMenu(
            document.querySelector('.modal-gallery .menu-block .navigation-bar__burger svg.fa-bars'),
            document.querySelector('.modal-gallery .menu-block'),
            document.querySelector('.modal-gallery .modal-gallery__content')
        )
    // }
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