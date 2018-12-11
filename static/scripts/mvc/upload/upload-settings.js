define("mvc/upload/upload-settings",["exports","utils/utils"],function(e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});!function(e){e&&e.__esModule}(t);e.default=Backbone.View.extend({options:{class_check:"fa-check-square-o",class_uncheck:"fa-square-o",parameters:[{id:"space_to_tab",title:"Convert spaces to tabs"},{id:"to_posix_lines",title:"Use POSIX standard"}]},initialize:function(e){this.model=e.model,this.setElement($("<div/>").addClass("upload-settings")),this.$el.append($("<div/>").addClass("upload-settings-cover")),this.$el.append($("<table/>").addClass("upload-settings-table ui-table-striped").append("<tbody/>")),this.$cover=this.$(".upload-settings-cover"),this.$table=this.$(".upload-settings-table > tbody"),this.listenTo(this.model,"change",this.render,this),this.model.trigger("change")},render:function(){var e=this;this.$table.empty(),_.each(this.options.parameters,function(t){var s=$("<div/>").addClass("upload-"+t.id+" upload-icon-button fa").addClass(e.model.get(t.id)&&e.options.class_check||e.options.class_uncheck).on("click",function(){e.model.get("enabled")&&e.model.set(t.id,!e.model.get(t.id))});e.$table.append($("<tr/>").append($("<td/>").append(s)).append($("<td/>").append(t.title)))}),this.$cover[this.model.get("enabled")&&"hide"||"show"]()}})});