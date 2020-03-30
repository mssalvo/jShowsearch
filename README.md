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
                form: '#formId',
                boxhome: '#boxResult',
                template: '<button {box} type="button" {click} class="btn btn-default"> {val} <span>&times;</span></button>'
            })
```

## Object Control

Proprieta | Type | - | Descrizione  
------- | ------- | ------- | -------
**form** |ID ELEMENTO / OBJECT HTML | OBBLIGATORIO | indicare l'elemento <form> o il <div> contenete gli elementi
**boxhome**   |ID ELEMENTO / OBJECT HTML | OBBLIGATORIO | indicare l'elemento html dove includere gli elementi creati
**template**  |STRING HTML / ID ELEMENTO / OBJECT HTML | OBBLIGATORIO | indicare l'elemento html o la stringa che descrive la struttura html del template	
**btnUpdate** |ID ELEMENTO / OBJECT HTML | FACOLTATIVO | indicare il button per aggiornare il contenuto visualizzato
**btnRemove** |ID ELEMENTO / OBJECT HTML | FACOLTATIVO | indicare il button per rimuovere i filtri nel contenuto visualizzato
**boxButton** |ID ELEMENTO / OBJECT HTML | FACOLTATIVO | indicare l'elemento html dove includere in pulsante rimuovi tutti filtri, se non indicato ed e' presente un templateButton, questo verra' incluso come ultimo elemento nel boxhome.
**templateButton** |STRING HTML / ID ELEMENTO / OBJECT HTML | FACOLTATIVO  | indicare l'elemento html o la stringa che descrive la struttura html del button rimuvi tutti
**esclude** 	|STRING / ARRAY  | FACOLTATIVO | esclude dalla lista degli elementi gli elementi indicati dall'id, gli elementi esclusi non verranno processati
**offEvent**  |BOOLEAN TRUE/FALSE | FACOLTATIVO | (false)abilita / (true)disabilita gli eventi sui campi del form 
**click** |FUNCTION | FACOLTATIVO | Esegue la funzione su ogni elemento con marcatore {click}  alla funzione nel costruttore viene iniettato l'id dell'elemento, l'elemeto, ed il form 



## Esempio

```js

jShowsearch.get('myIstanceName', {
                form: '#boxHome',
                btnUpdate:'#btnSearch',
                btnRemove:'#btnRemove',
                boxhome: '#boxResult',
               // boxButton: '#button01',
                template: '#template01',
                templateButton:'<button {box} type="button" class="btn btn-danger" {click} aria-label="Close" style="margin-left:10px;color:#ffffff">Rimuovi Filtri <span aria-hidden="true">&times;</span></button>',
                esclude: ['702','id234'],
                offEvent:false,
                click: function (id,obs,form) {
                    alert(id)
                    
                     //form.submit();
                }
            })

```
## Esempio dichiarazione template
 Importante il template indicato sia di tipo html o stringa deve contenere i seguenti marcatori **{box} , {val} , {click}**
 ```
    {box}  > va inserito sull'elemento principale della struttura html
    {val}   > va inserito dove deve comparire it testo descrittivo
    {click} > va inserito sull'elemento che deve eseguire l'azione
  ```
 ##
 
```html

 <template id="template01">
         <button {box} type="button" {click} class="btn btn-default" style="background-color: #0452a5;margin-left:8px;color:#ffffff">  {val}
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

