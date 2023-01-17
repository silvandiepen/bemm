---
projectStyle: /assets/custom.css
---

# Playground

<script type="module" src="https://unpkg.com/@sil/ui"></script>
<script type="module">
    import { createApp, reactive } from 'https://unpkg.com/petite-vue?module'  
    import prettier from "https://unpkg.com/prettier@2.8.1/esm/standalone.mjs";
    import parserBabel from "https://unpkg.com/prettier@2.8.1/esm/parser-babel.mjs";
    import { useBemm, generateBemm } from  'https://unpkg.com/bemm@1.0.4/dist/module/index.mjs'
    
    const state = reactive({
        block: 'block',
        element: 'element',
        modifier: 'modifier',
        settings: {
            kebabCase: true,
            return: "auto",
            prefix: {
                element: "__",
                modifier: "--"
            }
        }
    })

    const toValue = (input) => {          
        if(input){
            if(typeof input == "string"){
                return `"${input}"`;
           } else {
                if(input.length == 1){
                    return `"${input[0]}"`;
                }    
                return `[${input.map((m)=>`"${m}"`).join(',')}]`;
            }
        } else {
            return null;
        }
    }

    const cleanUp = (input, auto=false) => {
        const str = input ? input.replaceAll(' ',',').split(',').filter((v)=>v!==undefined || v !== null || v !== "") : [];
        return auto ? toStringIfNeeded(str) : str;
   }

    const toStringIfNeeded = (input)=>{
        if(input.length == 0) return '';
        if(input.length == 1){ return input[0] } else return input;
    }

    const toElement = (input)=>{
        return input.replaceAll(' ','');
    }

    createApp({
        state,
        get blocks(){
            return cleanUp(state.block);
        },
        get elements(){
            return cleanUp(state.element);
        },
        get modifiers(){
            return cleanUp(state.modifier)
        },
        get code(){

            const elms = toValue(toElement(state.element))
            const mods = toValue(cleanUp(state.modifier));
            const block = toValue(cleanUp(state.block));

            const init = `const bemm = useBemm(${block})`;

            const defaultSettings = {
                kebabCase: true,
                return: "auto"
            }

            let code = ``;

            if(state.element && state.modifier){
                code = `${init} 
                bemm(${elms}, ${mods});`
            } else if(state.element){
                code =  `${init} 
                bemm(${elms});`
            } else if(state.modifier){
                code =  `${init} 
                bemm('', ${mods});`
            } else {
               code =  `${init} 
               bemm();`
            }

            return prettier.format(code,{
                parser: "babel",
                plugins: [parserBabel],
            })
        },
        get result(){

            let value = null;

            
            const bemm = useBemm(cleanUp(state.block, true), state.settings);          
            const elms = toElement(state.element);
            const mods = cleanUp(state.modifier);

            if (elms.length && mods.length) {
                return bemm(toStringIfNeeded(elms), mods, state.settings);
            } else if(elms.length) {
                return bemm(toStringIfNeeded(elms),'', state.settings);
            } else if(mods.length){
                return bemm('', mods, state.settings);
            } else {
                return bemm('','', state.settings);
            }
            return value;
       }
    }).mount()

</script>

<div v-scope>
    <h4>Code</h4>
    <pre><code>{{code}}</code></pre>
    <br>
    <h4>Result</h4>
    <pre><code>{{result}}</code></pre>
    <br>    <br>    <br>
    <div class="row">
    <sil-checkbox label="test"></sil-checkbox>
        <div class="column">
            <h4>Input</h4>
            <br>
            <div class="input">
                <label>Block</label>
                <input type="text" v-model="state.block" />
            </div>
            <ul v-if="blocks.length > 1"><li v-for="block in blocks">{{block}}</li></ul>
            <div class="input">
                <label>Element</label>
                <input type="text" v-model="state.element" />
            </div>
            <div class="input">
                <label>modifier</label>
                <input type="text" v-model="state.modifier" />
            </div>
            <ul v-if="modifiers.length > 1"><li v-for="mod in modifiers">{{mod}}</li></ul>
        </div>
        <div class="column">
            <h4>Settings</h4>
            <br>
            <div class="input input--checkbox">
                <label for="kebab">toKebabCase</label>
                <input name="kebab" id="kebab" type="checkbox" v-model="state.settings.kebabCase" />
            </div>
            <div class="input">
                <label>Return</label>
                <select v-model="state.settings.return">
                    <option value="array">Array</option>
                    <option value="string">String</option>
                    <option value="auto">Auto</option>
                </select>
            </div>
            <div class="input">
                <label>prefix Element</label>
                <input type="text" v-model="state.settings.prefix.element" />
            </div>
            <div class="input">
                <label>prefix Modifier</label>
                <input type="text" v-model="state.settings.prefix.modifier" />
            </div>
        </div>
    </div>
</div>
