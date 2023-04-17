const section = document.querySelector("section");
const playerLivesCount = document.querySelector("span");
let playerLives = 8;

playerLivesCount.textContent = playerLives;

// генеруємо обєкт з даними
const getData = () => [
    { imgSrc: "./img2/anxious.png", name: "anxious" },
    { imgSrc: "./img2/confused.png", name: "confused" },
    { imgSrc: "./img2/disturbed.png", name: "disturbed" },
    { imgSrc: "./img2/excited.jpg", name: "excited" },
    { imgSrc: "./img2/happy.png", name: "happy" },,
    { imgSrc: "./img2/inspired.jpg", name: "inspired" },
    { imgSrc: "./img2/loving.jpg", name: "loving" },
    { imgSrc: "./img2/sad.png", name: "sad" },
    { imgSrc: "./img2/anxious.png", name: "anxious" },
    { imgSrc: "./img2/confused.png", name: "confused" },
    { imgSrc: "./img2/disturbed.png", name: "disturbed" },
    { imgSrc: "./img2/excited.jpg", name: "excited" },
    { imgSrc: "./img2/happy.png", name: "happy" },,
    { imgSrc: "./img2/inspired.jpg", name: "inspired" },
    { imgSrc: "./img2/loving.jpg", name: "loving" },
    { imgSrc: "./img2/sad.png", name: "sad" },
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
            const myLoseWindow = window.open("https://raw.githubusercontent.com/valeriasekret/Memo-Game/main/img/lose.jpg", "", "left=473,top=280,width=500,height=281");
            setTimeout(() => {
                myLoseWindow.close();
              }, 2500);
          restart();
        }
      }
    }
    //перевіряємо чи ми виграли гру
    if (toggleCard.length === 16){
        const myWindow = window.open("https://raw.githubusercontent.com/valeriasekret/Memo-Game/main/img/win.jpg", "", "left=473,top=280,width=500,height=281");
        setTimeout(() => {
            myWindow.close();
          }, 2000);
        setTimeout(() => {
          window.location.assign('index.html');
          },2000);
    }
};

//почати знову
const restart = () =>{
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
    playerLives = 8;
    playerLivesCount.textContent = playerLives;
};

cardGenerator()