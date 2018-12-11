define("mvc/tool/tool-form-composite",["exports","backbone","underscore","utils/localization","utils/utils","utils/deferred","mvc/ui/ui-misc","mvc/form/form-view","mvc/form/form-data","mvc/tool/tool-form-base","mvc/ui/ui-modal","mvc/webhooks","mvc/workflow/workflow-icons"],function(e,t,s,i,a,o,r,n,l,p,u,d,c){"use strict";function h(e){return e&&e.__esModule?e:{default:e}}function f(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&(t[s]=e[s]);return t.default=e,t}Object.defineProperty(e,"__esModule",{value:!0});var _=f(t),m=f(s),w=h(i),v=h(a),b=h(o),y=h(r),g=h(n),k=h(l),x=h(p),S=h(u),G=h(d),j=h(c),P=_.View.extend({initialize:function(e){this.modal=window.parent.Galaxy.modal||new S.default.View,this.model=e&&e.model||new _.Model(e),this.deferred=new b.default,e&&e.active_tab&&(this.active_tab=e.active_tab),this.setElement($("<div/>").addClass("ui-form-composite").append(this.$message=$("<div/>")).append(this.$header=$("<div/>")).append(this.$steps=$("<div/>"))),$("body").append(this.$el),this._configure(),this.render()},_configure:function(){function e(e){return s.wp_inputs[e]=s.wp_inputs[e]||{label:e,name:e,type:"text",color:"hsl( "+100*++i+", 70%, 30% )",style:"ui-form-wp-source",links:[]}}function t(t,s){for(var i,a=/\$\{(.+?)\}/g;i=a.exec(String(t));)s(e(i[1]))}var s=this;this.forms=[],this.steps=[],this.links=[],this.parms=[],m.each(this.model.get("steps"),function(e,t){Galaxy.emit.debug("tool-form-composite::initialize()",t+" : Preparing workflow step.");var i=j.default[e.step_type],a=parseInt(t+1)+": "+(e.step_label||e.step_name);e.annotation&&(a+=" - "+e.annotation),e.step_version&&(a+=" (Galaxy Version "+e.step_version+")"),e=v.default.merge({index:t,fixed_title:m.escape(a),icon:i||"",help:null,citations:null,collapsible:!0,collapsed:t>0&&!s._isDataStep(e),sustain_version:!0,sustain_repeats:!0,sustain_conditionals:!0,narrow:!0,text_enable:"Edit",text_disable:"Undo",cls_enable:"fa fa-edit",cls_disable:"fa fa-undo",errors:e.messages,initial_errors:!0,cls:"ui-portlet-narrow",hide_operations:!0,needs_refresh:!1,always_refresh:"tool"!=e.step_type},e),s.steps[t]=e,s.links[t]=[],s.parms[t]={}}),m.each(this.steps,function(e,t){k.default.visitInputs(e.inputs,function(e,i){s.parms[t][i]=e})}),m.each(this.steps,function(e,t){m.each(e.output_connections,function(e){m.each(s.steps,function(i,a){i.step_index===e.input_step_index&&s.links[t].push(i)})})}),m.each(this.steps,function(e,t){m.each(s.steps,function(i,a){var o={};m.each(e.output_connections,function(e){i.step_index===e.input_step_index&&(o[e.input_name]=e)}),m.each(s.parms[a],function(s,i){var a=o[i];a&&(s.type="hidden",s.help=s.step_linked?s.help+", ":"",s.help+="Output dataset '"+a.output_name+"' from step "+(parseInt(t)+1),s.step_linked=s.step_linked||[],s.step_linked.push({index:e.index,step_type:e.step_type}))})})});var i=0;this.wp_inputs={},m.each(this.steps,function(i,a){m.each(s.parms[a],function(e,s){t(e.value,function(t){t.links.push(i),e.wp_linked=!0,e.type="text",e.backdrop=!0,e.style="ui-form-wp-target"})}),m.each(i.replacement_parameters,function(t){e(t)})}),m.each(this.steps,function(e,t){if("tool"==e.step_type){var i=!0;k.default.visitInputs(e.inputs,function(t,a,o){var r=t.value&&"RuntimeValue"==t.value.__class__,n=-1!=["data","data_collection"].indexOf(t.type),l=o[t.data_ref];t.step_linked&&!s._isDataStep(t.step_linked)&&(i=!1),t.options&&(0==t.options.length&&!i||t.wp_linked)&&(t.is_workflow=!0),l&&(t.is_workflow=l.step_linked&&!s._isDataStep(l.step_linked)||t.wp_linked),(n||t.value&&"RuntimeValue"==t.value.__class__&&!t.step_linked)&&(e.collapsed=!1),r&&(t.value=t.default_value),t.flavor="workflow",r||n||"hidden"===t.type||t.wp_linked||(t.optional||!v.default.isEmpty(t.value)&&""!==t.value)&&(t.collapsible_value=t.value,t.collapsible_preview=!0)})}})},render:function(){var e=this;this.deferred.reset(),this._renderHeader(),this._renderMessage(),this._renderParameters(),this._renderHistory(),this._renderUseCachedJob(),this._renderResourceParameters(),m.each(this.steps,function(t){e._renderStep(t)})},_renderHeader:function(){var e=this;this.execute_btn=new y.default.Button({icon:"fa-check",title:(0,w.default)("Run workflow"),cls:"btn btn-primary",onclick:function(){e._execute()}}),this.$header.addClass("ui-form-header").empty().append(new y.default.Label({title:"Workflow: "+this.model.get("name")}).$el).append(this.execute_btn.$el)},_renderMessage:function(){this.$message.empty(),this.model.get("has_upgrade_messages")&&this.$message.append(new y.default.Message({message:"Some tools in this workflow may have changed since it was last saved or some errors were found. The workflow may still run, but any new options will have default values. Please review the messages below to make a decision about whether the changes will affect your analysis.",status:"warning",persistent:!0,fade:!1}).$el);var e=this.model.get("step_version_changes");e&&e.length>0&&this.$message.append(new y.default.Message({message:"Some tools are being executed with different versions compared to those available when this workflow was last saved because the other versions are not or no longer available on this Galaxy instance. To upgrade your workflow and dismiss this message simply edit the workflow and re-save it.",status:"warning",persistent:!0,fade:!1}).$el)},_renderParameters:function(){var e=this;this.wp_form=null,m.isEmpty(this.wp_inputs)||(this.wp_form=new g.default({title:"<b>Workflow Parameters</b>",inputs:this.wp_inputs,cls:"ui-portlet-narrow",onchange:function(){m.each(e.wp_form.input_list,function(t,s){m.each(t.links,function(t){e._refreshStep(t)})})}}),this._append(this.$steps.empty(),this.wp_form.$el))},_renderHistory:function(){this.history_form=new g.default({cls:"ui-portlet-narrow",title:"<b>History Options</b>",inputs:[{type:"conditional",name:"new_history",test_param:{name:"check",label:"Send results to a new history",type:"boolean",value:"false",help:""},cases:[{value:"true",inputs:[{name:"name",label:"History name",type:"text",value:this.model.get("name")}]}]}]}),this._append(this.$steps,this.history_form.$el)},_renderResourceParameters:function(){this.workflow_resource_parameters_form=null,m.isEmpty(this.model.get("workflow_resource_parameters"))||(this.workflow_resource_parameters_form=new g.default({cls:"ui-portlet-narrow",title:"<b>Workflow Resource Options</b>",inputs:this.model.get("workflow_resource_parameters")}),this._append(this.$steps,this.workflow_resource_parameters_form.$el))},_renderUseCachedJob:function(){var e={};Galaxy.user.attributes.preferences&&"extra_user_preferences"in Galaxy.user.attributes.preferences&&(e=JSON.parse(Galaxy.user.attributes.preferences.extra_user_preferences));var t="use_cached_job|use_cached_job_checkbox"in e&&e["use_cached_job|use_cached_job_checkbox"];this.display_use_cached_job_checkbox="true"===t,this.display_use_cached_job_checkbox&&(this.job_options_form=new g.default({cls:"ui-portlet-narrow",title:"<b>Job re-use Options</b>",inputs:[{type:"conditional",name:"use_cached_job",test_param:{name:"check",label:"BETA: Attempt to reuse jobs with identical parameters?",type:"boolean",value:"false",help:"This may skip executing jobs that you have already run."}}]}),this._append(this.$steps,this.job_options_form.$el))},_renderStep:function(e){var t=this,s=null;this.deferred.execute(function(i){if(t.$steps.addClass("ui-steps"),"tool"==e.step_type)e.postchange=function(t,s){var i={tool_id:e.id,tool_version:e.version,inputs:$.extend(!0,{},s.data.create())};s.wait(!0),Galaxy.emit.debug("tool-form-composite::postchange()","Sending current state.",i),v.default.request({type:"POST",url:Galaxy.root+"api/tools/"+e.id+"/build",data:i,success:function(e){s.update(e),s.wait(!1),Galaxy.emit.debug("tool-form-composite::postchange()","Received new model.",e),t.resolve()},error:function(e){Galaxy.emit.debug("tool-form-composite::postchange()","Refresh request failed.",e),t.reject()}})},s=new x.default(e),e.post_job_actions&&e.post_job_actions.length&&s.portlet.append($("<div/>").addClass("ui-form-element-disabled").append($("<div/>").addClass("ui-form-title").html("<b>Job Post Actions</b>")).append($("<div/>").addClass("ui-form-preview").html(m.reduce(e.post_job_actions,function(e,t){return e+" "+t.short_str},""))));else{var a=-1!=["data_input","data_collection_input"].indexOf(e.step_type);m.each(e.inputs,function(e){e.flavor="module",e.hide_label=a}),s=new g.default(v.default.merge({title:e.fixed_title,onchange:function(){m.each(t.links[e.index],function(e){t._refreshStep(e)})},inputs:e.inputs&&e.inputs.length>0?e.inputs:[{type:"hidden",name:"No options available.",ignore:null}]},e)),e.step_label&&s.$el.attr("step-label",e.step_label)}t.forms[e.index]=s,t._append(t.$steps,s.$el),e.needs_refresh&&t._refreshStep(e),s.portlet[t.show_progress?"disable":"enable"](),t.show_progress&&t.execute_btn.model.set({wait:!0,wait_text:"Preparing...",percentage:100*(e.index+1)/t.steps.length}),Galaxy.emit.debug("tool-form-composite::initialize()",e.index+" : Workflow step state ready.",e),window.setTimeout(function(){i.resolve()},0)})},_refreshStep:function(e){var t=this,s=this.forms[e.index];s?(m.each(t.parms[e.index],function(e,i){if(e.step_linked||e.wp_linked){var a=s.field_list[s.data.match(i)];if(a){var o;if(e.step_linked)o={values:[]},m.each(e.step_linked,function(e){if(t._isDataStep(e)){var s=t.forms[e.index].data.create().input;s&&m.each(s.values,function(e){o.values.push(e)})}}),!e.multiple&&o.values.length>0&&(o={values:[o.values[0]]});else if(e.wp_linked){o=e.value;for(var r,n=/\$\{(.+?)\}/g;r=n.exec(e.value);){var l=t.wp_form.field_list[t.wp_form.data.match(r[1])],p=l&&l.value();p&&(o=o.split(r[0]).join(p))}}void 0!==o&&a.value(o)}}}),s.trigger("change")):e.needs_refresh=!0},_refreshHistory:function(){var e=this,t=window.parent.Galaxy&&window.parent.Galaxy.currHistoryPanel&&window.parent.Galaxy.currHistoryPanel.model;this._refresh_history&&window.clearTimeout(this._refresh_history),t&&t.refresh().success(function(){0===t.numOfUnfinishedShownContents()&&(e._refresh_history=window.setTimeout(function(){e._refreshHistory()},t.UPDATE_DELAY))})},_execute:function(){var e=this;this.show_progress=!0,this._enabled(!1),this.deferred.execute(function(t){window.setTimeout(function(){t.resolve(),e._submit()},0)})},_submit:function(){var e=this,t=this.history_form.data.create(),s={new_history_name:t["new_history|name"]?t["new_history|name"]:null,history_id:t["new_history|name"]?null:this.model.get("history_id"),resource_params:this.workflow_resource_parameters_form?this.workflow_resource_parameters_form.data.create():{},replacement_params:this.wp_form?this.wp_form.data.create():{},parameters:{},parameters_normalized:!0,batch:!0};this.display_use_cached_job_checkbox&&(s.use_cached_job="true"===this.job_options_form.data.create()["use_cached_job|check"]);var i=!0;for(var a in this.forms){var o=this.forms[a],r=o.data.create(),n=e.steps[a],l=n.step_index;o.trigger("reset");for(var p in r){var u=r[p],d=o.data.match(p),c=o.input_list[d];if(!c.step_linked){if(!(i=this._isDataStep(n)?u&&u.values&&u.values.length>0:c.optional||c.is_workflow&&""!==u||!c.is_workflow&&null!==u)){o.highlight(d);break}s.parameters[l]=s.parameters[l]||{},s.parameters[l][p]=r[p]}}if(!i)break}i?(Galaxy.emit.debug("tool-form-composite::submit()","Validation complete.",s),v.default.request({type:"POST",url:Galaxy.root+"api/workflows/"+this.model.id+"/invocations",data:s,success:function(t){Galaxy.emit.debug("tool-form-composite::submit","Submission successful.",t),e.$el.children().hide(),e.$el.append(e._templateSuccess(t)),$.isArray(t)&&t.length>0&&(e.$el.append($("<div/>",{id:"webhook-view"})),new G.default.WebhookView({type:"workflow",toolId:s.tool_id,toolVersion:s.tool_version})),e._refreshHistory()},error:function(t){Galaxy.emit.debug("tool-form-composite::submit","Submission failed.",t);var i=!1;if(t&&t.err_data)for(var a in e.forms){var o=e.forms[a],r=t.err_data[o.model.get("step_index")];if(r){var n=o.data.matchResponse(r);for(var l in n){o.highlight(l,n[l]),i=!0;break}}}i||e.modal.show({title:(0,w.default)("Workflow submission failed"),body:e._templateError(s,t&&t.err_msg),buttons:{Close:function(){e.modal.hide()}}})},complete:function(){e._enabled(!0)}})):(e._enabled(!0),Galaxy.emit.debug("tool-form-composite::submit()","Validation failed.",s))},_append:function(e,t){e.append("<p/>").append(t)},_enabled:function(e){this.execute_btn.model.set({wait:!e,wait_text:"Sending...",percentage:-1}),this.wp_form&&this.wp_form.portlet[e?"enable":"disable"](),this.history_form&&this.history_form.portlet[e?"enable":"disable"](),m.each(this.forms,function(t){t&&t.portlet[e?"enable":"disable"]()})},_isDataStep:function(e){for(var t=$.isArray(e)?e:[e],s=0;s<t.length;s++){var i=t[s];if(!i||!i.step_type||!i.step_type.startsWith("data"))return!1}return!0},_templateSuccess:function(e){if($.isArray(e)&&e.length>0){var t="",s="You can check the status of queued jobs and view the resulting data by refreshing the History pane, if this has not already happened automatically.",i=e[0].history_id&&Galaxy.currHistoryPanel&&Galaxy.currHistoryPanel.model.id!=e[0].history_id||!1;return e.length>1?(t="<em> - "+e.length+" times</em>",i&&(s='This workflow will generate results in multiple histories.  You can observe progress in the <a href="'+Galaxy.root+'history/view_multiple">history multi-view</a>.')):i&&(s='This workflow will generate results in a new history. <a href="'+Galaxy.root+"history/switch_to_history?hist_id="+e[0].history_id+'">Switch to that history now</a>.'),$('\n                <div class="donemessagelarge">\n                    <p>\n                        Successfully invoked workflow <b>'+v.default.sanitize(this.model.get("name"))+"</b>"+t+".\n                    </p>\n                    <p>\n                        "+s+"\n                    </p>\n                </div>")}return this._templateError(e,"Invalid success response. No invocations found.")},_templateError:function(e,t){return $("<div/>").addClass("errormessagelarge").append($("<p/>").text("The server could not complete the request. Please contact the Galaxy Team if this error persists. "+(JSON.stringify(t)||""))).append($("<pre/>").text(JSON.stringify(e,null,4)))}});e.default={View:P}});