sap.ui.define([
    "sap/ui/core/routing/History",
    "acc/int/ejerciciointegrador/util/Constants"
], function (History, Constants) {
    'use strict';
    const Commons = {
        navTo: function (oScope, sRoute) {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(oScope);
            oRouter.navTo(sRoute);
        },
        navBack: function () {
            const oHistory = History.getInstance();
            const sPreviousHash = oHistory.getPreviousHash();
            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                this.getRouter().navTo(Constants.model.app, {}, true);
            }
        }
    }
    return Commons;
}, true)