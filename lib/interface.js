/***
 *
 * Natively, javascript doesn't implement an
 * interface mechanism. We *can*, and it might be
 * useful.
 *
 ***/

const Interface = (interfaceName)=>
  (...fns)=> {
    if(!interfaceName || !fns.length){
      throw new Error("Interface requires a name, and any number of method names.")
    } else if(!fns.every(fn=>typeof(fn))==='string'){
      throw new Error(`Interface ${interfaceName} requires all method names be passed as strings.`)
    }

    return Object.freeze({
      name: interfaceName,
      get methods(){return [...fns]}
    })
  }

Interface.ensureImplements = (implementor, ...interfaces) =>{
  if(!implementor || !interfaces.length){
    throw new Error(`Interface.ensureImplements requires an implementor, and one or more interfaces`)
  } else if(!interfaces.every(implementee=>
    implementee.hasOwnProperty('name') &&implementee.hasOwnProperty('methods'))) {
    throw new Error(`All interfaces should be instances of Interface. Error in ${implementee.name}.`)
  }
  interfaces.forEach(implementee=>{
    implementee.methods.forEach(methodName=>{
      if(!(implementor[methodName] && typeof(implementor[methodName]==='function')) ){
         throw new Error(`Interface.ensureImplements: Object ${implementor.name} does not implement the ${implementee.name} interface. Method ${methodName} not found.`)
      }
    })
  })
  // all checks ok
  return true;
}

export default Interface;
