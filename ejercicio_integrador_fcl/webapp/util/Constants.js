sap.ui.define([], function () {
    'use strict';
    return {
        model: {
            i18n: "i18n",
            mockModel: "mock",
            app: "App",
            ordersModel: "OrdersModel",
            orderNav: "orderNav"

        },
        mock: {
            path: "acc/fcl/ejerciciointegradorfcl",
            northwind: "/northwind/northwind.svc/",
            service: "/Orders_Qries"
        },
        routes: {
            routeDetail: "RouteDetail",
            routeList: "RouteList",
        },
        views: {
            appView: "appView"
        },
        filters: {
            oFilters: "filters",
            pCountry: "/country",
            pCity: "/city",
            country: "Country",
            city: "City"
        }
    };
}, true)