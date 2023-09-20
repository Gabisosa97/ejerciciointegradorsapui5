/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"accint/ejercicio_integrador/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
