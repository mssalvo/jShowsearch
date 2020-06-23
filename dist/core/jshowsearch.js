/*!
 * jShowsearch v2.0.0 ©
 * @author salvo mariniello - salvo.mariniello@gmail.com 
 * https://github.com/mssalvo/jShowsearch
 * MIT License
 * Copyright (c) 2020 Salvatore Mariniello
 * https://github.com/mssalvo/jShowsearch/blob/master/LICENSE
 * 
 * @see jShowsearch istance
 * @function jShowsearch.get('nameProcessUnique',{...})  
 * @example istance
 * 
 *           jShowsearch.get('myIstanceName', {
 *              app: '#myform', 
 *              btnSearch:'#btnAggiorna01',
 *              btnRemoveAll:'#btnRimuovi01',
 *              boxhome: '#home01',
 *              boxButton: '#button01',
 *              template: '#template01',
 *              templateButton:'<button {box} type="button" class="close" {click} aria-label="Close">Rimuovi Filtri <span aria-hidden="true">&times;</span></button>',
 *              esclude: ['id_element_1','id_element_2'],
 *              offEvent:false,
 *              offStorage:false,
 *              onInit: function (bol,list) {  alert("Init"+ bol)  },
 *              onRemove: function (id,obj,form) { alert("remove") },
 *              onRemoveAll: function (list,form) { alert("remove tutti") },
 *              onSearch: function (list,form) {alert("search") }
 *
 *          })
 *          
 *  @Object Control
 *  @Parameter
 *  {
 *     app:             |ID ELEMENTO | OBJECT HTML | OBBLIGATORIO | indicare l'elemento <form> o il <div> contenete gli elementi
 *     btnSearch:       |ID ELEMENTO | OBJECT HTML | FACOLTATIVO | indicare il button per aggiornare il contenuto visualizzato
 *     btnRemoveAll:       |ID ELEMENTO | OBJECT HTML | FACOLTATIVO | indicare il button per rimuovere i filtri nel contenuto visualizzato
 *     boxhome:         |ID ELEMENTO | OBJECT HTML | OBBLIGATORIO | indicare l'elemento html dove includere gli elementi creati
 *     boxButton:       |ID ELEMENTO | OBJECT HTML | FACOLTATIVO | indicare l'elemento html dove includere in pulsante rimuovi tutti filtri, 
 *                                                                 se non indicato ed e' presente un templateButton, questo verra' incluso come ultimo elemento nel boxhome.
 *     template:        |STRING HTML | ID ELEMENTO | OBJECT HTML | OBBLIGATORIO | indicare l'elemento html o la stringa che descrive la struttura html del template
 *     templateButton:  |STRING HTML | ID ELEMENTO | OBJECT HTML | FACOLTATIVO  | indicare l'elemento html o la stringa che descrive la struttura html del button rimuvi tutti
 *     esclude:         |STRING    | ARRAY  | FACOLTATIVO | esclude dalla lista degli elementi gli elementi indicati dall'id, 
 *                                                          gli elementi esclusi non verranno processati
 *     offEvent:        |BOOLEAN TRUE/FALSE | FACOLTATIVO | (false)abilita / (true)disabilita gli eventi sui campi del form       
 *     offStorage:      |BOOLEAN TRUE/FALSE | FACOLTATIVO | (false)abilita / (true)disabilita memorizzazione dei dati                                            
 *     onInit:		|FUNCTION | FACOLTATIVO | Esegue la funzione 1 sola volta alla fine della creazione
 *     onRemove:	|FUNCTION | FACOLTATIVO | Esegue la funzione su ogni elemento con marcatore {click} 
 *     onRemoveAll:	|FUNCTION | FACOLTATIVO | Esegue la funzione sul pulsante indicato < btnRemoveAll >
 *     onSearch:	|FUNCTION | FACOLTATIVO | Esegue la funzione sul pulsante indicato < btnSearch >
 *
 *  }
 *  
 *  
 *  @example Dichiarazione template
 *  @Importante il template indicato sia di tipo html o stringa deve contenere
 *              i seguenti marcatori {box} , {label}, {val} , {click}
 *     {box}   > va inserito sull'elemento principale della struttura html
 *     {label} > va inserito dove deve comparire la label decrittiva se presente l'attribute [ data-js-label ]
 *     {val}   > va inserito dove deve comparire il testo descrittivo
 *     {click} > va inserito sull'elemento che deve eseguire l'azione
 *     
 *  	<template id="template01">
 *	<div {box} class="col alert alert-primary alert-dismissible fade show" role="alert">
 *		<strong> {label} </strong> <strong> {val} </strong>
 *	<button type="button" class="close"  {click} aria-label="Close">
 *	  <span aria-hidden="true">&times;</span>
 *	</button>
 *	</div>   
 *	</template>
 *  
 *  
 *  @example Dichiarazione templateButton
 *  @Importante il templateButton indicato sia di tipo html o stringa deve contenere   
 *              i seguenti marcatori {box} , {val} , {click}
 *     {box}   > va inserito sull'elemento principale della struttura html
 *     {val}   > va inserito dove deve comparire it testo descrittivo
 *     {click} > va inserito sull'elemento che deve eseguire l'azione              
 *    <button {box} type="button" class="close" {click} aria-label="Close">Rimuovi Filtri <span aria-hidden="true">&times;</span></button>
 *    
 *  
 * */
