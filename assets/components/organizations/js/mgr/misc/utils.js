Organizations.utils.renderBoolean = function (value, props, row) {
	return value
		? String.format('<span class="green">{0}</span>', _('yes'))
		: String.format('<span class="red">{0}</span>', _('no'));
};
Organizations.utils.renderBooleanLico = function (value, props, row) {
	//console.info("value",value);
	//console.info("row",row);
	return value
		? String.format('<span class="green">{0}</span>', _('organizations_urlico'))
		: String.format('<span class="blue">{0}</span>', _('organizations_fizlico'));
};

Organizations.utils.getMenu = function (actions, grid, selected) {
	var menu = [];
	var cls, icon, title, action = '';

	for (var i in actions) {
		if (!actions.hasOwnProperty(i)) {
			continue;
		}

		var a = actions[i];
		if (!a['menu']) {
			if (a == '-') {
				menu.push('-');
			}
			continue;
		}
		else if (menu.length > 0 && /^remove/i.test(a['action'])) {
			menu.push('-');
		}

		if (selected.length > 1) {
			if (!a['multiple']) {
				continue;
			}
			else if (typeof(a['multiple']) == 'string') {
				a['title'] = a['multiple'];
			}
		}

		cls = a['cls'] ? a['cls'] : '';
		icon = a['icon'] ? a['icon'] : '';
		title = a['title'] ? a['title'] : a['title'];
		action = a['action'] ? grid[a['action']] : '';

		menu.push({
			handler: action,
			text: String.format(
				'<span class="{0}"><i class="x-menu-item-icon {1}"></i>{2}</span>',
				cls, icon, title
			),
		});
	}

	return menu;
};


Organizations.utils.renderActions = function (value, props, row) {
	var res = [];
	var cls, icon, title, action, item = '';
	for (var i in row.data.actions) {
		if (!row.data.actions.hasOwnProperty(i)) {
			continue;
		}
		var a = row.data.actions[i];
		if (!a['button']) {
			continue;
		}

		cls = a['cls'] ? a['cls'] : '';
		icon = a['icon'] ? a['icon'] : '';
		action = a['action'] ? a['action'] : '';
		title = a['title'] ? a['title'] : '';

		item = String.format(
			'<li class="{0}"><button class="btn btn-default {1}" action="{2}" title="{3}"></button></li>',
			cls, icon, action, title
		);

		res.push(item);
	}

	return String.format(
		'<ul class="organizations-row-actions">{0}</ul>',
		res.join('')
	);
};
Organizations.utils.managerLink = function(val,cell,row) {
	if (!row.data['manager_id'] || !row.data['manager'] ) {return '';}
	var action = MODx.action ? MODx.action['security/user/update'] : 'security/user/update';
	var url = 'index.php?a='+action+'&id='+row.data['manager_id'];
	//console.info(row);
	return '<a href="' + url + '" target="_blank">' + row.data['manager'] + '</a>';
};
Organizations.utils.groupLink = function(val,cell,row) {
	if (!row.data['user_group_id'] || !row.data['user_group_name'] ) {return '';}
	return row.data['user_group_name'];
};

Organizations.utils.userLink = function(val,cell,row) {
	if (!val) {return '';}
	var action = MODx.action ? MODx.action['security/user/update'] : 'security/user/update';
	var url = 'index.php?a='+action+'&id='+row.data['user_id'];
	//console.info(row);
	return '<a href="' + url + '" target="_blank">' + val + '</a>';
};
Organizations.utils.createuserLink = function(val,cell,row) {
	if (!row.data['createdby_user_name'] || !row.data['createdby_user_id']) {return '';}
	var action = MODx.action ? MODx.action['security/user/update'] : 'security/user/update';
	var url = 'index.php?a='+action+'&id='+row.data['createdby_user_id'];
	//console.info(row);
	return '<a href="' + url + '" target="_blank">' + row.data['createdby_user_name'] + '</a>';
};