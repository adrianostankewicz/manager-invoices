import { describe, expect, test } from '@jest/globals';

describe('teste', () =>{
  test('it should be ok', () => {
    const name = 'Adriano';
  
    expect(name).toEqual('Adriano');
  });
});
