sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/m/Dialog",
    "sap/m/StandardListItem",
    "sap/m/Button",
    "sap/m/List"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, JSONModel, Dialog, StandardListItem, Button, List) {
        "use strict";

        return Controller.extend("com.aricord.products.controller.View1", {
            onInit: function () {
                const that = this; 
               
                this.getAllProductCount()
              
            },

            onPress: function(oEvent) {
                let sPID = oEvent.getSource().getBindingContext().getProperty("ID")
                const oRouter = this.getOwnerComponent().getRouter();
			    oRouter.navTo("DetailView2", {PID:sPID});
            },

            // delete product
            onRemove: function(oEvent) {
                const oModel = this.getOwnerComponent().getModel()
                
                let oMainTable = this.getView().byId("idProductsTable");
                let sID = oMainTable.getSelectedItems()[0].getBindingContext().getProperty('ID')

                oModel.setUseBatch(false);

                oModel.remove(`/Products(${sID})`, {
                    success: function(odata, oResponse){
                        this.getAllProductCount()
                        MessageToast.show('Selected Item ' + sID + ' has been delteted successfully!!')
                    }, 
                    error: function(oError) {
                        MessageToast.show(oError)
                    }
                })
            },

            onCreate: function(oEvent) {
                const oModel = this.getOwnerComponent().getModel()
                
                let oMainTable = this.getView().byId("idProductsTable");
                let sID = oMainTable.getSelectedItems()[0].getBindingContext().getProperty('ID')

                oModel.setUseBatch(false);

                oModel.remove(`/Products(${sID})`, {
                    success: function(odata, oResponse){
                        this.getAllProductCount()
                        MessageToast.show('Selected Item ' + sID + ' has been delteted successfully!!')
                    }, 
                    error: function(oError) {
                        MessageToast.show(oError)
                    }
                })
            },


            getAllProductCount: function() {
                let oModel = this.getOwnerComponent().getModel()
                let oIconTab = this.getView().byId("idIconTabProduct")

                oModel.read("/Products", {
                    success: function(odata, oResponse) {
                        console.log('odata = ', odata)
                        let data  = [{"count": odata.results.length}]
                        console.log('data', data)
                       oIconTab.setModel(new JSONModel(data), "C")
                    },
                    error: function(oError) {
                        MessageToast.show(oError);
                        
                    }
                }) 
            },

            onCreateProduct: function () {
                if (!this.oFixedSizeDialog) {
                    this.oFixedSizeDialog = new Dialog({
                        title: "Create New Product",
                        contentWidth: "550px",
                        contentHeight: "300px",
                        content: [],
                        endButton: new Button({
                            text: "Close",
                            press: function () {
                                this.oFixedSizeDialog.close();
                            }.bind(this)
                        })
                    });
    
                    //to get access to the controller's model
                    this.getView().addDependent(this.oFixedSizeDialog);
                }
    
                this.oFixedSizeDialog.open();
            },

        });
    });
