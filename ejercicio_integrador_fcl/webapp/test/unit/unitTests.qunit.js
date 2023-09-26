/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"accfcl/ejercicio_integrador_fcl/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
