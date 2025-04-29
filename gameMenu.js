document.addEventListener('DOMContentLoaded', () => {
    const title = document.createElement('h2')
    const gameSection = document.querySelector('.game-section__container')
    const button = document.createElement('button')
    const CARDARRAY = [];
    const btn = document.querySelector('.btn__newGame')

    let firstCard = null;
    let secondCard = null;

    title.textContent = "Выбор сложности"
    title.classList.add('game-menu__title')

    btn.textContent = "Начать новую игру"
    btn.classList.add('btn', 'btn__newGame')
    

    document.querySelector('.confetti').innerHTML = '';

    const createDifficulButton = (difficult) => {
        const button = document.createElement('button')

        button.classList.add('btn', 'btn-light', 'btn-lg')
        button.textContent = `${difficult} карт`

        button.addEventListener('click', () => startGame(difficult))

        return button;
    }
    
    gameSection.append (
        title,
        createDifficulButton(8),
        createDifficulButton(10),
        createDifficulButton(12),
        createDifficulButton(14),
        createDifficulButton(16),
    )

    function startGame(difficulty) {
        
        //Делаем таймер
        let seconds = 0;
        const intervalId = setInterval(() => {
            
            seconds++;
            document.querySelector('.timerStyle').textContent = (`${seconds} сек`)
            document.querySelector('.timerStyle').style.visibility = 'visible'

            console.log(`Секунд: ${seconds}`);
            
            //Условие таймера. Если таймер больше 60 сек или все карточки собраны, то отображается попап
            if (seconds >= 60 || CARDARRAY.length === document.querySelectorAll(".success").length) {
                console.log("Секунд больше 60!");
                document.querySelector('.popup').style.visibility = 'visible'
                clearInterval(intervalId); // Останавливаем интервал
                }
            }, 1000);

        // Очистить текущие карточки
        gameSection.innerHTML = '';
    
        // Создаем карточки
        let createNumbersArray = () => {
            for (let i = 1; i <= difficulty; i++) {
                CARDARRAY.push(i,i)
            }
        }
        createNumbersArray()        

        //Перемешиваем карточки
        function shuffle() {
            for (let i = 1; i < CARDARRAY.length; i++) {
                let randomIndex = Math.floor(Math.random() * CARDARRAY.length)
        
                let temp = CARDARRAY[i];
                CARDARRAY[i] = CARDARRAY[randomIndex]
                CARDARRAY[randomIndex] = temp
            }
            return CARDARRAY
        }
        const RESULTSHUFFLEARAY = shuffle()
        console.log(RESULTSHUFFLEARAY)

        for (const cardNumber of CARDARRAY) {
            let card = document.createElement('div')
            card.textContent = cardNumber
            
            card.classList.add('card', 'flex')
            gameSection.classList.remove('game-section__container')
            gameSection.classList.add('game-section__container-card')
            btn.style.visibility = 'visible'

    
            gameSection.append(card)
    
            //Клик по карточке
            card.addEventListener('click', function(){
    
                //убираем смену статуса по нажатию на карту
                if(card.classList.contains('open') || card.classList.contains('success')){
                    return
                }
    
                //Убираем класс открытой карточки если firstCard и secondCard карты не совпали
                if(firstCard !== null && secondCard !== null){
                    firstCard.classList.remove('open')
                    secondCard.classList.remove('open')
                    firstCard = null
                    secondCard = null
                }
    
                card.classList.add('open')
    
                // Присваем к открытм картам переменные 
                if(firstCard === null){
                    firstCard = card
                } else {
                    secondCard = card
                }
    
                if(firstCard !== null && secondCard !== null){
                    let firstCardNumber = firstCard.textContent
                    let secondCardNumber = secondCard.textContent
    
                    if(firstCardNumber === secondCardNumber){
                        firstCard.classList.add('success')
                        secondCard.classList.add('success')
    
                    }
                }
            })            
        }

        // События на кнопки попапа
        const popupBtnYes = document.querySelector(".popup__btn-yes")
        const popupBtnNo = document.querySelector(".popup__btn-no")

        popupBtnYes.addEventListener('click', () => {
            document.querySelector('.popup').style.visibility = 'hidden';
            startGame()
        })

        popupBtnNo.addEventListener('click', () => {
            document.querySelector('.popup').style.visibility = 'hidden';
            location.reload()
        })
      }  
    
    //При новой игре вызываем перезагрузку страницы
    btn.addEventListener('click', () => {
        location.reload()
    })
})
