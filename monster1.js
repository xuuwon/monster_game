const container = document.getElementById("container");

// 몬스터 모양 만들기
const monster = document.createElement("div");
monster.textContent = "*_*";
monster.style.width = "50px";
monster.style.height = "50px";
monster.style.backgroundColor = "rgb(255, 158, 158)";
monster.style.display = "flex";
monster.style.justifyContent = "center";
monster.style.alignItems = "center";
monster.style.position = "absolute";
monster.style.pointerEvents = "all"; // div 전체가 클릭 가능하게 만듦

container.appendChild(monster);

// 화면 크기
const screenWidth = container.offsetWidth;
const screenHeight = container.offsetHeight;

// 몬스터의 이동 방향 및 속도
let xSpeed = Math.random() * 6 + 1; // X축 속도
let ySpeed = Math.random() * 6 + 1; // Y축 속도
let xPosition = 0; // 초기 X 위치
let yPosition = 0; // 초기 Y 위치

// 경계에 부딪힐 경우
function monsterXBoundary(xPosition) {
    // X축 경계에 도달했을 때 반대 방향으로 전환
    if (xPosition <= 0 || xPosition >= screenWidth - 50) {
        xSpeed = -xSpeed; // 속도 반전
    }

    return xSpeed;
}

function monsterYBoundary(yPosition) {
    // Y축 경계에 도달했을 때 반대 방향으로 전환
    if (yPosition <= 0 || yPosition >= screenHeight - 50) {
        ySpeed = -ySpeed; // 속도 반전
    }

    return ySpeed;
}

function monsterBoundary(xPosition, yPosition) { // x, y축 경계 확인 함수
    monsterXBoundary(xPosition);
    monsterYBoundary(yPosition);
}

// 몬스터 위치 업데이트 함수
function monsterPositionUpdate() {
    xPosition += xSpeed;
    yPosition += ySpeed;

    // 몬스터의 위치 업데이트
    monster.style.left = xPosition + "px";
    monster.style.top = yPosition + "px";
}

function moveMonster() {
    monsterPositionUpdate();
    monsterBoundary(xPosition, yPosition);
}

// 50ms마다 몬스터 이동
setInterval(moveMonster, 40);

// 입력 받기
let monsterHP = 100;
let attackDamage = parseInt(prompt("1회 공격시 데미지는? (양의 정수)"));

// monster 피 깎기
function monsterAttack(monsterHP) {
    monsterHP -= attackDamage;

    return monsterHP;
}

// attack 메시지 띄우기
function attackMessage() {
    const attackText = document.createElement("p");
    attackText.textContent = `Attack! : ${-attackDamage}`;
    container.appendChild(attackText);
    attackText.style.color = "red";

    return attackText;
}

// Clear 메시지 띄우기
function clearMessage() {
    const h2 = document.createElement("h2");
    h2.textContent = `몬스터 잡기 완료! 수고하셨습니다.`;
    h2.style.color = "green";
    container.appendChild(h2)

    return h2;
}

// 몬스터 죽음 확인
function checkMonsterDeath (monsterHP) {
    return monsterHP <= 0;
}

// 몬스터 죽음 처리
function handleMonsterDeath (attackText, monster) {
    container.removeChild(attackText);
    container.removeChild(monster);

    clearMessage();
}

// 몬스터 처치 시 attackText 삭제
function removeAttackText (attackText) {
    setTimeout(() => {
        container.removeChild(attackText);
    }, 300); // 0.3초 뒤 삭제
}

// 몬스터 처리
function handleMonsterState(monsterHP, attackText, monster) {
    if (checkMonsterDeath(monsterHP)) {
        handleMonsterDeath(attackText, monster);
    } else {
        removeAttackText(attackText);
    }
}

// 이벤트 리스너 함수 설정
const attackFunction = () => {
    monsterHP = monsterAttack(monsterHP);
    const attackText = attackMessage();
    handleMonsterState(monsterHP, attackText, monster); // clearText() 안에 포함
}

if (attackDamage > 0) {
    monster.addEventListener('click', attackFunction);
} else {
    alert("잘못 입력하셨습니다. 게임을 취소합니다.")
    container.removeChild(monster);
    container.style.border = "none";
}


