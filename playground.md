# Playground


<script type="module">

    import { createApp } from 'https://unpkg.com/petite-vue?module'  
      import prettier from "https://unpkg.com/prettier@2.8.1/esm/standalone.mjs";
     import parserBabel from "https://unpkg.com/prettier@2.8.1/esm/parser-babel.mjs";
    import { useId } from  'https://unpkg.com/bemm'

    createApp({

        block: 'block',

        get bemm() {
            const bemm = useBemm(block);
        },

        get code(){

            return `
                const bemm = useBemm('${this.block}');
                bemm();
            `
        }



    }).mount()

</script>

<!-- v-scope value can be omitted -->
<div v-scope>
    <pre><code>{{code}}</code></pre>
    <hr/>
    <div class="input">
        <label>Block</label>
        <input v-model="customAlphabet" />
    </div>
    <div class="input">
        <label>Element</label>
        <input type="text" v-model="element" />
    </div>
   <div class="input">
        <label>modifier</label>
        <input type="text" v-model="modifier" />
    </div>
</div>
