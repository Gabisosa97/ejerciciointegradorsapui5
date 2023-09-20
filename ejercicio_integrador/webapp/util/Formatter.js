sap.ui.define([], function () {
    'use strict';

    return {
        formatCountry: function (sCountry) {
            return sCountry === 'Germany' ? "Du hast mich" : sCountry
        },
    };

}, true);