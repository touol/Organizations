<?php

/**
 * Create an GroupsCreate
 */
class OrganizationsGroupsCreateProcessor extends modObjectCreateProcessor {
	public $objectType = 'OrgsUsersGroups';
	public $classKey = 'OrgsUsersGroups';
	public $languageTopics = array('organizations');
	public $permission = 'create';


	/**
	 * @return bool
	 */
	public function beforeSet() {
		$name = trim($this->getProperty('name'));
		if (empty($name)) {
			$this->modx->error->addField('name', $this->modx->lexicon('organizations_item_err_name'));
		}
		elseif ($this->modx->getCount($this->classKey, array('name' => $name))) {
			$this->modx->error->addField('name', $this->modx->lexicon('organizations_item_err_ae'));
		}

		return parent::beforeSet();
	}

}

return 'OrganizationsGroupsCreateProcessor';