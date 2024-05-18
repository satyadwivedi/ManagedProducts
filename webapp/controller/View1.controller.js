sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/m/Dialog",
    "sap/m/StandardListItem",
    "sap/m/Button",
    "sap/m/List",
    "sap/ui/core/Fragment",
    "sap/ui/core/BusyIndicator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, JSONModel, Dialog, StandardListItem, Button, List, Fragment, BusyIndicator) {
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

                let aTableData =  this.getView().byId("idProductsTable").getItems();
                let sID = aTableData.length + 1;

                // for(let i = 0; i < aTableData.length; i++  ){

                // }

                let ViewId = this.getView().getId()
                 
                let sName = sap.ui.core.Fragment.byId(ViewId, "idProdName").getValue();
                let sDesc = sap.ui.core.Fragment.byId(ViewId, "idProdDesc").getValue();    
                let date1 = sap.ui.core.Fragment.byId(ViewId, "idDate").getDateValue();    
                let date2 = sap.ui.core.Fragment.byId(ViewId, "idDate").getValue();
                let price = sap.ui.core.Fragment.byId(ViewId, "idPrice").getValue();
                let rating = sap.ui.core.Fragment.byId(ViewId, "idRating").getValue();    



                let oProduct = {
                        "ID": sID,
                        "Name": sName,
                        "Description":sDesc,
                        "ReleaseDate": "2014-01-01T00:00:00",
                        "DiscontinuedDate": null,
                        "Rating": Number(rating),
                        "Price": price,
                        "Category": {
                            "ID": 1,
                            "Name":"Food"
                        },
                        "Supplier": {
                            "ID": 1,
                            "Name": "Tokyo Traders"
                        }

                 }

                const oModel = this.getOwnerComponent().getModel()  
                const that = this;
                 
               // const oBussy = new BusyIndicator({text:'creating new product please wait!!'})
               // oBussy.setBusy(true)
                oModel.create("/Products", oProduct,  {
                    success: function(odata, oRespinse ) {
                      //  oBussy.setBusy(false)
                        console.log('Product created ')
                        MessageToast.show('Product created');
                        that.onClose()
                    },
                    error: function(oError) {
                       // oBussy.setBusy(false)
                        console.log('Error in product creation ', oError)
                        that.onClose()
                    }
                })


               
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
            },

            updateProduct: function(oEvent) {
                let oMainTable = this.getView().byId("idProductsTable");
                //let sPID = oMainTable.getSelectedItems()[0].getBindingContext().getProperty('ID')
               let oProduct =  this.getView().byId("idProductsTable").getSelectedItems()[0].getBindingContext().getObject()
               let sPID = oProduct.ID

                let data = {
                    "Name": oProduct.Name,
                    "Description": oProduct.Description,
                    "ReleaseDate": oProduct.ReleaseDate,
                    "DiscontinuedDate": null,
                    "Rating": oProduct.Rating,
                    "Price": oProduct.Price
                };

                const oModel = this.getOwnerComponent().getModel()

                oModel.sDefaultUpdateMethod = 'PUT'

                //oModel.setUseBatch(true);

                oModel.update('/Products(' + sPID + ')', data, {
                    success: function(oData, oResponse ) {
                        MessageToast.show('record updated')
                    }, 
                    error: function(oError) {
                        console.log('error update', oError)
                        MessageToast.show('Error in updating')
                    }
                })
            },


            validateRating: function(oEvent) {
               let r =  oEvent.getParameters().value;
               if(r) {
                    r = Number(r)
                    if(r <= 5 && r >= 0 ){
                        console.log('r=', r)
                    } else{
                        oEvent.getSource().setValue('0')
                    }
               } 
            }


        });
    });
