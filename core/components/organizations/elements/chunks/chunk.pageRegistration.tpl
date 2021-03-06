{$_modx->regClientScript('/assets/components/organizations/js/bootstrap3-typeahead.min.js')}
{$_modx->regClientScript('/assets/components/organizations/js/orgs.js')}
[[!inviteReg?]]

[[!Register?
    &submitVar=`registerbtn`
    &activationEmailTpl=`lgnActivationEmailTpl`
    &activationEmailSubject=`Спасибо за регистрацию!`
    &submittedResourceId=`12`
    &usergroups=`Покупатели`
    &activation=`0`
    &validate=`nospam:blank,
      username:required,
      password:required,
      password_confirm:password_confirm=^password^,
      fullname:required,
      email:required:email,
      phone:required`
    &placeholderPrefix=`reg.`
    &excludeExtended=`org`
    &postHooks=`loginRegisterHook`
    &preHooks=`CheckConteiner`
]]
<div class="registerMessage">[[!+reg.error.message]]</div>
     
<form class="form-horizontal" action="[[~[[*id]]]]" method="post">
    <input type="hidden" name="nospam" value="[[!+reg.nospam]]" />
    <input type="hidden" name="registerbtn" value="1" />
    
    <input type="hidden" id='longname' name="org[longname]" value="" />
    <input type="hidden" id='kpp' name="org[kpp]" value="" />
    <input type="hidden" id='ur_address' name="org[ur_address]" value="" />
    <input type="hidden" id='p_address' name="org[p_address]" value="" />
    <div class="form-group row">
        <label for="haveteam" class="col-sm-2 col-form-label">Мой статус:</label>
    	<div class="col-sm-10">
    		<div id="statusBtn" class="btn-group btn-radio-group">
    			<a class="btn btn-primary btn-sm active" data-toggle="lico" data-title="urlico">Юридическое лицо</a>
    			<a class="btn btn-primary btn-sm notActive" data-toggle="lico" data-title="fizlico">Физическое Люцо</a>
    		</div>
    		<input type="hidden" name="lico" id="lico" value="[[!+inv.lico:isempty=`[[!+reg.lico:isempty=`urlico`]]`]]">
    	</div>
    </div>
    <div class="form-group row">
        <label for="reg_username" class="col-sm-2 col-form-label">Логин*:</label>
        <div class="col-sm-10">
            <input type="text" class="form-control" id="reg_username" name="username" value="[[!+reg.username]]" placeholder="Введите логин">
            <div class="error">[[!+reg.error.username]]</div>
        </div>
    </div>
    <div class="form-group row">
        <label for="reg_password" class="col-sm-2 col-form-label">Пароль*:</label>
        <div class="col-sm-10">
            <input type="password" class="form-control" id="reg_password" name="password" value="[[!+reg.password]]" placeholder="Введите пароль">
            <div class="error">[[!+reg.error.password]]</div>
        </div>
    </div>
    <div class="form-group row">
        <label for="password_confirm" class="col-sm-2 col-form-label">Повторите пароль*:</label>
        <div class="col-sm-10">
            <input type="password" class="form-control" id="password_confirm" name="password_confirm" value="[[!+reg.password_confirm]]" placeholder="Повторите пароль">
            <div class="error">[[!+reg.error.password_confirm]]</div>
        </div>
    </div>
    <div class="form-group row">
        <label for="fullname" class="col-sm-2 col-form-label">Ф.И.О.*:</label>
        <div class="col-sm-10">
            <input type="text" class="form-control" id="fullname" name="fullname" value="[[!+reg.fullname]]" placeholder="Введите Ф.И.О.">
            <div class="error">[[!+reg.error.fullname]]</div>
        </div>
    </div>
    <div class="form-group row">
        <label for="email" class="col-sm-2 col-form-label">Адрес эл. почты*:</label>
        <div class="col-sm-10">
            <input type="text" class="form-control" id="email" name="email" value="[[!+reg.email]]" placeholder="Введите адрес эл. почты">
            <div class="error">[[!+reg.error.email]]</div>
        </div>
    </div>
    <div class="form-group row">
        <label for="phone" class="col-sm-2 col-form-label">Телефон*:</label>
        <div class="col-sm-10">
            <input type="text" class="form-control" id="phone" name="phone" value="[[!+reg.phone]]" placeholder="Введите телефон">
            <div class="error">[[!+reg.error.phone]]</div>
        </div>
    </div>
    <div class="form-group urlico-block row">
        <label for="shortname" class="col-sm-2 col-form-label">Имя организации*:</label>
        <div class="col-sm-10">
            <input type="text" class="form-control org-combo-dadata" name="org[shortname]" id="shortname" value='[[!+inv.shortname:isempty=`[[!+reg.orgshortname ]]`]]' placeholder="Введите имя организации">
            <div class="error">[[!+reg.error.org_shortname ]]</div>
        </div>
    </div>
    <div class="form-group urlico-block row">
        <label for="inn" class="col-sm-2 col-form-labell">ИНН:</label>
        <div class="col-sm-10">
            <input type="text" class="form-control" name="org[inn]" id="inn" value="[[!+inv.inn:isempty=`[[!+reg.orginn ]]` ]]" placeholder="Введите ИНН">
            <div class="error">[[!+reg.error.org_inn ]]</div>
        </div>
    </div>
    <div class="form-group urlico-block row">
        <label for="invite_code" class="col-sm-2 col-form-label">Код приглашения:</label>
        <div class="col-sm-10">
            <input type="text" class="form-control" name="invite_code" id="invite_code" value="[[!+inv.invite_code:isempty=`[[!+reg.invite_code]]`]]" placeholder="Введите код приглашения">
            <div class="error">[[!+inv.error]]</div>
        </div>
    </div>
    <div class="form-group row">
        <label for="invite_code" class="col-sm-2 col-form-label"></label>
        <div class="col-sm-10">
            <p>
                Заполняя данную форму, вы принимаете условия <a href=[[~99]]>Соглашения об использовании сайта</a>, в том числе в части обработки и использования персональных данных
    		</p>
        </div>
    </div>
    <div class="form-group row">
        <div class="col-sm-offset-2 col-sm-10">
            <button type="submit" class="btn btn-primary">Зарегистрироваться</button>
        </div>
</form>
<style>
    .error{
        color:red;
    }
</style>