(function () {
    if (typeof window.console === 'undefined' || typeof window.console.warn === 'undefined' || typeof window.console.error === 'undefined')
        window.console = {log: function () {}, warn: function () {}, error: function () {}};
    if (!('forEach' in Array.prototype)) {
        Array.prototype.forEach = function (action, that) {
            for (var i = 0, n = this.length; i < n; i++)
                if (i in this)
                    action.call(that, this[i], i, this);
        };
    }
    if (!('trim' in String.prototype)) {
        String.prototype.trim = function () {
            var d = this;
            return d.replace(/^\s+|\s+$/gm, '');
        };
    }
});
function jShowsearch(n, o) {
    this.inputs = [];
    this.name = n;
    this.boxApp = undefined;
    this.form = undefined;
    this.btnSearch = undefined;
    this.btnRemove = undefined;
    this.boxhome = undefined;
    this.boxButton = undefined;
    this.template = undefined;
    this.templateButton = undefined;
    this.after = function () {};
    this.onRemove = function () {};
    this.onRemoveAll = function () {};
    this.onSearch = function () {};
    this.onInit = function () {};
    this.esclude = undefined;
    this.isdelete = false;
    this.offStorage = false;
    this.offEvent = false;
    this.elements = {};
    this.serialize = {};
    this.init(o || {});
}
;
jShowsearch.istance = {};
jShowsearch.removeBox = function (name, id) {
    jShowsearch.istance[name].removeBox(id).onRemove.apply(jShowsearch.istance[name], [id, jShowsearch.istance[name].elements[id].ob, jShowsearch.istance[name].form]);
};

