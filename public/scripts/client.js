/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

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
          <span class="tweet-date">${timeago.format(tweetObject.created_at)}</span>
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

// function to post tweets
const postTweets = function () {
  $('#tweet-form').submit(function(event) {
  event.preventDefault();
  $.ajax({
    url: "/tweets",
    method: "POST",
    data: $(this).serialize()
  }).catch(err => console.log(err));
})};

// function to load tweets
const loadTweets = function () {
  $.ajax({
    url: "/tweets",
    method: "GET",
  }).then(function(response) {
    renderTweets(response);
  })
}

postTweets();
loadTweets();

});