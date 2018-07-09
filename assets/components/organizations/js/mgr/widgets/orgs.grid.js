
Organizations.grid.Orgs = function (config) {
	config = config || {};
	if (!config.id) {
		config.id = 'organizations-grid-orgs';
	}
	Ext.Ajax.request({
			url: Organizations.config.connector_url,
			params: {
				action: 'mgr/orgs/getfields'
			},
			success:function(response){
				//console.info(response.responseText);
				Organizations.config.org_fields = JSON.parse(response.responseText);
				//console.info(Organizations.config);
			}
	});
	Ext.applyIf(config, {
		url: Organizations.config.connector_url,
		fields: this.getFields(config),
		columns: this.getColumns(config),
		tbar: this.getTopBar(config),
		sm: new Ext.grid.CheckboxSelectionModel(),
		baseParams: {
			action: 'mgr/orgs/getlist'
		},
		listeners: {
			rowDblClick: function (grid, rowIndex, e) {
				var row = grid.store.getAt(rowIndex);
				this.updateOrg(grid, e, row);
			}
		},
		viewConfig: {
			forceFit: true,
			enableRowBody: true,
			autoFill: true,
			showPreview: true,
			scrollOffset: 0,
			getRowClass: function (rec, ri, p) {
				return !rec.data.active
					? 'organizations-grid-row-disabled'
					: '';
			}
		},
		paging: true,
		remoteSort: true,
		autoHeight: true,
	});
	Organizations.grid.Orgs.superclass.constructor.call(this, config);

	// Clear selection on grid refresh
	this.store.on('load', function () {
		if (this._getSelectedIds().length) {
			this.getSelectionModel().clearSelections();
		}
	}, this);
};
Ext.extend(Organizations.grid.Orgs, MODx.grid.Grid, {
	windows: {},

	getMenu: function (grid, rowIndex) {
		var ids = this._getSelectedIds();

		var row = grid.getStore().getAt(rowIndex);
		var menu = Organizations.utils.getMenu(row.data['actions'], this, ids);

		this.addContextMenuItem(menu);
	},

	createOrg: function (btn, e) {
		var w = MODx.load({
			xtype: 'organizations-orgs-window-create',
			id: Ext.id(),
			listeners: {
				success: {
					fn: function () {
						this.refresh();
					}, scope: this
				}
			}
		});
		w.reset();
		w.setValues({active: true});
		w.show(e.target);
	},
	addInvite: function (btn, e) {
		if (typeof(row) != 'undefined') {
			this.menu.record = row.data;
		}
		else if (!this.menu.record) {
			return false;
		}
		var id = this.menu.record.id;
		
		var w = MODx.load({
			xtype: 'organizations-invites-window-create',
			id: Ext.id(),
			listeners: {
				success: {
					fn: function () {
						this.refresh();
					}, scope: this
				}
			}
		});
		w.reset();
		w.setValues({org_id: id, send_email: true, user_group_id: 1, type: 1 });
		w.show(e.target);
	},
	
	addKupon: function (btn, e) {
		if (typeof(row) != 'undefined') {
			this.menu.record = row.data;
		}
		else if (!this.menu.record) {
			return false;
		}
		var id = this.menu.record.id;
		
		var w = MODx.load({
			xtype: 'organizations-kupons-window-create',
			id: Ext.id(),
			listeners: {
				success: {
					fn: function () {
						//this.refresh();
					}, scope: this
				}
			}
		});
		w.reset();
		w.setValues({org_id: id, use_count: 1, type: 1});
		w.show(e.target);
	},
	
	getFieldsShow: function (response) {
		
	},
	updateOrg: function (btn, e, row) {
		if (typeof(row) != 'undefined') {
			this.menu.record = row.data;
		}
		else if (!this.menu.record) {
			return false;
		}
		var id = this.menu.record.id;

		MODx.Ajax.request({
			url: this.config.url,
			params: {
				action: 'mgr/orgs/get',
				id: id
			},
			listeners: {
				success: {
					fn: function (r) {
						var w = MODx.load({
							xtype: 'organizations-orgs-window-update',
							id: Ext.id(),
							record: r,
							listeners: {
								success: {
									fn: function () {
										this.refresh();
									}, scope: this
								}
							}
						});
						w.reset();
						w.setValues(r.object);
						w.show(e.target);
					}, scope: this
				}
			}
		});
	},
	updateUsers: function (btn, e, row) {
		if (typeof(row) != 'undefined') {
			this.menu.record = row.data;
		}
		else if (!this.menu.record) {
			return false;
		}
		var id = this.menu.record.id;
		MODx.Ajax.request({
			url: this.config.url,
			params: {
				action: 'mgr/orgs/get',
				id: id
			},
			listeners: {
				success: {
					fn: function (r) {
						var w = MODx.load({
							xtype: 'organizations-users-window',
							id: Ext.id(),
							record: r,
							listeners: {
								success: {
									fn: function () {
										this.refresh();
									}, scope: this
								}
							}
						});
						w.reset();
						w.setValues(r.object);
						w.show(e.target);
					}, scope: this
				}
			}
		});
	},

	removeOrg: function (act, btn, e) {
		var ids = this._getSelectedIds();
		if (!ids.length) {
			return false;
		}
		MODx.msg.confirm({
			title: ids.length > 1
				? _('organizations_orgs_remove')
				: _('organizations_org_remove'),
			text: ids.length > 1
				? _('organizations_orgs_remove_confirm')
				: _('organizations_org_remove_confirm'),
			url: this.config.url,
			params: {
				action: 'mgr/orgs/remove',
				ids: Ext.util.JSON.encode(ids),
			},
			listeners: {
				success: {
					fn: function (r) {
						this.refresh();
					}, scope: this
				}
			}
		});
		return true;
	},

	disableOrg: function (act, btn, e) {
		var ids = this._getSelectedIds();
		if (!ids.length) {
			return false;
		}
		MODx.Ajax.request({
			url: this.config.url,
			params: {
				action: 'mgr/orgs/disable',
				ids: Ext.util.JSON.encode(ids),
			},
			listeners: {
				success: {
					fn: function () {
						this.refresh();
					}, scope: this
				}
			}
		})
	},

	enableOrg: function (act, btn, e) {
		var ids = this._getSelectedIds();
		if (!ids.length) {
			return false;
		}
		MODx.Ajax.request({
			url: this.config.url,
			params: {
				action: 'mgr/orgs/enable',
				ids: Ext.util.JSON.encode(ids),
			},
			listeners: {
				success: {
					fn: function () {
						this.refresh();
					}, scope: this
				}
			}
		})
	},

	getFields: function (config) {
		
		return ['id','urlico','shortname','longtname','inn','kpp','kontragent','discount','manager_id','manager','active', 'actions'];
	},

	getColumns: function (config) {
		
		return [ {
			header: _('organizations_grid_id'),
			dataIndex: 'id',
			sortable: false,
			width: 50,
		},{
			header: _('organizations_lico'),
			dataIndex: 'urlico',
			renderer: Organizations.utils.renderBooleanLico,
			sortable: true,
			width: 70,
		},{
			header: _('organizations_grid_shortname'),
			dataIndex: 'shortname',
			sortable: true,
			width: 100,
		},{
			header: _('organizations_grid_inn'),
			dataIndex: 'inn',
			sortable: true,
			width: 100,
		},{
			header: _('organizations_grid_kpp'),
			dataIndex: 'kpp',
			sortable: true,
			width: 100,
		},{
			header: _('organizations_grid_user_discount'),
			dataIndex: 'discount',
			sortable: true,
			width: 100,
		},{
			header: _('organizations_grid_manager'),
			dataIndex: 'manager',
			sortable: true,
			width: 100,
			renderer: Organizations.utils.managerLink,
		},{
			header: _('organizations_item_active'),
			dataIndex: 'active',
			renderer: Organizations.utils.renderBoolean,
			sortable: true,
			width: 70,
		},{
			header: _('organizations_grid_actions'),
			dataIndex: 'actions',
			renderer: Organizations.utils.renderActions,
			sortable: false,
			width: 180,
			id: 'actions'
		}];
	},

	getTopBar: function (config) {
		return [{
			text: '<i class="icon icon-plus"></i>&nbsp;' + _('organizations_org_create'),
			handler: this.createOrg,
			scope: this
		}, '->', {
			xtype: 'textfield',
			name: 'query',
			width: 300,
			id: config.id + '-search-field',
			emptyText: _('organizations_grid_org_search'),
			listeners: {
				render: {
					fn: function (tf) {
						tf.getEl().addKeyListener(Ext.EventObject.ENTER, function () {
							this._doSearch(tf);
						}, this);
					}, scope: this
				}
			}
		}, {
			xtype: 'button',
			id: config.id + '-search-clear',
			text: '<i class="icon icon-times"></i>',
			listeners: {
				click: {fn: this._clearSearch, scope: this}
			}
		}];
	},

	onClick: function (e) {
		var elem = e.getTarget();
		if (elem.nodeName == 'BUTTON') {
			var row = this.getSelectionModel().getSelected();
			if (typeof(row) != 'undefined') {
				var action = elem.getAttribute('action');
				if (action == 'showMenu') {
					var ri = this.getStore().find('id', row.id);
					return this._showMenu(this, ri, e);
				}
				else if (typeof this[action] === 'function') {
					this.menu.record = row.data;
					return this[action](this, e);
				}
			}
		}
		return this.processEvent('click', e);
	},

	_getSelectedIds: function () {
		var ids = [];
		var selected = this.getSelectionModel().getSelections();

		for (var i in selected) {
			if (!selected.hasOwnProperty(i)) {
				continue;
			}
			ids.push(selected[i]['id']);
		}

		return ids;
	},

	_doSearch: function (tf, nv, ov) {
		this.getStore().baseParams.query = tf.getValue();
		this.getBottomToolbar().changePage(1);
		this.refresh();
	},

	_clearSearch: function (btn, e) {
		this.getStore().baseParams.query = '';
		Ext.getCmp(this.config.id + '-search-field').setValue('');
		this.getBottomToolbar().changePage(1);
		this.refresh();
	}
});
Ext.reg('organizations-grid-orgs', Organizations.grid.Orgs);