jShowsearch.removeAll = function (name) {
    jShowsearch.istance[name].removeAll().onRemoveAll.apply(jShowsearch.istance[name], [jShowsearch.istance[name].elements, jShowsearch.istance[name].form]);
};
jShowsearch.prototype.removeAll = function () {
    var t__ = this;
    for (var h in t__.elements)
    {
        var o = t__.elements[h].ob;
        if (o && o.type) {
            var elemType = o.type.toUpperCase();
            switch (elemType) {
                case 'TEXT':
                case 'TEXTAREA':
                case 'PASSWORD':
                case 'EMAIL':
                case 'SEARCH':
                case 'NUMBER':
                case 'TIME':
                case 'DATE':
                case 'DATETIME':
                case 'DATETIME-LOCAL':
                case 'MONTH':
                case 'URL':
                    o.value = "";
                    break;
                case 'CHECKBOX':
                case 'RADIO':
                    o.checked = false;
                    break;
                case 'SELECT':
                case 'SELECT-ONE':
                    o.value = "";
                default :
                    break;
            }
        }
    }

    if (typeof (t__.boxhome) !== "undefined" && typeof t__.boxhome.querySelectorAll === "function")
        Array.prototype.forEach.call(t__.boxhome.querySelectorAll('[showsearch]'), function (el, i) {
            el.parentNode.removeChild(el);
        });

    if (null !== t__.boxButton && typeof t__.boxButton !== "undefined")
        t__.boxButton.innerHTML = "";

    t__.search(false).setStorage();
    return t__;
};
jShowsearch.prototype.removeBox = function (id) {
    var t__ = this;

    for (var h in t__.elements)
    {
        if (id === h) {
            var o = t__.elements[h].ob;

            if (o && o.type) {
                var elemType = o.type.toUpperCase();
                switch (elemType) {
                    case 'TEXT':
                    case 'TEXTAREA':
                    case 'PASSWORD':
                    case 'EMAIL':
                    case 'SEARCH':
                    case 'NUMBER':
                    case 'TIME':
                    case 'DATE':
                    case 'DATETIME':
                    case 'DATETIME-LOCAL':
                    case 'MONTH':
                    case 'URL':
                        o.value = "";
                        break;
                    case 'CHECKBOX':
                    case 'RADIO':
                        o.checked = false;
                        break;
                    case 'SELECT':
                    case 'SELECT-ONE':
                        o.value = "";
                    default :
                        break;
                }
            }

        }
    }

    if (typeof (t__.boxhome) !== "undefined" && typeof t__.boxhome.querySelectorAll === "function")
        Array.prototype.forEach.call(t__.boxhome.querySelectorAll('[showsearch]'), function (el, i) {
            if (el.getAttribute('showsearch') === id)
                el.parentNode.removeChild(el);
        });

    t__.search(false).setStorage();
    return t__;
};
jShowsearch.prototype.add = function (el) {
    var t__ = this;
    if (typeof el === "string" && el !== "undefined")
        t__.inputs.push(document.getElementById(el) || document.querySelector(el));
    else if (null !== el && typeof el === "object" && typeof el.jquery === "undefined")
        t__.inputs.push(el);
    else if (null !== el && typeof el === "object" && typeof el.jquery === "string")
        t__.inputs.push(el.get(0));
    else
        window.console.warn("jShowsearch add:: impossible to add element[ " + el + " ]");
    return t__;
};
jShowsearch.prototype.setTemplate = function (el) {
    var t__ = this;
    var isTemplate = /^<(\w*)\s*\/?(?:.* <\/\1>|)/.test(el);
    if (typeof el === "string" && isTemplate)
        t__.template = el;
    else if (typeof el === "string" && el !== "undefined" && !isTemplate)
        t__.template = document.getElementById(el) ? document.getElementById(el).innerHTML : document.querySelector(el) ? document.querySelector(el).innerHTML : el;
    else if (null !== el && typeof el === "object" && typeof el.jquery === "undefined")
        t__.template = el.innerHTML;
    else if (null !== el && typeof el === "object" && typeof el.jquery === "string")
        t__.template = el.get(0).innerHTML;
    else
        window.console.warn("jShowsearch setTemplate:: impossible to set the element template[ " + el + " ]");

    return t__;
};
jShowsearch.prototype.setTemplateButton = function (el) {
    var t__ = this;
    var isTemplate = /^<(\w*)\s*\/?(?:.* <\/\1>|)/.test(el);
    if (typeof el === "string" && isTemplate)
        t__.templateButton = el;
    else if (typeof el === "string" && el !== "undefined" && !isTemplate)
        t__.templateButton = document.getElementById(el) ? document.getElementById(el).innerHTML : document.querySelector(el) ? document.querySelector(el).innerHTML : el;
    else if (null !== el && typeof el === "object" && typeof el.jquery === "undefined")
        t__.templateButton = el.innerHTML;
    else if (null !== el && typeof el === "object" && typeof el.jquery === "string")
        t__.templateButton = el.get(0).innerHTML;
    else
        window.console.warn("jShowsearch setTemplateButton:: impossible to set the element templateButton[ " + el + " ]");

    return t__;
};

jShowsearch.prototype.setBoxHome = function (el) {
    var t__ = this;
    if (typeof el === "string" && el !== "undefined" && !/^<(\w*)\s*\/?(?:.* <\/\1>|)/.test(el))
        t__.boxhome = document.getElementById(el) || document.querySelector(el);
    else if (null !== el && typeof el === "object" && typeof el.jquery === "undefined")
        t__.boxhome = el;
    else if (null !== el && typeof el === "object" && typeof el.jquery === "string")
        t__.boxhome = el.get(0);
    else
        window.console.warn("jShowsearch setBoxHome:: impossible to set the element boxhome[ " + el + " ]");

    return t__;
};

