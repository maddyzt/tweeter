/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  // sample tweet object
const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

// function to transform tweet object into html
const createTweetElement = function(tweetObject) {
  let tweet = `
      <article class="tweet-container">
        <header class="tweet-header">
          <span class="tweet-user"><i id="smiley" class="fa-solid fa-face-grin-stars"></i>${tweetObject.user.name}</span>
          <span class="username">${tweetObject.user.handle}</span>
        </header>
        <div class="tweet"><span class="input-text">${tweetObject.content.text}</span></div>
        <footer class="tweet-footer">
          <span class="tweet-date">${tweetObject.created_at}</span>
          <span class="icons">
            <i class="fa-solid fa-flag flag"></i>
            <i class="fa-solid fa-retweet retweet"></i>
            <i class="fa-solid fa-heart heart"></i>
          </span>
        </footer>
      </article>
  `
  return tweet;
};

// function to loop through tweets and createTweetElement for each
const renderTweets = function(tweetArray) {
  tweetArray.forEach( tweet => {
    let val = createTweetElement(tweet);
    $('#tweet-list').prepend(val);
  })
};

renderTweets(tweetData);
})
