let heads = 0;
let tails = 0;
let coin = document.querySelector(".coin");
let flipBtn = document.querySelector("#flip-button");
let resetBtn = document.querySelector("#reset-button");
let isFlipping = false;

function flipCoin() {
    if (isFlipping) return;
    
    isFlipping = true;
    
    let i = Math.floor(Math.random() * 2);
    let rotation = i ? 1800 : 1980;  // 1800 pour la face, 1980 pour la pile
    let startRotation = gsap.getProperty(coin, "rotationX");
    let endRotation = startRotation + rotation;

    gsap.to(coin, {
        rotationX: endRotation,
        duration: 3,
        onComplete: () => {
            isFlipping = false;
            // Vérifiez la rotation finale pour mettre à jour les compteurs
            let finalRotation = gsap.getProperty(coin, "rotationX");
            if ((finalRotation + 180) % 360 < 180) {
                heads++;
            } else {
                tails++;
            }
            updateStats();  // Mettez à jour les statistiques à la fin de l'animation
        }
    });

    disableButton();
}

flipBtn.addEventListener("click", flipCoin);

coin.addEventListener("click", flipCoin);

function updateStats() {
	document.querySelector("#heads-count").textContent = `Faces: ${heads}`;
	document.querySelector("#tails-count").textContent = `Piles: ${tails}`;
}

function disableButton() {
	flipBtn.disabled = true;
	setTimeout(function () {
		flipBtn.disabled = false;
	}, 3000);
}

resetBtn.addEventListener("click", () => {
	if (isFlipping) return;
	coin.style.animation = "none";
	heads = 0;
	tails = 0;
	updateStats();
});