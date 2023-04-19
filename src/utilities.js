import { originalGestures, bonusGestures } from "./gestures";

export function elt(type, attrs, ...children) {
  const dom = document.createElement(type);
  if (attrs) Object.assign(dom, attrs);

  for (let child of children) {
    if (typeof child === "string")
      dom.appendChild(document.createTextNode(child));
    else dom.appendChild(child);
  }

  return dom;
}

export function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function checkIsOriginalGame() {
  return localStorage.getItem("isOriginalGame") === "true";
}

export function getScore() {
  return Number(localStorage.getItem("score"));
}

export function getRightGestures() {
  const isOriginalGame = checkIsOriginalGame();
  return isOriginalGame ? originalGestures : bonusGestures;
}
