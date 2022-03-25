// ==UserScript==
// @name         42BH-days-left
// @namespace    https://gist.github.com/GlaceCoding/6d189078c3c49fb0e6e69314601fbe4f
// @version      0.4
// @description  Blackholes days left
// @author       GlaceCoding
// @match        https://profile.intra.42.fr/
// @match        https://profile.intra.42.fr/users/*
// @icon         https://www.google.com/s2/favicons?domain=42.fr
// @downloadURL  https://gist.github.com/GlaceCoding/6d189078c3c49fb0e6e69314601fbe4f/raw/42bh-days-left.user.js
// @updateURL    https://gist.github.com/GlaceCoding/6d189078c3c49fb0e6e69314601fbe4f/raw/42bh-days-left.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const bh = document.getElementById("bh-date");
    let daysleft = bh.parentElement.getAttribute("data-original-title");
    let date = bh.textContent;
    bh.textContent = daysleft;

    var observer = new MutationObserver(function(mutations) {
        if (bh.parentElement.getAttribute("data-original-title").indexOf("day") !== -1) {
            daysleft = bh.parentElement.getAttribute("data-original-title");
            date = bh.textContent;
        }
        if (bh.textContent.indexOf("day") === -1) { // <= fix: This condition avoid a infinite loop in firefox
            bh.textContent = daysleft;
            bh.parentElement.setAttribute("data-original-title", date);
        }
    });

    observer.observe(bh, {
        attributes:    true,
        childList:     true,
        characterData: true
    });
})();
