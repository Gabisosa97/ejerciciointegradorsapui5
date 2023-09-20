sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "acc/int/ejerciciointegrador/util/Commons",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Commons) {
        "use strict";

        return Controller.extend("acc.int.ejerciciointegrador.controller.Detail", {
            onInit: function () {
                const oModel = new JSONModel({ visible: false });
                this.getView().setModel(oModel, "detail");
            },
            navBack: function () {
                Commons.navBack();
            },
            onEdit: function () {
                var oForm = this.getView().getModel("detail");
                var state = oForm.getProperty("/visible");
                oForm.setProperty("/visible", !state);
            }
        });
    });
