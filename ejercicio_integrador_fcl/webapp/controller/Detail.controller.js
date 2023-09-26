sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"acc/fcl/ejerciciointegradorfcl/util/Constants",
	"sap/ui/model/json/JSONModel",

], function (Controller, Constants, JSONModel) {
	"use strict";

	return Controller.extend("acc.fcl.ejerciciointegradorfcl.controller.Detail", {
		onInit: function () {
			var oOwnerComponent = this.getOwnerComponent();

			this.oRouter = oOwnerComponent.getRouter();

			this.oRouter.getRoute(Constants.routes.routeList).attachPatternMatched(this._onOrderMatched, this);
			this.oRouter.getRoute(Constants.routes.routeDetail).attachPatternMatched(this._onOrderMatched, this);
		},

		_onOrderMatched: function () {
			this._order = this.getOwnerComponent().getModel(Constants.model.orderNav).getProperty(`/${Constants.model.orderNav}`)
			this.getView().bindElement({
				path: "/" + this._order,
				model: Constants.model.ordersModel
			});
		},

		onExit: function () {
			this.oRouter.getRoute(Constants.routes.routeList).detachPatternMatched(this._onOrderMatched, this);
			this.oRouter.getRoute(Constants.routes.routeDetail).detachPatternMatched(this._onOrderMatched, this);
			let oViewModel = new JSONModel({
				layout: "OneColumn"
			});

			this.getOwnerComponent().setModel(oViewModel, Constants.views.appView);

		}
	});
});