/*!
 * jShowsearch v1.0.0 ©
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
 *              form: '#myform', 
 *              btnUpdate:'#btnAggiorna01',
 *              btnRemove:'#btnRimuovi01',
 *              boxhome: '#home01',
 *              boxButton: '#button01',
 *              template: '#template01',
 *              templateButton:'<button {box} type="button" class="close" {click} aria-label="Close">Rimuovi Filtri <span aria-hidden="true">&times;</span></button>',
 *              esclude: ['id_element_1','id_element_2'],
 *              offEvent:false,
 *              click: function (id,ob,form) {
 *                  alert(id)
 *                    
 *                   form.submit();
 *              }
 *          })
 *          
 *  @Object Control
 *  @Parameter
 *  {
 *     form:            |ID ELEMENTO | OBJECT HTML | OBBLIGATORIO | indicare l'elemento <form> o il <div> contenete gli elementi
 *     btnUpdate:       |ID ELEMENTO | OBJECT HTML | FACOLTATIVO | indicare il button per aggiornare il contenuto visualizzato
 *     btnRemove:       |ID ELEMENTO | OBJECT HTML | FACOLTATIVO | indicare il button per rimuovere i filtri nel contenuto visualizzato
 *     boxhome:         |ID ELEMENTO | OBJECT HTML | OBBLIGATORIO | indicare l'elemento html dove includere gli elementi creati
 *     boxButton:       |ID ELEMENTO | OBJECT HTML | FACOLTATIVO | indicare l'elemento html dove includere in pulsante rimuovi tutti filtri, 
 *                                                                 se non indicato ed e' presente un templateButton, questo verra' incluso come ultimo elemento nel boxhome.
 *     template:        |STRING HTML | ID ELEMENTO | OBJECT HTML | OBBLIGATORIO | indicare l'elemento html o la stringa che descrive la struttura html del template
 *     templateButton:  |STRING HTML | ID ELEMENTO | OBJECT HTML | FACOLTATIVO  | indicare l'elemento html o la stringa che descrive la struttura html del button rimuvi tutti
 *     esclude:         |STRING    | ARRAY  | FACOLTATIVO | esclude dalla lista degli elementi, gli elementi indicati con il valore id (nota:valore senza cancelletto[#]), 
 *                                                          gli elementi esclusi non verranno processati
 *     offEvent:        |BOOLEAN TRUE/FALSE | FACOLTATIVO | (false)abilita / (true)disabilita gli eventi sui campi del form                                            
 *     click:           |FUNCTION | FACOLTATIVO | Esegue la funzione su ogni elemento con marcatore {click} 
 *                                                alla funzione nel costruttore viene iniettato l'id dell'elemento, l'elemeto, ed il form  
 *
 *  }
 *  
 *  
 *  @example Dichiarazione template
 *  @Importante il template indicato sia di tipo html o stringa deve contenere
 *              i seguenti marcatori {box} , {val} , {click}
 *     {box}   > va inserito sull'elemento principale della struttura html
 *     {val}   > va inserito dove deve comparire it testo descrittivo
 *     {click} > va inserito sull'elemento che deve eseguire l'azione
 *     
 *  	<template id="template01">
 *	<div {box} class="col alert alert-primary alert-dismissible fade show" role="alert">
 *		<strong> {val} </strong>
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
    this.boxform = undefined;
    this.btnUpdate = undefined;
    this.btnRemove = undefined;
    this.boxhome = undefined;
    this.boxButton = undefined;
    this.template = undefined;
    this.templateButton = undefined;
    this.after = function () {};
    this.esclude = undefined;
    this.isdelete = false;
    this.offEvent = false;
    this.elements = {};
    this.init(o || {});
}
;
jShowsearch.istance = {};
jShowsearch.onclick = function (name, id) {
    jShowsearch.istance[name].clearBox(id).after(id, jShowsearch.istance[name].elements[id].ob, jShowsearch.istance[name].boxform);
};

jShowsearch.removeAll = function (name) {
    jShowsearch.istance[name].clearAllBox().after('removeAll', jShowsearch.istance[name].elements, jShowsearch.istance[name].boxform);
};
jShowsearch.prototype.clearAllBox = function () {
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
        Array.prototype.forEach.call(t__.boxhome.querySelectorAll('[jShowsearch]'), function (el, i) {
            el.parentNode.removeChild(el);
        });

    if (null !== t__.boxButton && typeof t__.boxButton !== "undefined")
        t__.boxButton.innerHTML = "";

    return t__;
};
jShowsearch.prototype.clearBox = function (id) {
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
        Array.prototype.forEach.call(t__.boxhome.querySelectorAll('[jShowsearch]'), function (el, i) {
            if (el.getAttribute('jShowsearch') === id)
                el.parentNode.removeChild(el);
        });

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
        window.console.warn("jShowsearch add:: impossibile addizionare l'elemento[ " + el + " ]");
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
        window.console.warn("jShowsearch setTemplate:: impossibile settare l'elemento template[ " + el + " ]");

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
        window.console.warn("jShowsearch setTemplateButton:: impossibile settare l'elemento templateButton[ " + el + " ]");

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
        window.console.warn("jShowsearch setBoxHome:: impossibile settare l'elemento boxhome[ " + el + " ]");

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
        window.console.warn("jShowsearch setBoxButton:: impossibile settare l'elemento boxButton[ " + el + " ]");

    return t__;
};
jShowsearch.prototype.setBtnUpdate = function (el) {
    var t__ = this;
    if (typeof el === "string" && el !== "undefined" && !/^<(\w*)\s*\/?(?:.* <\/\1>|)/.test(el))
        t__.btnUpdate = document.getElementById(el) || document.querySelector(el);
    else if (null !== el && typeof el === "object" && typeof el.jquery === "undefined")
        t__.btnUpdate = el;
    else if (null !== el && typeof el === "object" && typeof el.jquery === "string")
        t__.btnUpdate = el.get(0);
    else
        window.console.warn("jShowsearch setBtnUpdate:: impossibile settare l'elemento btnUpdate[ " + el + " ]");

    return t__;
};
 
jShowsearch.prototype.setBtnRemove = function (el) {
    var t__ = this;
    if (typeof el === "string" && el !== "undefined" && !/^<(\w*)\s*\/?(?:.* <\/\1>|)/.test(el))
        t__.btnRemove = document.getElementById(el) || document.querySelector(el);
    else if (null !== el && typeof el === "object" && typeof el.jquery === "undefined")
        t__.btnRemove = el;
    else if (null !== el && typeof el === "object" && typeof el.jquery === "string")
        t__.btnRemove = el.get(0);
    else
        window.console.warn("jShowsearch setBtnRemove:: impossibile settare l'elemento btnRemove[ " + el + " ]");

    return t__;
};


jShowsearch.prototype.form = function (el) {
    var t__ = this;
    if (typeof el === "string" && el !== "undefined" && !/^<(\w*)\s*\/?(?:.* <\/\1>|)/.test(el))
        t__.boxform = document.getElementById(el) || document.querySelector(el);
    else if (null !== el && typeof el === "object" && typeof el.jquery === "undefined")
        t__.boxform = el;
    else if (null !== el && typeof el === "object" && typeof el.jquery === "string")
        t__.boxform = el.get(0);
    else
        window.console.warn("jShowsearch form:: impossibile settare l'elemento form[ " + el + " ]");

    return t__;
};
jShowsearch.prototype.init = function (o) {
    var t_ = this;
    if (o && o.form)
        t_.form(o.form);
    if (o && o.boxhome)
        t_.setBoxHome(o.boxhome);
    if (o && o.boxButton)
        t_.setBoxButton(o.boxButton);
    if (o && o.btnUpdate)
        t_.setBtnUpdate(o.btnUpdate);
    if (o && o.btnRemove)
        t_.setBtnRemove(o.btnRemove);
    if (o && o.template)
        t_.setTemplate(o.template);
    if (o && o.templateButton)
        t_.setTemplateButton(o.templateButton);
    if (o && typeof o.esclude === "string")
        t_.esclude = (o.esclude).split(',');
    if (o && typeof o.esclude === "object")
        t_.esclude = o.esclude;
    if (o && typeof o.click === "function")
        t_.after = o.click;
    
        
    return t_.search(true).includeEvent();
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
                if (o.parentElement.htmlFor && o.parentElement.htmlFor === o.id || o.parentElement.htmlFor === o.name)  
                {
                    return o.checked ? o.parentElement.innerText : "";
                } else
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
    if (null !== t__.boxform && typeof t__.boxform !== "undefined" &&
            typeof t__.boxform.elements !== "undefined") {
        var x = t__.boxform.elements;
        for (var i in x) {
            switch (x[i].tagName) {
                case 'INPUT':
                case 'TEXTAREA':
                case 'SELECT':
                    if (x[i].id) {
                        t__.elements[x[i].id] = {val: t__.setValue(x[i]), ob: x[i]};
                        if(b)
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
                       if(b)
                        t__.add(x[i]);
                    }
                    break;
            }

        }

        return t__.write();
    } else
    {
        window.console.error("jShowsearch search:: l'elemento boxform risulta [ undefined ]");

        return t__;
    }

};
jShowsearch.prototype.includeEvent = function () {
    var t__ = this;
    if (null!==t__.btnUpdate && typeof t__.btnUpdate !== "undefined") {
          t__.btnUpdate.addEventListener('click', function () {
                t__.search(0);
            }, false);
        
    }
    if (null!==t__.btnRemove && typeof t__.btnRemove !== "undefined") {
        
          t__.btnRemove.addEventListener('click', function () {
                t__.clearAllBox();
            }, false);
    }
    
    if(!this.offEvent && t__.inputs.length)
    {
      for(var i in t__.inputs)  
      t__.inputs[i].addEventListener('change', function () {
                t__.search(0);
            }, false);  
    }
    
    
    return t__;
};
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

jShowsearch.prototype.write = function () {
    var t__ = this;

    if (null !== t__.template && typeof t__.template !== "undefined") {
        t__.clear();

        var templ = t__.template;
        var inputs = [];

        for (var h in t__.elements)
        {

            if (t__.elements[h].val.trim() !== "")
                inputs.push(String(templ).replace("{box}", "jShowsearch='" + h + "'").replace("{val}", t__.elements[h].val).replace("{click}", "onclick=jShowsearch.onclick('" + t__.name + "','" + h + "')"))

        }

        if (inputs.length && null !== t__.templateButton && typeof t__.templateButton !== "undefined")
        {
            var tButton = String(t__.templateButton).replace("{box}", "jShowsearch='removeAll'").replace("{val}", "Rimuovi Filtri").replace("{click}", "onclick=jShowsearch.removeAll('" + t__.name + "')");
            if (null !== t__.boxButton && typeof t__.boxButton !== "undefined")
                t__.boxButton.innerHTML = tButton;
            else
                inputs.push(tButton)

        }

        t__.boxhome.innerHTML = inputs.join('');

    } else
    {
        window.console.error("jShowsearch write:: l'elemento template risulta [ undefined ]");

    }

    return t__;
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
};
