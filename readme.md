Example Output:

```
Dataset:  {
  products: [
    {
      name: 'Max Clean',
      category: 'Toothbrush',
      brand: 'Nike',
      color: 'Red',
      price: 18.5,
      quantity: 15
    },
    {
      name: 'Big comfort',
      category: 'Swimming Trunks',
      brand: 'Adidas',
      color: 'Brown',
      price: 11,
      quantity: 2
    }
  ],
  address: {
    country: 'America',
    state: 'WA',
    number: 15,
    street: 'Maple Avenue'
  },
  name: { firstName: 'Bob', lastName: 'Jones' }
}
Ruleset to Check:  {
  orRules: [ { path: 'products[*].brand', values: [ 'Nike' ] } ],
  andRules: [ { path: 'name.firstName', values: [ 'Bob' ] } ]
}
Is Filtered:  true 

Ruleset to Check:  {
  orRules: [
    { path: 'products[*].color', values: [ 'Red', 'Green' ] },
    { path: 'products[*].category', values: [ 'Swimming Trunks' ] }
  ],
  andRules: [
    { path: 'address.country', values: [ 'America' ] },
    { path: 'address.state', values: [ 'WA' ] }
  ]
}
Is Filtered:  true 

Ruleset to Check:  {
  orRules: [ { path: 'products[*].price', values: [ 18.5 ] } ]
}
Is Filtered:  true 

Ruleset to Check:  {
  orRules: [ { path: 'otherThings.name', values: [ 16 ] } ]
}
Is Filtered:  false 
```