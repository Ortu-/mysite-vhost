Simple virtual-host blog
========================

![(screenshot)](https://raw.github.com/Ortu-/mysite-vhost/master/sample.JPG)

I am working on getting a basic blog site up on the MEAN stack and supporting easy to manage virtual sub-domains. This is currently just running on localhost until it gets more fleshed out.

Where does it stand now?
-------------------------------------
Separate vhost versions are running for both Angular and jQuery, pulling post header data (date, tags, title etc...) from mongo. Post content body is loaded in through static html partials.

jQuery version implements html5 history for proper handling of browser controls in a one-page app, and uses localstorage to track a reading list to fetch the next unread post.

The Angular version of course handles browser controls itself, and has moved the majority of routing to the front-end. Localstorage and next post functionality have not yet been implemented for the Angular site.

Both versions will retrieve a paginated list of recent posts and display as preview tiles.

What's next?
------------------
- Add user/guest comments functionality
- Add user sign up, sign in, profile
- Add author new post functionality
- Move post content to database
- Add controls for the preview tile pagination (prev, more, jump etc...)
- Search functionality for post tags and arbitrary user strings
- Opt-in subscribe for new post notification
- More posts
- Do it all over again on an Ember version