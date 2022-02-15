import { pubSub } from "../shared/pubSub.js";
import { signupService } from "../signup/SignupService.js";
import { decodeToken } from "../utils/decodeToken.js";

import TweetService from "../tweet-list/TweetService.js"; // REFACTORIZAR
import { buildTweetDetailView } from "../tweet-list/TweetView.js"; // REFACTORIZAR

export class TweetDetailController {
  constructor(tweetDetailElement) {
    this.tweetDetailElement = tweetDetailElement;
    this.tweet = null;
  }

  async mostrarAnuncio(anuncioId) {
    if (!anuncioId) {
      pubSub.publish(
        pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,
        "Id del tweet no válido"
      );

      return;
    }

    try {
      this.tweet = await TweetService.getTweet(tweetId);
      const tweetTemplate = buildTweetDetailView(this.tweet);
      this.tweetDetailElement.innerHTML = tweetTemplate;

      this.handleDeleteButton();
    } catch (error) {
      pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error);
    }
  }

  handleDeleteButton() {
    const loggedUserToken = signupService.getLoggedUser();

    if (loggedUserToken) {
      // decodificamos token
      const userInfo = decodeToken(loggedUserToken);

      // comprobamos si el id de usuario logado es el mismo que el id del creador del tweet
      const isOwner = this.isTweetOwner(userInfo.userId);
      console.log(isOwner);

      // pintamos botón
      if (isOwner) {
        this.drawDeleteButton();
      }
    }
  }

  isTweetOwner(userId) {
    return userId === this.tweet.userId;
  }

  drawDeleteButton() {
    const buttonElement = document.createElement("button");
    buttonElement.textContent = "Borrar Tweet";

    this.tweetDetailElement.appendChild(buttonElement);

    this.tweetDetailElement.addEventListener("click", () => {
      this.deleteTweet();
    });
  }

  async deleteTweet() {
    const shouldDelete = window.confirm("Estás seguro de borrar el tweet?");

    if (shouldDelete) {
      try {
        await TweetService.deleteTweet(this.tweet.id);
        window.location.href = "/";
      } catch (error) {
        // utilizamos pubsub
      }
    }
  }
}
