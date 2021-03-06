https://www.ratticusscript.com

# TL:DR;
Write all the JavaScript you want - serve users the JavaScript they _need_.

# Long Version
## What's a Static Site?
I recently became frustrated with current web development practices. Why do we treat every website as if it were an application? Why do we run so much JavaScript for otherwise simple services? Do we need 10 live analytics services? Is any of this making the web more usable, more enjoyable, or more accessible to more kinds of people? Or is it just a little better for the same people that already have access to great web experiences?

Static web sites are not driven by server logic. In general, static sites can be written without any server at all. You can just publish them to pre-configured server environments like Github Pages or Firebase. That's the traditional senese in which they're "static." Their contents are not determined _dynamically_ at the time of request. They're just a bunch of files, waiting around to be delivered to users.

## Doubly Static
While static sites of this kind do save lots of time and energy provisioning servers, they don't do much to solve the recent bloat and lack of focus on the web. A static site in this sense could be a massive React app. It could deliver a 10MB JavaScript bundle that powers offline access, real-time messaging and database access, a multiplayer browser game, or any other massive, dynamic application.

Doubly static sites are perfectly usable without any JavaScript what so ever. Not only is their content static at the time of request to the server, but their _fundamental_ content is usable as is, on arrival, without any further computation. This introduces two important ideas: progressive enhancement, and generative logic.

## Progressive Enhancement
I say their _fundamental_ content, because a site of this kind would be...pretty boring. It might even lack very useful features that users have come to expect. For example, it might be impossible for a doubly-static blog to offer a search function. Commenting on blog posts might be impossible: there would be no server *or* client logic to process and store the comments. These are cool, useful features of most blogs.

But searching and commenting are not part of the fundamental essence of a blog. The core, essential experience of a blog is that creators produce content, and consumers consume that content. When I write a blog entry, the fundamental thing I am interested in is letting people read it. When people visit my blog, the fundamental thing they expect is to read something I've written.

Progressive enhancement dictates that the most fundamental content of your site should be as broadly accessible as possible. We want that content to have the lowest barrier to entry we can imagine. That means it will be usable on as many platforms, under as many conditions, and to the greatest extent possible. For a blog like mine, that means static HTML and universal CSS, designed mobile-first. This ensures that people on bad mobile connections, reading on their small, outdated phone browsers, with all features disabled will be have a good experience reading the content I produce. My site is fundamentally accessible.

Then we carry that constraint forward with us into every feature we add on top. Search is not a fundamental part of the content of my site. But it is a very nice, convenient feature. We will need to give up some accessibility to include it on the site. For example, people with JavaScript disabled for security reasons may simply be unable to use a search feature. But how close can get? How broad can our audience be for the best posisble search experience?

In the end, the site we build might have a broad spectrum of user experiences, some much better than others, depending on the conditions a user brings with them to our site. But there is a core experience shared by the maximum number of people, in the broadest range of contexts we can support.

For most websites, that range of contexts is concievably huge, and the opportunity cost is proportionately huge. Serving doubly-static HTML, _progressively enhanced_ by convenient features, should be a no-brainer.

## Generative Logic
Ok, so how are we supposed to write this thing? Do I just have to edit HTML files and `src` attributes every time I change copy, or adjust image quality, or make any other change to the site? There are two problems with that suggestion.  
1. It's super tedious and error prone, and nobody wants to.  
2. It makes certain design patterns prohibitively difficult.  

The solution proposed here for both is a static-site generation process. Using build tools like Webpack, you can play out your application logic in a build-time environment. Run some command and "play" your app. Then dump the output into a directory structure.

This customizable build process lets you write whatever you want, as long as everything is ultimately funneled through a single entry-point: a function that returns an HTML string.

A single function can be run with a convenient npm script, or incorporated into a more complex series of scripts, so that the entire site can be generated with a single command like `npm start`, or `npm run publish`.

# Cool Features
## Cross-Posting
The `utilities/` directory has a few small scripts that take content I handwrite for my site in my local environment, and syndicates it to popular channels like Medium and Twitter. In order for this to work, you need an intermediary storage system. Since this is a serverless architecture, I'm using Firebase real-time database as a backend. I'm a huge fan of Firebase for hobby projects like this. I'm told it's prohibitively expensive at scale though.

I run the utilities scripts during `npm run publish`, so that every build ensures new content is streamed out to the places people are already accustomed to getting their feed. Check out the utilities and package.json for more ideas about this.

## Offline Access
I'm using service workers to cache pages that users visit while online. The service worker then intercepts any get requests and serves them from the local cache if present. Otherwise it serves a simple "Hey, you're not online!" message. Check out `src/ServiceWorker.js` and `src/entry.js` for more on that. Service workers use a small event-driven API that's not too hard to learn if you have the time to tinker.

## Webmentions and IndieAuth
My website doubles as a personal log-in for all my online profiles. IndieAuth is pretty cool. It's a technology that abstracts oAuth and treats your website as a proxy. It only requires you to add a few tags to your HTML that it can use as a hook for authentication. Then you add a link to your website on oAuth platforms like Twitter and Github. Boom. You now have a single, centralized online persona that you can use to login and signup for almost anything. Note that as of this writing (October, 2016) Facebook does not currently support IndieAuth.

## Library Links
This isn't fancy tech, but I really like that my book list links to Overdrive to show you the nearest library where you can find the book! Libraries are an amazing and very underused public good. Go to the library!
