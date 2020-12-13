(() => {
	const db = firebase.database();
	const tweetsDB = db.ref('/tweets');
	let newPostForm = document.getElementById('new-post');
	let newPost = document.getElementById('new-post-text');

	const post = data => {
		const state = data.val();

		return `<figure class="profile-avatar post-section-avatar">
              <img src="images/avatar.png" alt="BP" class="profile-image">
          </figure>
          <div class="post-content">
              <div class="post-author">
                  <h3 class="post-author-name">${state.username}</h3>
                  <span class="post-delimiter fa fa-circle"></span>
                  <span class="post-date">${time_ago(new Date(state.date))}</span>
              </div>
              <p class="post-text">${state.message}</p>
              <div class="post-footer">
                  <div class="post-reaction">
                      <button class="far fa-thumbs-up like-btn" data-id="${data.key}"></button>
                      <span class="post-likes">${state.likes}</span>
                  </div>

                  <div class="post-reaction dislike-container">
                      <button class="far fa-thumbs-down dislike-btn" data-id="${data.key}"></button>
                      <span class="post-dislikes">${state.dislikes}</span>
                  </div>
              </div>
          </div>
          <div class="post-close">
              <button class="post-close fa fa-times" data-id="${data.key}"></button>
          </div>`;
	};

	newPostForm.addEventListener('submit', event => {
		// Logic when posting new tweet
		event.preventDefault();
		tweet.post(newPost.value);
		
		let tweetsEl = document.getElementById("profile-posts-count");
		tweetsEl.innerHTML = +tweetsEl.innerHTML + 1;

		newPost.value = '';
	});

	firebase.auth().onAuthStateChanged(user => {
		// Update profile posts information
		const info = auth.getUserStats(user.uid);

		info.once('value').then((snapshot) => {
			var likes = (snapshot.val() && snapshot.val().likes) || 0;
			var tweets = (snapshot.val() && snapshot.val().tweets) || 0;

			let tweetsEl = document.getElementById("profile-posts-count");
			let likesEl = document.getElementById("profile-likes-count");
			let profileNameEl = document.getElementById("profile-name");

			tweetsEl.innerHTML = tweets;
			likesEl.innerHTML = likes;
			profileNameEl.innerHTML = user.displayName;	
		});
	});

	tweetsDB.on('child_added', data => {
		//show every tweet
		if (!validateUser()) {
			return;
		}

		const loader = document.getElementById('loader');
		loader.style.display = 'none';

		let container = document.createElement("div");
		container.classList.add("post");

		let createdPost = post(data);
		container.innerHTML = createdPost;

		let postContainer = document.getElementById('post-container');
		postContainer.appendChild(container);

		let likeBtn = document.querySelectorAll(`[data-id="${data.key}"]`)[0];
		let dislikeBtn = document.querySelectorAll(`[data-id="${data.key}"]`)[1];
		let removeBtn = document.querySelectorAll(`[data-id="${data.key}"]`)[2];

		removeBtn.addEventListener('click', event => {
			event.preventDefault();

			const dbRefTweets = db.ref('tweets/' + data.key);

			dbRefTweets.once('value').then((snapshot) => {
				var userIdPost = (snapshot.val() && snapshot.val().userId) || 0;
				var likesPost = (snapshot.val() && snapshot.val().likes) || 0;
				var dislikesPost = (snapshot.val() && snapshot.val().dislikes) || 0;

				var currUserId = firebase.auth().currentUser.uid;
				if (userIdPost === currUserId) {
					const dbRefUser = auth.getUserStats(currUserId);

					dbRefUser.once('value').then((snapshot) => {
						var likesUser = (snapshot.val() && snapshot.val().likes) || 0;
						var tweetsUser = (snapshot.val() && snapshot.val().tweets) || 0;
						dbRefUser.update({ tweets: tweetsUser - 1, likes: likesUser - dislikesPost - likesPost });
						let tweetsEl = document.getElementById("profile-posts-count");
						let likesEl = document.getElementById("profile-likes-count");
						tweetsEl.innerHTML = +tweetsEl.innerHTML - 1;
						likesEl.innerHTML = +likesEl.innerHTML - (dislikesPost + likesPost);
					});
					
					tweet.delete(data.key);
					postContainer.removeChild(event.target.parentNode.parentNode);
				}
			});			
		})

		likeBtn.addEventListener('click', event => {
			event.preventDefault();

			if (likeBtn.classList.contains("liked")) {
				likeBtn.classList.remove("liked");
				tweet.decrementLikes(data.key);
			} else {
				likeBtn.classList.add("liked");
				tweet.incrementLikes(data.key);
			}
		})

		dislikeBtn.addEventListener('click', event => {
			event.preventDefault();

			if (dislikeBtn.classList.contains("disliked")) {
				dislikeBtn.classList.remove("disliked");
				tweet.decrementDislikes(data.key);
			} else {
				dislikeBtn.classList.add("disliked");
				tweet.incrementDislikes(data.key);
			}
		})
	});

	tweetsDB.on('child_changed', data => {
		let likeBtn = document.querySelectorAll(`[data-id="${data.key}"]`)[0];
		let dislikeBtn = document.querySelectorAll(`[data-id="${data.key}"]`)[1];

		// if (likeBtn.classList.contains("liked")) {
		// 	likeBtn.disabled = true;
		// }
		// if (dislikeBtn.classList.contains("disliked")) {
		// 	dislikeBtn.disabled = true;
		// }
	});

	function validateUser() {
		if (!firebase.auth().currentUser) {
			// user is not logged in
			window.location = 'index.html?error=accessDenied';
			return false;
		}

		return true;
	}

	// Helper function for converting time from milliseconds to human readable format
	function time_ago(time) {
		const time_formats = [
			[60, 'seconds', 1], // 60
			[120, '1 minute ago', '1 minute from now'], // 60*2
			[3600, 'minutes', 60], // 60*60, 60
			[7200, '1 hour ago', '1 hour from now'], // 60*60*2
			[86400, 'hours', 3600], // 60*60*24, 60*60
			[172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
			[604800, 'days', 86400], // 60*60*24*7, 60*60*24
			[1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
			[2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
			[4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
			[29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
			[58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
			[2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
			[5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
			[58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
		];
		let seconds = (+new Date() - time) / 1000,
			token = 'ago',
			list_choice = 1;

		if (seconds === 0) {
			return 'Just now'
		}
		if (seconds < 0) {
			seconds = Math.abs(seconds);
			token = 'from now';
			list_choice = 2;
		}
		let i = 0,
			format;
		while (format = time_formats[i++])
			if (seconds < format[0]) {
				if (typeof format[2] === 'string')
					return format[list_choice];
				else
					return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
			}
		return time;
	}
})();