# jShowsearch
jShowsearch
# Getting Started

1. Includi jShowsearch sulla tua pagina prima della chiusura tag </body> 
```html
<script src="/path/dist/core/jshowsearch.js"></script>
```

* ## [Demo jShowsearch](https://mssalvo.github.io/jShowsearch/)


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
 

```html

 <template id="template01">
         <button {box} type="button" {click} class="btn btn-default" style="background-color: #0452a5;margin-left:8px;color:#ffffff">{val}
	<span aria-hidden="true">&times;</span>&nbsp;
        </button>  
</template>

```

 ## License

jShowsearch è disponibile sotto la licenza MIT. Vedi il [LICENSE](https://github.com/mssalvo/jShowsearch/blob/master/LICENSE) per maggiori informazioni.

