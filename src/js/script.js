window.addEventListener('DOMContentLoaded', () => {
    
    const loadContent = async (url, callback) => {
        await fetch(url)
            .then(request => request.json())
            .then(json => createElement(json.goods));
        callback();
    };

    function createElement(arr) {
        const goodsWrapper = document.querySelector('.goods__wrapper');
        arr.forEach(function(item){
            let card = document.createElement('div');
            card.classList.add('goods__item');
            card.innerHTML = `
            <img class="goods__img" src="${item.url}" alt="phone">
            <div class="goods__colors">Доступно цветов: 4</div>
            <div class="goods__title">
                ${item.title}
            </div>
            <div class="goods__price">
                <span>${item.price}</span> руб/шт
            </div>
            <button class="goods__btn">Добавить в корзину</button>
            `;
            goodsWrapper.appendChild(card);
        });
    }
    loadContent('js/db.json', () =>{
    const cartWrapper = document.querySelector('.cart__wrapper'),
        cart = document.querySelector('.cart'),
        close = document.querySelector('.cart__close'),
        open = document.querySelector('#cart'),
        goodsBtn = document.querySelectorAll('.goods__btn'),
        products = document.querySelectorAll('.goods__item'),
        confirm = document.querySelector('.confirm'),
        badge = document.querySelector('.nav__badge'),
        totalCost = document.querySelector('.cart__total > span'),
        titles = document.querySelectorAll('.goods__title');    


    function openCart() {
        cart.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeCart() {
        cart.style.display = 'none';
        document.body.style.overflow = '';
    }

    open.addEventListener('click', openCart);
    close.addEventListener('click', closeCart);


    goodsBtn.forEach(function(btn, i) {
        btn.addEventListener('click', () => {
            const item = products[i].cloneNode(true),
                trigger = item.querySelector('button'),
                removeBtn = document.createElement('div');
            trigger.remove();
            removeBtn.classList.add('goods__item-remove');
            removeBtn.innerHTML = '&times';
            item.appendChild(removeBtn);
            cartWrapper.appendChild(item);
            removeFromCart();
            showConfirm();
            calcGoods();
            sumGoods();
            checkCart();
        });
    });

    function sliceTitles() {
        titles.forEach(function(title) {
            if (title.textContent.length > 50) {
                const str = title.textContent.slice(0, 70) + '...';
                title.textContent = str;
            }
        });
    }

    function showConfirm() {
        confirm.style.display = 'block';
        let counter = 100;
        const id = setInterval(frame, 20);
        function frame() {
            if (counter > 10) {
                counter--;
                confirm.style.transform = `translateY(-${counter}px)`;
                confirm.style.opacity = '.' + counter;
            } else {
                clearInterval(id);
                confirm.style.display = 'none';
            }
        }
    }

    function calcGoods() {
        let items = cartWrapper.querySelectorAll('.goods__item');
        badge.textContent = items.length;
        
    }

    function sumGoods() {
        const prices =  cartWrapper.querySelectorAll('span');
        let total = 0;
        prices.forEach(function(cost) {
            total += +cost.textContent;
        });
        totalCost.textContent = total;
    }

    function removeFromCart() {
        const removeBtns = cartWrapper.querySelectorAll('.goods__item-remove');
        removeBtns.forEach(function(btn) {
            btn.addEventListener('click', function(){
                btn.parentElement.remove();
                calcGoods();
                sumGoods();
                checkCart();
            });
        });
    }

    function checkCart() {
        let empty = cartWrapper.querySelector('.empty');
        const items = cartWrapper.querySelectorAll('.goods__item');
        if (items.length == 0) {
            empty.style.display = 'block';
        } else {
            empty.style.display = 'none';
        }
    }   
    sliceTitles();
    });
});