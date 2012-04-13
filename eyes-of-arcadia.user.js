// ==UserScript==
// @name           Eyes of Arcadia
// @version        0.9
// @namespace      http://maybemaimed.com/playground/eyes-of-arcadia/
// @description    Automatically tests various social networks for user profiles whose names match the profile you're currently viewing. (Must be logged in to some networks for users on that network to be found. Not guaranteed to find the same human, but it works often.)
// @include        http://www.okcupid.com/profile/*
// @include        https://fetlife.com/users/*
// @include        https://twitter.com/*
// @include        http://twitter.com/*
// ==/UserScript==

ARCADIA = {};
ARCADIA.CONFIG = {
    'debug': false // switch to true to debug.
};

// Utility debugging function.
ARCADIA.log = function (msg) {
    if (!ARCADIA.CONFIG.debug) { return; }
    console.log('EYES OF ARCADIA: ' + msg);
};

ARCADIA.found_urls = {};
ARCADIA.Networks = {};

ARCADIA.Networks.Twitter = {
    'profile_url_prefix' : 'https://twitter.com/',
    'http_request_method': 'HEAD',
    'successFunction': function (response) {
        ARCADIA.log('executing Twitter.successFunction()');
        if (200 === response.status) {
            ARCADIA.found_urls['Twitter'] = {
                'href': response.finalUrl,
                'injected': false
            };
            for (var k in ARCADIA.Networks) {
                if (ARCADIA.Networks[k].profile_url_prefix.match(window.location.host)) {
                    for (var u in ARCADIA.found_urls) {
                        if (ARCADIA.found_urls[u] && !ARCADIA.found_urls[u].injected) {
                            ARCADIA.Networks[k].injectButtonHTML(ARCADIA.found_urls[u].href, u);
                            ARCADIA.found_urls[u].injected = true;
                        }
                    }
                }
            }
        }
    },
    'injectButtonHTML': function (link_url, net_name) {
        ARCADIA.log('executing Twitter.injectButtonHTML(' + link_url + ', ' + net_name + ')');
        var li   = document.createElement('li');
        var span = document.createElement('span');
        span.className = 'label';
        span.innerHTML = net_name;
        li.appendChild(span);
        var a = document.createElement('a');
        a.setAttribute('href', link_url);
        a.innerHTML = link_url.substring(0, 17) + '...'; // That's just how Twitter does it.
        li.appendChild(a);
        var node = document.getElementById('bio');
        node.insertBefore(li, node);
    },
    // TODO: Refactor to use the actual Twitter API?
    //       Currently, this is loading too soon and as a result no profile is found.
    'getProfileName': function () {
        ARCADIA.log('executing Twitter.getProfileName()');
        var screen_name = document.querySelector('.screen-name');
        if (screen_name) {
            return screen_name.childNodes[1];
        } else {
            return window.location.pathname.substring(1, window.location.pathname.length);
        }
    }
};

ARCADIA.Networks.OkCupid = {
    'profile_url_prefix' : 'http://www.okcupid.com/profile/',
    'http_request_method': 'GET',
    'successFunction': function (response) {
        ARCADIA.log('executing OkCupid.successFunction()');
        if (/"screenname"/.test(response.responseText)) {
            ARCADIA.found_urls['OkCupid'] = {
                'href': response.finalUrl,
                'injected': false
            };
            for (var k in ARCADIA.Networks) {
                if (ARCADIA.Networks[k].profile_url_prefix.match(window.location.host)) {
                    for (var u in ARCADIA.found_urls) {
                        if (ARCADIA.found_urls[u] && !ARCADIA.found_urls[u].injected) {
                            ARCADIA.Networks[k].injectButtonHTML(ARCADIA.found_urls[u].href, u);
                            ARCADIA.found_urls[u].injected = true;
                        }
                    }
                }
            }
        }
    },
    'injectButtonHTML': function (link_url, net_name) {
        ARCADIA.log('executing OkCupid.injectButtonHTML(' + link_url + ', ' + net_name + ')');
        var p = document.createElement('p');
        p.setAttribute('class', 'btn small green woo');
        p.setAttribute('onmousedown', "util.toggleClass(this, 'active')");
        p.setAttribute('onmouseup', "util.toggleClass(this, 'active')");
        p.setAttribute('onmouseover', "util.toggleClass(this, 'hover')");
        p.setAttribute('onmouseout', "util.toggleClass(this, 'hover')");
        var a = document.createElement('a');
        a.setAttribute('href', link_url);
        a.innerHTML = net_name;
        p.appendChild(a);
        var node = document.querySelector('p.message').nextElementSibling;
        node.parentNode.insertBefore(p, node);
    },
    'getProfileName': function () {
        return document.getElementById('basic_info_sn').innerHTML;
    }
};

ARCADIA.Networks.FetLife = {
    'profile_url_prefix' : 'https://fetlife.com/', // trailing slash!
    'http_request_method': 'HEAD',
    'successFunction': function (response) {
        ARCADIA.log('executing FetLife.successFunction()');
        if (/user/.test(response.finalUrl)) {
            ARCADIA.found_urls['FetLife'] = {
                'href': response.finalUrl,
                'injected': false
            };
            for (var k in ARCADIA.Networks) {
                if (ARCADIA.Networks[k].profile_url_prefix.match(window.location.host)) {
                    for (var u in ARCADIA.found_urls) {
                        if (ARCADIA.found_urls[u] && !ARCADIA.found_urls[u].injected) {
                            ARCADIA.Networks[k].injectButtonHTML(ARCADIA.found_urls[u].href, u);
                            ARCADIA.found_urls[u].injected = true;
                        }
                    }
                }
            }
        }
    },
    'injectButtonHTML': function (link_url, net_name) {
        ARCADIA.log('executing FetLife.injectButtonHTML(' + link_url + ', ' + net_name + ')');
        var el = document.createElement('div');
        el.setAttribute('class', 'button');
        var a = document.createElement('a');
        a.setAttribute('href', link_url);
        a.setAttribute('style', 'background-color: #64A730;');
        a.innerHTML = net_name;
        el.appendChild(a);
        var node = document.querySelector('.button').nextElementSibling;
        node.parentNode.insertBefore(el, node);
    },
    'getProfileName': function () {
        return document.querySelector('h2').textContent.match(/\w+/)[0];
    }
};

ARCADIA.getProfileName = function () {
    for (var k in ARCADIA.Networks) {
        if (ARCADIA.Networks[k].profile_url_prefix.match(window.location.host)) {
            return ARCADIA.Networks[k].getProfileName();
        }
    }
    return false;
};

// This is the main() function, executed on page load.
ARCADIA.main = function () {
    // Grab the profile's username from this network, bailing if none found.
    var nickname = ARCADIA.getProfileName();
    if (!nickname) { return; }
    ARCADIA.log('Found nickname ' + nickname);

    // Search for this username on all known networks
    for (var k in ARCADIA.Networks) {
        // except the current one, obviously.
        if (ARCADIA.Networks[k].profile_url_prefix.match(window.location.host)) {
            continue;
        }
        GM_xmlhttpRequest({
            method: ARCADIA.Networks[k].http_request_method,
            url: ARCADIA.Networks[k].profile_url_prefix + nickname,
            onload: ARCADIA.Networks[k].successFunction
        });
    }
};

window.addEventListener('load', ARCADIA.main);
