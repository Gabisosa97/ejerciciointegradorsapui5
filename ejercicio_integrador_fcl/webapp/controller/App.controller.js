sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "acc/fcl/ejerciciointegradorfcl/util/Constants",
  ],
  function (BaseController, JSONModel, Constants) {
    "use strict";

    return BaseController.extend("acc.fcl.ejerciciointegradorfcl.controller.App", {
      onInit: function () {
        sap.ui.getCore().getConfiguration().setLanguage("en-US");

        let oViewModel = new JSONModel({
          layout: "OneColumn"
        });

        this.getOwnerComponent().setModel(oViewModel, Constants.views.appView);

        this.oOwnerComponent = this.getOwnerComponent();
        this.oRouter = this.oOwnerComponent.getRouter();
        this.oRouter.attachRouteMatched(this.onRouteMatched, this);

        const url = sap.ui.require.toUrl(Constants.mock.path) + Constants.mock.northwind;
        this._model = new sap.ui.model.odata.v2.ODataModel(url, {
          json: true,
          headers: {
            "DataServiceVersion": "2.0",
            "Cache-Control": "no-cache, no-store",
            "Pragma": "no-cache"
          },
          useBatch: false
        });
        this._model.read(Constants.mock.service, {
          async: true,
          success: jQuery.proxy(this.success, this),
          error: jQuery.proxy(this.error, this)
        })
      },
      success: function (oData) {
        const oModel = new JSONModel(oData.results);
        this.getOwnerComponent().setModel(oModel, Constants.model.ordersModel);
        console.log(oModel)
      }
      ,
      error: function () {
        alert("Error")
      },
      onRouteMatched: function (oEvent) {
        var sRouteName = oEvent.getParameter("name"),
          oArguments = oEvent.getParameter("arguments");

        // Save the current route name
        this.currentRouteName = sRouteName;
        this.currentProduct = oArguments.product;
      },

      onStateChanged: function (oEvent) {
        var bIsNavigationArrow = oEvent.getParameter("isNavigationArrow"),
          sLayout = oEvent.getParameter("layout");

        // Replace the URL with the new layout if a navigation arrow was used
        if (bIsNavigationArrow) {
          this.oRouter.navTo(this.currentRouteName, { layout: sLayout, product: this.currentProduct }, true);
        }
      },

      onExit: function () {
        this.oRouter.detachRouteMatched(this.onRouteMatched, this);
      }
    });
  }
);
