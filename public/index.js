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
	coin.style.animation = "none";
	if (i) {
		setTimeout(function () {
			coin.style.animation = "spin-heads 3s forwards";
		}, 100);
		heads++;
	}
	else {
		setTimeout(function () {
			coin.style.animation = "spin-tails 3s forwards";
		}, 100);
		tails++;
	}
	setTimeout(updateStats, 3000);
	setTimeout(() => { isFlipping = false; }, 3000);
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