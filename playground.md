---
projectStyle: /assets/custom.css
---

# Playground

<style>


.pg-container{
    display: none; 
}
.loader{
    text-align: center; padding: 4vw;
    display: flex; align-items: center; justify-content: center;
    animation: loaderr 3s infinite;
}
.loader::after{
    content: "";
    animation: dotss 3s infinite;
}
@keyframes loaderr {
    0%,100%{
        opacity: 0.25;
    }
    50%{
        opacity: 0.75;
    }
}
@keyframes dotss{
    0%{
        content: "."
    }
    25%{
        content: ".."
    }
    50%{
        content: "..."
    }
    75%{
        content: ".."
    }
}

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
small{
    opacity: .5;
    font-size: .8em;
    line-height: 1.5;
    display: block; 
}

</style>

<script type="module">


    setTimeout(()=>{
        app.mount()
    },1000);

    import { createApp, reactive } from 'https://unpkg.com/petite-vue?module'  
    import prettier from "https://unpkg.com/prettier@2.8.1/esm/standalone.mjs";
    import parserBabel from "https://unpkg.com/prettier@2.8.1/esm/parser-babel.mjs";
    import { useBemm, generateBemm } from  'https://unpkg.com/bemm@1.0.2/dist/module/index.mjs'


    const state = reactive({
        block: 'Block',
        element: 'Element',
        modifier: 'Modifier',
        settings: {
            kebabCase: true,
            return: "auto",
            prefix: {
                element: "__",
                modifier: "--"
            }
        },
        loaded: false
    })

    const toValue = (input) => {          
        if(input){
            if(isString(input)){
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

    const app = createApp({
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

            state.loaded = true;

            return prettier.format(code,{
                parser: "babel",
                plugins: [parserBabel],
            })
        },
        get result(){

            const bemm = useBemm(state.block, state.settings);
            const elms = toElement(state.element);
            const mods = cleanUp(state.modifier);



            if (elms.length && mods.length) {
                return bemm(toStringIfNeeded(elms), mods);
            } else if(elms.length) {
                return bemm(toStringIfNeeded(elms));
            } else if(mods.length){
                return bemm('', mods);
            } else {
                return bemm();
            }
       }
    });
</script>

<div v-scope>
    <div class="pg-container" :style="state.loaded ? `display: block`:  ``">
        <h4>Code</h4>
        <pre><code>{{code}}</code></pre>
        <br>
        <h4>Result</h4>
        <pre><code>{{result}}</code></pre>
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
                <small>The toKebabCase option is enabled by default in the classNames utility function. This option converts all strings to kebab case, ensuring that the resulting classes are always lowercase and don't have spaces. If you prefer to use a different naming convention, you can turn off this option and use your own naming scheme.</small>
                <div class="input">
                    <label>Return</label>
                    <select v-model="state.settings.return">
                        <option value="array">Array</option>
                        <option value="string">String</option>
                        <option value="auto">Auto</option>
                    </select>
                </div>
                <small>By default, the classNames utility function returns a string when there is only one class and an array of strings when there are multiple classes. While this behavior is suitable for some libraries, it may not work for all. For example, React always expects a string, so you would need to explicitly define the return value as a string to ensure consistent behavior.</small>
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
    <div class="loader" v-if="!state.loaded">
        <p>Loading playground</p>
    </div>
</div>
