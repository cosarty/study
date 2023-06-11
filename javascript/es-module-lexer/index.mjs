import {init,parse} from 'es-module-lexer'



(async () => {
  await init 
  const source = `
  import { name } from 'mod\\u1011';
  import json from './json.json' assert { type: 'json' }
  export var p = 5;
  export function q () {

  };
  export { x as 'external name' } from 'external';

  // Comments provided to demonstrate edge cases
  import /*comment!*/ (  'asdf', { assert: { type: 'json' }});
  import /*comment!*/.meta.asdf;
  `;
  const [imports,exports] = parse(source)
  console.log('imports: ', imports);
  // console.log('imports: ', imports);
  console.log('exports: ', exports);
  

})()