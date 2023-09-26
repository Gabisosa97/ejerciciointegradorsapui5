sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "acc/int/ejerciciointegrador/util/Constants",
    "acc/int/ejerciciointegrador/util/Commons",
    "acc/int/ejerciciointegrador/util/Formatter",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Filter, FilterOperator, Constants, Commons, Formatter) {
        "use strict";

        return Controller.extend("acc.int.ejerciciointegrador.controller.Main", {
            Formatter: Formatter,

            // * Navigation
            navTo: function (oEvent) {
                this.onItemPress(oEvent);
                Commons.navTo(this, Constants.model.routeDetail)
            },

            onInit: function () {
                const oModel = new JSONModel({ country: "", city: "" });
                this.getView().setModel(oModel, "filters");

                sap.ui.getCore().getConfiguration().setLanguage("en-US");
                const url = sap.ui.require.toUrl("acc/int/ejerciciointegrador") + "/northwind/northwind.svc/";
                this._model = new sap.ui.model.odata.v2.ODataModel(url, {
                    json: true,
                    headers: {
                        "DataServiceVersion": "2.0",
                        "Cache-Control": "no-cache, no-store",
                        "Pragma": "no-cache"
                    },
                    useBatch: false
                });
                this._model.read("/Orders_Qries", {
                    async: true,
                    success: jQuery.proxy(this.success, this),
                    error: jQuery.proxy(this.error, this)
                })
            },
            success: function (oData) {
                const oModel = new JSONModel(oData.results);
                this.getOwnerComponent().setModel(oModel, "OrdersModel");
                console.log(oModel)
            }
            ,
            error: function () {
                alert("Error")
            },

            // * 2Detail
            onItemPress: function (oEvent) {
                const oItem = oEvent.getSource().getBindingContext("OrdersModel");
                const sPath = oItem.getPath();
                const oItemSelected = this.getOwnerComponent().getModel("OrdersModel").getProperty(sPath);
                console.log(oItemSelected)
                const oModel = new JSONModel(oItemSelected);
                this.getOwnerComponent().setModel(oModel, "OrderSelected");
            },

            // * Filter
            onSearch: function () {
                var aFilters = [];
                var aFilters2 = [];

                const countryBox = this.getView().getModel("filters").getProperty("/country")
                const cityBox = this.getView().getModel("filters").getProperty("/city")

                if (countryBox && countryBox.length > 0) {
                    var filter1 = new Filter("Country", FilterOperator.Contains, countryBox);
                    aFilters.push(filter1);
                }
                if (cityBox && cityBox.length > 0) {
                    var filter2 = new Filter("City", FilterOperator.Contains, cityBox);
                    aFilters.push(filter2);
                }

                if (countryBox || cityBox)
                    aFilters2 = new Filter(aFilters, false);

                var oList = this.byId("idTableOrders");
                var oBinding = oList.getBinding("items");
                oBinding.filter(aFilters2, "Application");
            },
            onClear: function () {
                const oModel = new JSONModel({ country: "", city: "" });
                this.getView().setModel(oModel, "filters");
                this.onSearch();
            },
            changeLang: function () {
                switch (sap.ui.getCore().getConfiguration().getLanguage()) {
                    case "es": return sap.ui.getCore().getConfiguration().setLanguage("en-US");
                    case "en-US": return sap.ui.getCore().getConfiguration().setLanguage("es");
                }
            }
        });
    });
