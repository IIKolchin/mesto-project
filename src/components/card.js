import { like, likeDelete, cards } from "./api.js";
import { openPopup } from "./utils.js";

const popupImage = document.querySelector(".image");

function createCard(itemImage, itemLocation, itemid) {
  const cardTemplate = document.querySelector(".elements-template").content;
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const elementImage = cardElement.querySelector(".element__image");
  const likeButton = cardElement.querySelector(".element__like");
  const numberLike = cardElement.querySelector(".element__number-like");
  elementImage.src = itemImage;
  cardElement.querySelector(".element__text").textContent = itemLocation;
  elementImage.alt = `Иллюстрация места ${itemLocation}`;

  likeButton.addEventListener("click", function (evt) {
    if (!evt.target.classList.contains("element__like_active")) {
      evt.target.classList.add("element__like_active");

      like(itemid)
        .then((data) => {
          numberLike.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      evt.target.classList.remove("element__like_active");
      likeDelete(itemid)
        .then((data) => {
          numberLike.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  });

  elementImage.addEventListener("click", function () {
    openPopup(popupImage);
    const imageContainer = document.querySelector(".image__container");
    imageContainer.querySelector(".image__src").src = itemImage;
    imageContainer.querySelector(".image__place").textContent = itemLocation;
  });

  return cardElement;
}

// const cardTemplate = document.querySelector(".elements-template").content;
// const cardElement = cardTemplate.querySelector(".element").cloneNode(true);

// const numberLike = document.querySelectorAll(".element__number-like");
// console.log(numberLike);

// function likeView() {
//   cards().then((data) => {
//     data.forEach(function (element) {
//       console.log(numberLike);
//       // console.log(numberLike.textContent);
//       // console.log(element.likes.length);

//       numberLike.forEach((el) => {
//         console.log(el);
//         el.textContent = element.likes.length;
//       });
//     });
//   });
// }
// likeView();

export { createCard, popupImage };