jShowsearch.prototype.setBoxButton = function (el) {
    var t__ = this;
    if (typeof el === "string" && el !== "undefined" && !/^<(\w*)\s*\/?(?:.* <\/\1>|)/.test(el))
        t__.boxButton = document.getElementById(el) || document.querySelector(el);
    else if (null !== el && typeof el === "object" && typeof el.jquery === "undefined")
        t__.boxButton = el;
    else if (null !== el && typeof el === "object" && typeof el.jquery === "string")
        t__.boxButton = el.get(0);
    else
        window.console.warn("jShowsearch setBoxButton:: impossible to set the element boxButton[ " + el + " ]");

    return t__;
};
jShowsearch.prototype.setBtnSearch = function (el) {
    var t__ = this;
    if (typeof el === "string" && el !== "undefined" && !/^<(\w*)\s*\/?(?:.* <\/\1>|)/.test(el))
        t__.btnSearch = document.querySelectorAll(el).length ? document.querySelectorAll(el) : document.getElementById(el) ? [document.getElementById(el)] : undefined;
    else if (null !== el && typeof el === "object" && typeof el.jquery === "undefined")
        t__.btnSearch = [el];
    else if (null !== el && typeof el === "object" && typeof el.jquery === "string")
        t__.btnSearch = [el.get(0)];
    else
        window.console.warn("jShowsearch setBtnSearch:: impossible to set the element btnSearch[ " + el + " ]");

    return t__;
};

jShowsearch.prototype.setBtnRemove = function (el) {
    var t__ = this;
    if (typeof el === "string" && el !== "undefined" && !/^<(\w*)\s*\/?(?:.* <\/\1>|)/.test(el))
        t__.btnRemove = document.querySelectorAll(el).length ? document.querySelectorAll(el) : document.getElementById(el) ? [document.getElementById(el)] : undefined;
    else if (null !== el && typeof el === "object" && typeof el.jquery === "undefined")
        t__.btnRemove = [el];
    else if (null !== el && typeof el === "object" && typeof el.jquery === "string")
        t__.btnRemove = [el.get(0)];
    else
        window.console.warn("jShowsearch setBtnRemove:: impossible to set the element btnRemove[ " + el + " ]");

    return t__;
};


