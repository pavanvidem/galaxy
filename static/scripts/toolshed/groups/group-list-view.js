define("toolshed/groups/group-list-view",["exports","libs/toastr","toolshed/groups/group-model","toolshed/groups/group-listrow-view"],function(e,o,t,s){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(e,"__esModule",{value:!0});var i=function(e){if(e&&e.__esModule)return e;var o={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(o[t]=e[t]);return o.default=e,o}(o),n=r(t),u=r(s),l=Backbone.View.extend({el:"#groups_element",defaults:{},initialize:function(e){this.options=_.defaults(this.options||{},this.defaults,e);var o=this;window.globalTS.groups.collection=new n.default.Groups,window.globalTS.groups.collection.fetch({success:function(e){o.render()},error:function(e,o){void 0!==o.responseJSON?i.error(o.responseJSON.err_msg):i.error("An error occurred.")}})},fetch:function(){},render:function(e){this.options=_.extend(this.options,e),$(".tooltip").hide();var o=this.templateGroupsList();this.$el.html(o({length:window.globalTS.groups.collection.models.length})),this.renderRows(window.globalTS.groups.collection.models),$('#center [data-toggle="tooltip"]').tooltip({trigger:"hover"}),$("#center").css("overflow","auto")},renderRows:function(e){for(var o=0;o<e.length;o++){var t=e[o];this.renderOne({group:t})}},renderOne:function(e){var o=new u.default.GroupListRowView(e);this.$el.find("#group_list_body").append(o.el)},templateGroupsList:function(){var e=[];return e.push('<div id="groups">'),e.push("</div>"),e.push('<div class="groups_container table-responsive">'),e.push("<% if(length === 0) { %>"),e.push("<div>There are no groups yet.</div>"),e.push("<% } else{ %>"),e.push('<table class="grid table table-sm">'),e.push("   <thead>"),e.push("     <th>Name</th>"),e.push("     <th>Members</th> "),e.push("     <th>Repositories</th>"),e.push("   </thead>"),e.push('   <tbody id="group_list_body">'),e.push("   </tbody>"),e.push("</table>"),e.push("<% }%>"),e.push("</div>"),_.template(e.join(""))}});e.default={GroupListView:l}});