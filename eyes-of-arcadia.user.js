// ==UserScript==
// @name           Eyes of Arcadia
// @namespace      http://maybemaimed.com/playground/eyes-of-arcadia/
// @description    Automatically tests various social networks for user profiles whose names match the profile you're currently viewing. (Not guaranteed to find the same human, but it works often.)
// @include        http://www.okcupid.com/profile/*
// @include        https://fetlife.com/users/*
// ==/UserScript==

ARCADIA = {};
ARCADIA.CONFIG = {
    'debug': false // switch to true to debug.
};

// Utility debugging function.
ARCADIA.log = function (msg) {
    if (!ARCADIA.CONFIG.debug) { return; }
    console.log('ARCADIA: ' + msg);
};

ARCADIA.foundUrls = {};
ARCADIA.Networks = {};

ARCADIA.Networks.OkCupid = {
    'profile_url_prefix' : 'http://www.okcupid.com/profile/',
    'http_request_method': 'GET',
    'success_function': function (response) {
        ARCADIA.log('executing OkCupid success_function');
        if (/"screenname"/.test(response.responseText)) {
            ARCADIA.foundUrls['OkCupid'] = response.finalUrl;
            for (var k in ARCADIA.Networks) {
                if (ARCADIA.Networks[k].profile_url_prefix.match(window.location.host)) {
                    for (var u in ARCADIA.foundUrls) {
                        if (ARCADIA.foundUrls[u]) {
                            ARCADIA.Networks[k].button_html(ARCADIA.foundUrls[u], u);
                        }
                    }
                }
            }
        }
    },
    'button_html': function (link_url, net_name) {
        ARCADIA.log('executing OkCupid button_html');
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
    'success_function'   : function (response) {
        ARCADIA.log('executing FetLife success_function');
        if (/user/.test(response.finalUrl)) {
            ARCADIA.foundUrls['FetLife'] = response.finalUrl;
            for (var k in ARCADIA.Networks) {
                if (ARCADIA.Networks[k].profile_url_prefix.match(window.location.host)) {
                    for (var u in ARCADIA.foundUrls) {
                        if (ARCADIA.foundUrls[u]) {
                            ARCADIA.Networks[k].button_html(ARCADIA.foundUrls[u], u);
                        }
                    }
                }
            }
        }
    },
    'button_html': function (link_url, net_name) {
        ARCADIA.log('executing FetLife button_html');
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

// Grab the profile's username from this network, bailing if none found.
var nickname = ARCADIA.getProfileName();
if (!nickname) { return; }

// Search for this username on all known networks
for (var k in ARCADIA.Networks) {
    // except the current one, obviously.
    if (ARCADIA.Networks[k].profile_url_prefix.match(window.location.host)) {
        continue;
    }
    GM_xmlhttpRequest({
        method: ARCADIA.Networks[k].http_request_method,
        url: ARCADIA.Networks[k].profile_url_prefix + nickname,
        onload: ARCADIA.Networks[k].success_function
    });
}