jShowsearch.prototype.setForm = function (el) {
    var t__ = this;
    if (typeof el === "string" && el !== "undefined" && !/^<(\w*)\s*\/?(?:.* <\/\1>|)/.test(el))
        t__.boxApp = document.getElementById(el) || document.querySelector(el);
    else if (null !== el && typeof el === "object" && typeof el.jquery === "undefined")
        t__.boxApp = el;
    else if (null !== el && typeof el === "object" && typeof el.jquery === "string")
        t__.boxApp = el.get(0);
    else
        window.console.warn("jShowsearch form:: impossible to set the element boxApp[ " + el + " ]");

    return t__;
};
jShowsearch.prototype.init = function (o) {
    var t_ = this;
    if (o && o.app)
        t_.setForm(o.app);
    if (o && o.boxhome)
        t_.setBoxHome(o.boxhome);
    if (o && o.boxButton)
        t_.setBoxButton(o.boxButton);
    if (o && o.btnSearch)
        t_.setBtnSearch(o.btnSearch);
    if (o && o.btnRemoveAll)
        t_.setBtnRemove(o.btnRemoveAll);
    if (o && o.template)
        t_.setTemplate(o.template);
    if (o && o.templateButton)
        t_.setTemplateButton(o.templateButton);
    if (o && typeof o.esclude === "string")
        t_.esclude = (o.esclude).split(',');
    if (o && typeof o.esclude === "object")
        t_.esclude = o.esclude;
    if (o && typeof o.action === "function")
        t_.after = o.action;
    if (o && typeof o.onInit === "function")
        t_.onInit = o.onInit;
    if (o && typeof o.onRemoveAll === "function")
        t_.onRemoveAll = o.onRemoveAll;
    if (o && typeof o.onRemove === "function")
        t_.onRemove = o.onRemove;
    if (o && typeof o.onSearch === "function")
        t_.onSearch = o.onSearch;
    if (o && typeof (o.offEvent) === "boolean")
        t_.offEvent = o.offEvent;
    if (o && typeof (o.offStorage) === "boolean")
        t_.offStorage = o.offStorage;

    t_.storage().getStorage();
    return t_.searchForm().search(true).includeEvent();
};
jShowsearch.prototype.searchForm = function () {
    var t__ = this;
    if (null !== t__.boxApp && typeof t__.boxApp !== "undefined" && t__.boxApp.tagName === "FORM")
        t__.form = t__.boxApp;
    else if (null !== t__.boxApp && typeof t__.boxApp !== "undefined" && t__.boxApp.tagName !== "FORM") {
        var x = t__.boxApp.querySelectorAll('*') || t__.boxApp.getElementsByTagName('*');
        for (var i in x) {
            switch (x[i].tagName) {
                case 'FORM':
                    t__.form = x[i];
                    break;
            }
        }
    } else
    {
        throw Error('jShowsearch searchForm:: the boxapp and form element is [ undefined ]')
    }
    return t__;
};
jShowsearch.prototype.setValue = function (o) {
    if (o && o.type) {
        var elemType = o.type.toUpperCase();
        switch (elemType) {
            case 'TEXT':
            case 'TEXTAREA':
            case 'PASSWORD':
            case 'EMAIL':
            case 'SEARCH':
            case 'NUMBER':
            case 'TIME':
            case 'DATE':
            case 'DATETIME':
            case 'DATETIME-LOCAL':
            case 'MONTH':
            case 'URL':
                return o.value || "";
            case 'CHECKBOX':
            case 'RADIO':
                if (o.labels && o.labels[0] && typeof o.labels[0].htmlFor!=="undefined" && o.labels[0].htmlFor === o.id 
                        || o.labels && o.labels[0] && typeof o.labels[0].htmlFor!=="undefined" && o.labels[0].htmlFor === o.name)
                {
                    return o.checked ? o.labels[0].innerText : "";
                }
                  if (o.previousElementSibling && o.previousElementSibling.tagName.toUpperCase()==="LABEL")
                {
                    return o.checked ? o.previousElementSibling.innerText : "";
                }
                if (o.nextElementSibling && o.nextElementSibling.tagName.toUpperCase()==="LABEL")
                {
                    return o.checked ? o.nextElementSibling.innerText : "";
                }
                if (o.parentElement && o.parentElement.tagName.toUpperCase()==="LABEL")
                {
                    return o.checked ? o.parentElement.innerText : "";
                }
                else 
                {
                    return o.checked ? o.value : "";
                }
            case 'SELECT':
            case 'SELECT-ONE':
                return o.options[o.selectedIndex].value ? o.options[o.selectedIndex].text : "";
            default :
                return "";
        }
    }

    return "undefined";
};
jShowsearch.prototype.search = function (b) {
    var t__ = this;
    t__.serialize = {};
    if (null !== t__.boxApp && typeof t__.boxApp !== "undefined") {
        var x = t__.boxApp.elements || t__.boxApp.querySelectorAll('*') || t__.boxApp.getElementsByTagName('*');
        for (var i in x) {
            switch (x[i].tagName) {
                case 'INPUT':
                case 'TEXTAREA':
                case 'SELECT':
                    if (x[i].id && x[i].type.toUpperCase() !== "HIDDEN") {
                        t__.elements[x[i].id] = {val: t__.setValue(x[i]), ob: x[i]};
                        t__.serialize[x[i].id] = t__.setObject(x[i]);
                        if (b)
                            t__.add(x[i]);
                    }

                    break;
                case 'DIV':
                case 'SPAN':
                case 'P':
                case 'PRE':
                case 'CITE':
                case 'CODE':
                case 'H1':
                case 'H2':
                case 'H3':
                case 'H4':
                case 'H5':
                case 'H6':
                case 'TD':
                    if (x[i].contentEditable && x[i].isContentEditable) {
                        t__.elements[x[i].id] = {val: x[i].innerHTML, ob: x[i]};
                        t__.serialize[x[i].id] = x[i].innerHTML;
                        if (b)
                            t__.add(x[i]);
                    }
                    break;
            }

        }


        return t__.write();
    } else
    {
        throw Error('jShowsearch search:: the boxapp element is [ undefined ]')
    }
    return t__;
};
jShowsearch.prototype.includeEvent = function () {
    var t__ = this;
    if (null !== t__.btnSearch && typeof t__.btnSearch !== "undefined") {

        Array.prototype.forEach.call(t__.btnSearch, function (el, i) {
            el.addEventListener('click', function () {
                t__.search(0).setUniqueSubmit("1").setStorage()
                        .onSearch.apply(t__, [t__.elements, t__.form]);
            }, false)
        });
    }
    if (null !== t__.btnRemove && typeof t__.btnRemove !== "undefined") {

        Array.prototype.forEach.call(t__.btnRemove, function (el, i) {
            el.addEventListener('click', function () {
                t__.removeAll().getStorage()
                        .onRemoveAll.apply(t__, [t__.elements, t__.form]);
            }, false)
        });
    }
    if (!this.offEvent && t__.inputs.length)
    {
        for (var i in t__.inputs)
            t__.inputs[i].addEventListener('change', function () {
                t__.search(0).setStorage();

            }, false);
    }

    if (t__.boxhome && t__.boxhome.querySelectorAll)
        t__.onInit.apply(t__, [t__.boxhome.querySelectorAll('[showsearch]').length, t__]);

    return t__;
};
jShowsearch.prototype.submit = function () {
    var t__ = this;
    if (t__.getUniqueSubmit() === "0") {
        t__.setUniqueSubmit("1");
        t__.form.submit();
    } else {
        t__.setUniqueSubmit("0");
    }

    return t__;
}
jShowsearch.prototype.clear = function () {
    var t__ = this;
    if (typeof t__.esclude !== "undefined") {
        for (var h in t__.elements)
        {
            for (var i in t__.esclude)
            {
                if (t__.esclude[i] === h)
                    delete t__.elements[h];
            }
        }
    }
};

