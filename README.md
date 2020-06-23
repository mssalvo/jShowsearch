# jShowsearch
jShowsearch, Evidenzia il valore editato, selezionato nei campi di ricerca form, o da una determinata area html!

# Getting Started

1. Includi jShowsearch sulla tua pagina prima della chiusura tag </body> 
```html
<script src="/path/dist/core/jshowsearch.js"></script>
```

* ## [Demo jShowsearch](https://mssalvo.github.io/jShowsearch/)

### Started

```js
jShowsearch.get('myIstanceName', {
                app: '#formId',
                boxhome: '#boxResult',
                template: '<button {box} type="button" {click} class="btn btn-default"> {val} <span>&times;</span></button>'
            })
```

## Object Control

Proprieta | Type | - | Descrizione  
------- | ------- | ------- | -------
**app** |ID ELEMENTO / OBJECT HTML | OBBLIGATORIO | indicare l'elemento <form> o il <div> contenete gli elementi
**boxhome**   |ID ELEMENTO / OBJECT HTML | OBBLIGATORIO | indicare l'elemento html dove includere gli elementi creati
**template**  |STRING HTML / ID ELEMENTO / OBJECT HTML | OBBLIGATORIO | indicare l'elemento html o la stringa che descrive la struttura html del template	
**btnSearch** |ID ELEMENTO / OBJECT HTML | FACOLTATIVO | indicare il button per aggiornare il contenuto visualizzato
**btnRemoveAll** |ID ELEMENTO / OBJECT HTML | FACOLTATIVO | indicare il button per rimuovere i filtri nel contenuto visualizzato
**boxButton** |ID ELEMENTO / OBJECT HTML | FACOLTATIVO | indicare l'elemento html dove includere in pulsante rimuovi tutti filtri, se non indicato ed e' presente un templateButton, questo verra' incluso come ultimo elemento nel boxhome.
**templateButton** |STRING HTML / ID ELEMENTO / OBJECT HTML | FACOLTATIVO  | indicare l'elemento html o la stringa che descrive la struttura html del button rimuvi tutti
**esclude** 	|STRING / ARRAY  | FACOLTATIVO | esclude dalla lista degli elementi gli elementi indicati dall'id, gli elementi esclusi non verranno processati
**offEvent**  |BOOLEAN TRUE/FALSE | FACOLTATIVO | (false)abilita / (true)disabilita gli eventi sui campi del form     
**offStorage** |BOOLEAN TRUE/FALSE | FACOLTATIVO | (false)abilita / (true)disabilita memorizzazione dei dati                                            
**onInit**	|FUNCTION | FACOLTATIVO | Esegue la funzione 1 sola volta alla fine della creazione
**onRemove**	|FUNCTION | FACOLTATIVO | Esegue la funzione su ogni elemento con marcatore `{click}` 
**onRemoveAll**	|FUNCTION | FACOLTATIVO | Esegue la funzione sul pulsante indicato ` btnRemoveAll `
**onSearch**	|FUNCTION | FACOLTATIVO | Esegue la funzione sul pulsante indicato ` btnSearch `




## Esempio

```js

           jShowsearch.get('myIstanceName', {
                app: '#boxHome',
                btnSearch:'#btnSearch',
                btnRemoveAll:'#btnRemove',
                boxhome: '#boxResult',
               // boxButton: '#button01',
                template: '#template01',
                templateButton:'<button {box} type="button" class="btn btn-danger" {click} aria-label="Close" style="margin:5px 0px 0px 8px;border-radius: 5px;color:#ffffff">Rimuovi Filtri &nbsp;<span>&times;</span></button>',
                esclude: ['702','id234'],
                offEvent:false,
                offStorage:false,
                onInit: function (bol,list,form) {  
                   // this.submit(); 
                },
                onRemove: function (id,obj,form) {
                //alert(this.form.id)
                 alert('id element: '+id)
                },
                onRemoveAll: function (list,form) {  
                   var arry=[];
                 for(i in this.inputs)
                  arry.push({id:this.inputs[i].id,tagType:this.inputs[i].type})
                   
                 alert(JSON.stringify(arry)) 
             
                },
                onSearch: function (list,form) { 
                    this.submit();  
                    alert('id form: '+this.form.id) 
                }
            })

```
## Esempio dichiarazione template
 Importante il template indicato sia di tipo html o stringa deve contenere i seguenti marcatori **{box} , {label} , {val} , {click}**
 ```
    {box}  > va inserito sull'elemento principale della struttura html
    {label} > va inserito dove deve comparire la label decrittiva se presente l'attribute [ data-js-label ]
    {val}   > va inserito dove deve comparire it testo descrittivo
    {click} > va inserito sull'elemento che deve eseguire l'azione
  ```
 ##
 
```html

 <template id="template01">
         <button {box} type="button" {click} class="btn btn-default" style="background-color: #0452a5;margin-left:8px;color:#ffffff"> <span>{label}</span> {val}
	<span aria-hidden="true">&times;</span>&nbsp;
        </button>  
</template>

```

 ## Esempio dichiarazione templateButton
Importante il templateButton indicato sia di tipo html o stringa deve contenere  i seguenti marcatori **{box} , {val} , {click}**  
```      
  {box}   > va inserito sull'elemento principale della struttura html
  {val}   > va inserito dove deve comparire it testo descrittivo
  {click} > va inserito sull'elemento che deve eseguire l'azione              
  ```
 ```html
  <button {box} type="button" class="close" {click} aria-label="Close">Rimuovi Filtri <span aria-hidden="true">&times;</span></button>
```


 ## License

jShowsearch è disponibile sotto la licenza MIT. Vedi il [LICENSE](https://github.com/mssalvo/jShowsearch/blob/master/LICENSE) per maggiori informazioni.

