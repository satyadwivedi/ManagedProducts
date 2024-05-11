sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/m/Dialog",
    "sap/m/StandardListItem",
    "sap/m/Button",
    "sap/m/List",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, JSONModel, Dialog, StandardListItem, Button, List, Fragment) {
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

            
            onCreate: function () {
                //sample payload
                /*
                    {
                        "ID": 11,
                        "Name": "Maggi",
                        "Description": "Nooddlesss",
                        "ReleaseDate": "2014-01-01T00:00:00",
                        "DiscontinuedDate": null,
                        "Rating": 5,
                        "Price": "2.4",
                        "Category": {
                            "ID": 1,
                            "Name":"Food"
                        },
                        "Supplier": {
                            "ID": 1,
                            "Name": "Tokyo Traders"
                        }
                    }

                */

                    


               
            },
            

            onCreateProduct: function (oEvent) {
                var oView = this.getView();
                if (!this._pDialog) {
                    this._pDialog = Fragment.load({
                        id: oView.getId(),
                        name: "com.aricord.products.view.createProduct",
                        controller: this
                    }).then(function (oDialog){
                        return oDialog;
                    });
                }
    
                this._pDialog.then(function(oDialog){
                    oDialog.open();
                }.bind(this));
            },

            onClose: function(oEvent) {
                this._pDialog.then(function(a){
                    a.close();
                })
            }


        });
    });
