Eyes of Arcadia adds links to the profile pages on each known social network on the profile page of a user you’re viewing. Have you ever wondered if the person whose profile you’re viewing also has accounts on other social networking websites? With Eyes of Arcadia, your web browser automatically checks a slew of other sites and displays a button or a link for each profile it finds.

For instance, if you’re viewing the profile of a user named “John_Smith” on OkCupid and a profile of the same name exists on Twitter and LiveJournal, two new buttons will appear on John_Smith’s OkCupid profile that link you to whoever “John_Smith” is on Twitter and LiveJournal. While these profiles are not guaranteed to all be the same human, they often are as many people try to reserve the same username on multiple different social networks. Moreover, in some cases, if an exact profile name match cannot be found for a given social network, Eyes of Arcadia will try a few simple algorithms (like removing dashes or underscores) to try and find a match anyway.

> [Download and install the Eyes of Arcadia userscript from Userscripts.org](https://userscripts.org/scripts/source/130861.user.js)

If you enjoy this script, please consider tossing a few metaphorical coins in [my cyberbusking hat](http://maybemaimed.com/cyberbusking/). :) Your donations are sincerely appreciated! Can’t afford to part with any coin? It’s cool. [Tweet your appreciation](https://twitter.com/intent/tweet?text=Love%20@maymaym%27s%20Eyes%20of%20Arcadia%20script%21%20http%3A//maybemaimed.com/playground/eyes-of-arcadia/%20Now%20I%20can%20find%20my%20friends%20on%20more%20websites%21%20Check%20him%20out%3A%20http%3A//maybemaimed.com/cyberbusking/), instead.

The list of social networks Eyes of Arcadia knows about includes:

* [FetLife](https://FetLife.com)
* [Google Plus](https://plus.google.com)
* [LiveJournal](http://LiveJournal.com)
* [OkCupid](http://OkCupid.com)
* [Tumblr](http://Tumblr.com)
* [Twitter](https://Twitter.com)
* [WordPress](https://WordPress.com)

Web browser support for Eyes of Arcadia varies:

<table summary="Support for Eyes of Arcadia userscript by web browser.">
<caption>Support for Eyes of Arcadia by web browser.</caption>
<thead>
<tr>
<th>Web Browser</th>
<th>Support Level</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="https://mozilla.org/firefox/">Mozilla Firefox</a> (with <a href="https://addons.mozilla.org/firefox/addon/greasemonkey/">Greasemonkey extension</a> installed)</td>
<td>Full support (all features regularly tested and functional)</td>
</tr>
<tr>
<td><a href="https://www.google.com/chrome/">Google Chrome</a></td>
<td>Significant support (all features regularly tested and most functional)</td>
</tr>
<tr>
<td><a href="http://opera.com/">Opera</a></td>
<td>Experimental (no testing and no expectation of functionality)</td>
</tr>
<tr>
<td><a href="https://www.apple.com/safari/">Apple Safari</a> (with <a href="http://safariaddons.com/safari/addon/43">GreaseKit extension</a> installed)</td>
<td>Experimental (no testing and no expectation of functionality)</td>
</tr>
<tr>
<td>Internet Explorer</td>
<td>Fuck Microsoft.</td>
</tr>
</tbody>
</table>

At the moment, the following are known issues needing to be addressed:

* When viewing a Twitter or Google Plus profile page, Eyes of Arcadia fails to find other profiles. However, when viewing profiles on other networks, Twitter and Google Plus profiles can be found.
* When using Google Chrome, Eyes of Arcadia does not reliably find subdomain-based services (like LiveJournal) when loading some profile pages.
* When viewing a Tumblr-powered site on a custom domain (i.e., one that doesn’t end in `.tumblr.com`), Eyes of Arcadia won’t search for profiles on other sites, even though it can find Tumblr profiles hosted on custom domains from other sites.

If you're handy with JavaScript, I welcome bug fixes and other improvements via pull requests [on GitHub](https://github.com/meitar/eyes-of-arcadia/). And even if you’re not, you can [report bugs and make feature requests](https://github.com/meitar/eyes-of-arcadia/issues/new) over there, too. Thanks for your contributions!

The name “Eyes of Arcadia” is a reference to [a mythical Greek utopia](https://en.wikipedia.org/wiki/Arcadia_%28utopia%29). This tool was inspired by [Enumerator’s Okcupid-Fetlife Bridge](https://userscripts.org/scripts/show/121538).
