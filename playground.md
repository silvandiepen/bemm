---
projectStyle: /assets/custom.css
---

# Playground

<style>

pre{
    border: 1px solid currentColor;
    padding: 1em; 
    border-radius: 0.5em;
}
.input{
    display: flex; align-items: center; justify-content: space-between;
}
.input input,
.input select{
    width: 50%;
    padding: 1em;
    border: 1px solid currentColor;
    border-radius: 0.5em;
    margin: 0;
}

</style>

<script type="module">

    import { createApp, reactive } from 'https://unpkg.com/petite-vue?module'  
    import prettier from "https://unpkg.com/prettier@2.8.1/esm/standalone.mjs";
    import parserBabel from "https://unpkg.com/prettier@2.8.1/esm/parser-babel.mjs";
    import { useBemm, generateBemm } from  'https://unpkg.com/bemm@1.0.2/dist/module/index.mjs'


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

    const cleanUp = (input) => {
        return input ? input.replaceAll(' ',',').split(',').filter((v)=>v!==undefined || v !== null || v !== "") : [];
    }

    const toStringIfNeeded = (input) => {
        if(input.length == 0) return '';
        if(input.length == 1){ return input[0] } else return input;
    }

    const toElement = (input) => {
        return input.replaceAll(' ','');
    }

    createApp({
        state,
        get elements(){
            return cleanUp(state.element);
        },
        get modifiers(){
            return cleanUp(state.modifier)
        },
        get code(){

            const elms = toValue(toElement(state.element))
            const mods = toValue(cleanUp(state.modifier));

            let init = `const bemm = useBemm('${state.block}')`;

            const defaultSettings = {
                kebabCase: true,
                return: "auto",
                prefix: {
                    element: "__",
                    modifier: "--"
                }
            }

            if(JSON.stringify(defaultSettings) !== JSON.stringify(state.settings)){
                let customSettings = [];
                let customPrefix = [];
                
                if(defaultSettings.kebabCase !== state.settings.kebabCase){
                    customSettings.push(`kebabCase: ${state.settings.kebabCase}`);
                }
                if(defaultSettings.return !== state.settings.return){
                    customSettings.push(`return: "${state.settings.return}"`);
                }
                if(defaultSettings.prefix.element !== state.settings.prefix.element){
                    customPrefix.push(`element: "${state.settings.prefix.element}"`);
                }
                if(defaultSettings.prefix.modifier !== state.settings.prefix.modifier){                        
                    customPrefix.push(`element: "${state.settings.prefix.modifier}"`);
                }
               
               init = `const bemm = useBemm('${state.block}',{
                    ${customSettings.length ? customSettings.join(',') : ``}
                    ${customSettings.length && customPrefix.length ? `,` : ``}
                    ${customPrefix.length ? `prefix: { ${customPrefix.join(',')} }` : ``}
                })`
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
// return code;

            return prettier.format(code,{
                parser: "babel",
                plugins: [parserBabel],
            })
        },
        get result(){

            let value = null;
            
            const bemm = useBemm(state.block, state.settings);          
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
        <div class="column">
            <h4>Input</h4>
            <br>
            <div class="input">
                <label>Block</label>
                <input type="text" v-model="state.block" />
            </div>
            <div class="input">
                <label>Element</label>
                <input type="text" v-model="state.element" />
            </div>
            <div class="input">
                <label>modifier</label>
                <input type="text" v-model="state.modifier" />
            </div>
            <template v-if="modifiers.length > 1">
            <ul><li v-for="mod in modifiers">{{mod}}</li></ul>
            </template>
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
