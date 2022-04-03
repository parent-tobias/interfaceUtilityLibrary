import Interface from './lib/interface.js';
const composite = Interface('Composite')('add','remove','getChild')
const FormItem = Interface('FormItem')('save');

const compositeForm = (id, method, action)=>{

  return{
    add: ()=>{},
    remove: ()=>{},
    getChild: ()=>{},
    save: ()=>console.log('save')
  }
}

console.log(Interface.ensureImplements(compositeForm(), composite, FormItem) );