jShowsearch.prototype.isVisible= function(e) {
   return !!( e.offsetWidth || e.offsetHeight || e.getClientRects().length );
 };
jShowsearch.prototype.isElementVisible= function(elem) {
            if (!(elem instanceof Element)) throw Error('jShowsearch:isElementVisible:: elem is not an element.');
            var style = getComputedStyle(elem);
            if (style.display === 'none') return false;
            if (style.visibility !== 'visible') return false;
            if (style.opacity < 0.1) return false;
             return true;
};
jShowsearch.prototype.dataLabel= function(ob) {
   
    if(typeof ob ==="undefined") return "";
    if(typeof ob.getAttribute('data-js-label')!=="undefined" && ob.getAttribute('data-js-label')!==null)
        return ob.getAttribute('data-js-label');
    else
    return "";
 };
jShowsearch.prototype.write = function () {
    var t__ = this;

    if (null !== t__.template && typeof t__.template !== "undefined") {
        t__.clear();

        var templ = t__.template;
        var inputs = [];

        for (var h in t__.elements)
        {

            if (t__.elements[h].val.trim() !== "") {
                inputs.push(String(templ).replace(/\=""/g, "").replace(/\{box}/g, "showsearch=\"" + h + "\"").replace(/\{label}/g, t__.dataLabel(t__.elements[h].ob)).replace(/\{val}/g, t__.elements[h].val).replace(/\{click}/g, "onclick=\"jShowsearch.removeBox('" + t__.name + "','" + h + "')\""))
            }
        }

        if (inputs.length && null !== t__.templateButton && typeof t__.templateButton !== "undefined")
        {
            var tButton = String(t__.templateButton).replace(/\=""/g, "").replace(/\{box}/g, "showsearch=\"removeAll\"").replace(/\{val}/g, "Rimuovi Filtri").replace(/\{click}/g, "onclick=\"jShowsearch.removeAll('" + t__.name + "')\"");
            if (null !== t__.boxButton && typeof t__.boxButton !== "undefined")
                t__.boxButton.innerHTML = tButton;
            else if (inputs.length > 1)
                inputs.push(tButton)

        }

        t__.boxhome.innerHTML = inputs.join("");

    } else
    {
        window.console.error("jShowsearch write:: the template element is [ undefined ]");

    }

    return t__;
};
jShowsearch.prototype.storage = function () {
    this._wd = window;
    this.baseHistory = {};
    this.setProperty = function (o, v) {
        if (o && o.tagName) {
            switch (o.tagName) {
                case 'INPUT':
                    var elemType = o.type.toUpperCase();
                    switch (elemType) {
                        case 'TEXT':
                        case 'PASSWORD':
                        case 'FILE':
                            o.value = v;
                            break;
                        case 'CHECKBOX':
                        case 'RADIO':
                            o.checked = v;
                            break;
                    }
                    break;
                case 'TEXTAREA':
                    o.value = v;
                    break;
                case 'SELECT':
                    for (var i = 0; i < o.options.length; i++) {
                        if (o.options[i].text == v) {
                            o.selectedIndex = i;
                            break;
                        }
                    }
                    break;
                case 'HTML':
                case 'BODY':
                case 'DIV':
                case 'SPAN':
                case 'P':
                case 'PRE':
                case 'BLOCKQUOTE':
                case 'CODE':
                case 'CITE':
                case 'H1':
                case 'H2':
                case 'H3':
                case 'H4':
                case 'H5':
                case 'H6':
                case 'TD':
                    if (o.innerHTML) {
                        o.innerHTML = v;
                    }
                    break;
            }

        }

    };

    this.setObject = function (o) {
        if (o && o.type) {
            var elemType = o.type.toUpperCase();
            switch (elemType) {
                case 'TEXT':
                case 'TEXTAREA':
                case 'PASSWORD':
                case 'EMAIL':
                case 'SEARCH':
                case 'NUMBER':
                case 'TIME':
                case 'DATE':
                case 'DATETIME':
                case 'DATETIME-LOCAL':
                case 'MONTH':
                case 'URL':
                    return o.value || "";

                case 'CHECKBOX':
                case 'RADIO':
                    return o.checked;

                case 'SELECT':
                case 'SELECT-ONE':
                    return o.options[o.selectedIndex].text;
                default :
                    return "";
            }
            return "undefined";

        }

    };

    this.setUniqueSubmit = function (a) {

        if ('localStorage' in window && window['localStorage'])
            localStorage.setItem('isform_', typeof a !== "undefined" ? a : "1");
        else {
            var obj = this.baseHistory['isform'] = a;
            this._wd.name = JSON.stringify(obj, "") || "";
        }
        return this;
    };
    this.getUniqueSubmit = function () {
        if ('localStorage' in window && window['localStorage'])
            return  localStorage.getItem('isform_');
        else {
            var obj = this._wd.eval('(' + this._wd.name + ')');
            return  obj && typeof obj['isform_'] !== "undefined" ? obj['isform_'] : "1";
        }
    };

    this.setHistory = function () {
        var a_ = JSON.stringify(this.baseHistory, "");
        if ('localStorage' in window && window['localStorage'])
            localStorage.setItem('history_', a_ || "");
        else
            this._wd.name = a_ || "";
    };
    this.getHistory = function () {
        if ('localStorage' in window && window['localStorage'])
            return String(localStorage.getItem('history_')).length > 5 ? this._wd.eval('(' + localStorage.getItem('history_') + ')') : {};
        else
            return String(this._wd.name).length > 5 ? this._wd.eval('(' + this._wd.name + ')') : {};
    };

    this.getStorage = function () {
        if (!this.offStorage) {
            this.baseHistory = this.getHistory();
            if (this.baseHistory[this.name] != null && this.baseHistory[this.name] != undefined) {
                var obj_ = this.baseHistory[this.name];
                for (var i in obj_) {
                    (function (x, o, f) {
                        f(document.getElementById(x), o[x]);
                    })(i, obj_, this.setProperty)
                }
            }
        }
        return this;
    };

    this.setStorage = function () {
        if (!this.offStorage) {
            this.baseHistory = this.getHistory();
            this.baseHistory[this.name] = this.serialize;
            this.setHistory();
        }
        return this;
    };
    return this;
};

jShowsearch.get = function (name, object) {
    var n, o;
    if (typeof (arguments[0]) === "object")
        o = arguments[0];
    else if (typeof (arguments[0]) === "string")
        n = arguments[0];
    if (typeof (arguments[1]) === "object")
        o = arguments[1];
    else if (typeof (arguments[1]) === "string")
        n = arguments[1];
    if (typeof (n) === "undefined")
        n = new Date().getTime();

    if (typeof (jShowsearch.istance[n]) === "undefined")
        jShowsearch.istance[n] = new jShowsearch(n, o);
    return jShowsearch.istance[n];
}
