/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // show/hide the form when the arrow is clicked in the nav
  $('.new-tweet').hide();
  $('.down-arrow').click(function() {
    $('.new-tweet').slideToggle();
    $('.tweet-input').focus();
  });

  // show scroll button upon scroll down
  let $btn = $('.scroll-btn');
  $btn.hide();
  $(window).scroll(function() {
    if ($(window).scrollTop() > 300) {
      $btn.show();
    } else {
      $btn.hide();
    }
  });

  // scroll to top on click
  $('.scroll-btn').click(function() {
    $('html,body').animate({ scrollTop: 0 }, 'fast');
  });

  // define escape function
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // function to transform tweet object into html
  const createTweetElement = function(tweetObject) {
    let tweet = `
      <article class="tweet-container">
        <header class="tweet-header">
          <span class="tweet-user"><i id="smiley" class="fa-solid fa-face-grin-stars"></i>${escape(tweetObject.user.name)}</span>
          <span>${escape(tweetObject.user.handle)}</span>
        </header>
        <div class="tweet"><span class="input-text">${escape(tweetObject.content.text)}</span></div>
        <footer class="tweet-footer">
          <span class="tweet-date">${timeago.format(tweetObject.created_at)}</span>
          <span class="icons">
            <i class="fa-solid fa-flag flag"></i>
            <i class="fa-solid fa-retweet retweet"></i>
            <i class="fa-solid fa-heart heart"></i>
          </span>
        </footer>
      </article>
  `;
    return tweet;
  };

  // function to loop through tweets and createTweetElement for each
  const renderTweets = function(tweetArray) {
    tweetArray.forEach(tweet => {
      let val = createTweetElement(tweet);
      $('#tweet-list').prepend(val);
    });
  };

  // function to post tweets
  const postTweets = function() {
    $('#tweet-form').submit(function(event) {
      event.preventDefault();
      const triangleAlert = `<i class="fa-solid fa-triangle-exclamation"></i>`;
      const errorMessage1 = `<span>${triangleAlert} Cannot post 0 characters ${triangleAlert}</span>`;
      const errorMessage2 = `<span>${triangleAlert} Maximum character length exceeded ${triangleAlert}</span>`;
  
      $('.error-text').slideUp(400).text('');

      if ($('.tweet-input').val().length > 140) {
        return $('.error-text').html(errorMessage2).slideDown();
      } else if ($('.tweet-input').val().length === 0) {
        return $('.error-text').html(errorMessage1).slideDown();
      }

      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $(this).serialize()
      }).then(response => {
        $('#tweet-form').children('.tweet-input').val('');
        $('.counter').val(140);
        loadTweets();
      }).catch(err => console.log(err));
    }
    );
  };

  // function to load tweets
  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      method: "GET",
    }).then(function(response) {
      renderTweets(response);
    });
  };

  loadTweets();
  postTweets();


});