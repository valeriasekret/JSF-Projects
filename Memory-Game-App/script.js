const section = document.querySelector("section");
const playerLivesCount = document.querySelector("span");
let playerLives = 7;

playerLivesCount.textContent = playerLives;

// генеруємо обєкт з даними
const getData = () => [
    { imgSrc: "./img/selflove.png", name: "love-yourself" },
    { imgSrc: "./img/drink.jpg", name: "drink-water" },
    { imgSrc: "./img/eat.png", name: "eat-healthy" },
    { imgSrc: "./img/mind.png", name: "positive-mind" },
    { imgSrc: "./img/relax.jpg", name: "rest-relax" },
    { imgSrc: "./img/sleep.png", name: "sleep-well" },
    { imgSrc: "./img/breathe.png", name: "breathe" },
    { imgSrc: "./img/workout.jpg", name: "workout" },
    { imgSrc: "./img/selflove.png", name: "love-yourself" },
    { imgSrc: "./img/drink.jpg", name: "drink-water" },
    { imgSrc: "./img/eat.png", name: "eat-healthy" },
    { imgSrc: "./img/mind.png", name: "positive-mind" },
    { imgSrc: "./img/relax.jpg", name: "rest-relax" },
    { imgSrc: "./img/sleep.png", name: "sleep-well" },
    { imgSrc: "./img/breathe.png", name: "breathe" },
    { imgSrc: "./img/workout.jpg", name: "workout" },
];

//рандомізуємо картки
const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    return cardData;
};

//генеруємо картки
const cardGenerator = () => {
    const cardData = randomize();
    //додаємо html елементи для кожного обєкту у масиві
    cardData.forEach((item) => {
        const card = document.createElement("div");
        const face = document.createElement("img");
        const back = document.createElement("div");
        card.classList = 'card';
        face.classList = 'face';
        back.classList = 'back';
        //додаю інформацію на картки 
        face.src = item.imgSrc;
        card.setAttribute('name', item.name);
        //додаємо картки у секцію
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        card.addEventListener('click', (e) => {
            card.classList.toggle('toggleCard');
            checkCards(e);
        });
    });
};

//перевіряю чи картки співпадають
const checkCards = (e) => {
    const clickedCard = e.target;
    clickedCard.classList.add("flipped");
    const flippedCards = document.querySelectorAll(".flipped");
    const toggleCard = document.querySelectorAll(".toggleCard");
    //логіка
    if (flippedCards.length === 2) {
      if (
        flippedCards[0].getAttribute("name") ===
        flippedCards[1].getAttribute("name")
      ) {
        console.log("match");
        flippedCards.forEach((card) =>{
            card.classList.remove('flipped');
            card.style.pointerEvents = "none";
        });
      } else {
        console.log("wrong");
        flippedCards.forEach((card) =>{
            card.classList.remove('flipped');
            setTimeout(() => card.classList.remove('toggleCard'), 1000);
        });
        playerLives--;
        playerLivesCount.textContent = playerLives;
        if (playerLives===0){
            restart("OOPS!🥲 TRY AGAIN");
        }
      }
    }
    //перевіряємо чи ми виграли гру
    if (toggleCard.length === 16){
        restart("great job champ!");
    }
};

//почати знову
const restart = (text) =>{
    let cardData = randomize();
    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll(".card");
    cardData.forEach((item, index) =>{
        cards[index].classList.remove('toggleCard');
        //рандомізую, щоб повернути пойнтер івенти та новий порядок зображень після перезагрузки
        setTimeout (()=>{
            cards[index].style.pointerEvents = "all";
        faces[index].src = item.imgSrc;
        cards[index].setAttribute("name", item.name);
        section.style.pointerEvents = "all";
        }, 1000); 
    });
    playerLives = 7;
    playerLivesCount.textContent = playerLives;
    setTimeout(() => window.alert(text), 100);

    //const myWindow = window.open("https://raw.githubusercontent.com/valeriasekret/JSF-Projects/main/Shopping-Lists/img/jokeslogan.PNG", "", "left=500,top=180,width=440,height=440"), 100);
};

cardGenerator()