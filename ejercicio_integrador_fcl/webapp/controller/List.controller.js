sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    'sap/ui/model/Sorter',
    'sap/m/MessageBox',
    'sap/f/library',
    "acc/fcl/ejerciciointegradorfcl/util/Formatter",
    "acc/fcl/ejerciciointegradorfcl/util/Constants",
], function (JSONModel, Controller, Filter, FilterOperator, Sorter, MessageBox, fioriLibrary, Formatter, Constants) {
    "use strict";

    return Controller.extend("acc.fcl.ejerciciointegradorfcl.controller.List", {
        Formatter: Formatter,
        onInit: function () {
            const oModel = new JSONModel(Constants.filters.oModelFilter);
            this.getView().setModel(oModel, Constants.filters.oFilters);
            this.oRouter = this.getOwnerComponent().getRouter();
        },

        // * Navigation
        navTo: function (oEvent) {
            let oViewModel = new JSONModel({
                layout: "TwoColumnsMidExpanded"
            });
            this.getOwnerComponent().setModel(oViewModel, Constants.views.appView);
            let orderPath = oEvent.getSource().getBindingContext(Constants.model.ordersModel).getPath(),
                order = orderPath.split("/").slice(-1).pop();
            let oModelOrder = new JSONModel({
                orderNav: order
            });

            this.getOwnerComponent().setModel(oModelOrder, Constants.model.orderNav);
            this.oRouter.navTo(Constants.routes.routeDetail, { order });
        },
        // * Filter
        onSearch: function () {
            var aFilters = [];
            var aFilters2 = [];

            const countryBox = this.getView().getModel(Constants.filters.oFilters).getProperty(Constants.filters.pCountry)
            const cityBox = this.getView().getModel(Constants.filters.oFilters).getProperty(Constants.filters.pCity)

            if (countryBox && countryBox.length > 0) {
                var filter1 = new Filter(Constants.filters.country, FilterOperator.Contains, countryBox);
                aFilters.push(filter1);
            }
            if (cityBox && cityBox.length > 0) {
                var filter2 = new Filter(Constants.filters.city, FilterOperator.Contains, cityBox);
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
            this.getView().setModel(oModel, Constants.filters.oFilters);
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