define(["utils/utils","mvc/ui/ui-tabs","mvc/ui/ui-misc","mvc/form/form-view"],function(a,b,c,d){var e=Backbone.View.extend({initialize:function(){this.setElement("<div/>"),this.model=new Backbone.Model({dataset_id:Galaxy.params.dataset_id}),this.message=new c.Message,this.render()},render:function(){var a=this;$.ajax({url:Galaxy.root+"dataset/get_edit?dataset_id="+a.model.get("dataset_id"),success:function(b){a._render(a,b)},error:function(b){a._error(b)}})},_render:function(a,b){this.$el.empty().append($("<h4/>").append("Edit attributes of '"+b.display_name+"'")).append(this.message.$el).append(this._getAttributes(b)).append("<p/>").append(this._getConversion(b)).append("<p/>").append(this._getDatatype(b)).append("<p/>").append(this._getPermission(b)),this.message.update(b)},_submit:function(a,b){var c=this,d=b.data.create();d.dataset_id=this.model.get("dataset_id"),d.operation=a,$.ajax({type:"PUT",url:Galaxy.root+"dataset/set_edit",data:d,success:function(a){b.message.update({message:a.message,status:"success",persistent:!1}),c._reloadHistory()},error:function(a){b.message.update(a)}})},_error:function(a){var b=a.responseJSON&&a.responseJSON.err_msg;this.message.update({status:"danger",message:b||"Error occured while loading the dataset.",persistent:!0})},_getAttributes:function(a){var b=this,e=new d({title:"Edit attributes",inputs:a.attribute_inputs,buttons:{submit_editattr:new c.ButtonIcon({cls:"btn btn-primary",tooltip:"Save attributes of the dataset.",icon:"fa-floppy-o ",title:"Save",onclick:function(){b._submit("attributes",e)}}),submit_autocorrect:new c.ButtonIcon({cls:"btn btn-primary",tooltip:"This will inspect the dataset and attempt to correct the values of fields if they are not accurate.",icon:"fa-undo ",title:"Auto-detect",onclick:function(){b._submit(b,e,a,"auto-detect")}})}});return e.$el},_getConversion:function(a){var b=this,e=new d({title:"Convert to new format",inputs:a.datatype_inputs,buttons:{submit:new c.ButtonIcon({cls:"btn btn-primary",tooltip:"Convert the datatype to a new format.",title:"Convert datatype",icon:"fa-exchange ",onclick:function(){b._submit(b,e,a,"convert")}})}});return e.$el},_getDatatype:function(a){var b=this,e=new d({title:"Change datatype",inputs:a.conversion_inputs,buttons:{submit:new c.ButtonIcon({cls:"btn btn-primary",tooltip:"Change the datatype to a new type.",title:"Change datatype",icon:"fa-exchange ",onclick:function(){b._submit(b,e,a,"change")}})}});return e.$el},_getPermission:function(a){var b=this;if(a.can_manage_dataset){var e=new d({title:"Manage dataset permissions",inputs:a.permission_inputs,buttons:{submit:new c.ButtonIcon({cls:"btn btn-primary",tooltip:"Save permissions.",title:"Save permissions",icon:"fa-floppy-o ",onclick:function(){b._submit(b,e,a,"permissions")}})}});return e.$el}var e=new d({title:"View permissions",inputs:a.permission_inputs});return e.$el},_reloadHistory:function(){window.Galaxy&&window.Galaxy.currHistoryPanel.loadCurrentHistory()}});return{View:e}});
//# sourceMappingURL=../../../maps/mvc/dataset/dataset-edit-attributes.js.map