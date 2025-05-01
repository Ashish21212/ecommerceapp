 export const registerFormControl = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: 'input',
    type: 'text',
    
  },
  {
    name: "email",
    label: "User Email",
    placeholder: "Enter your email",
    componentType: 'input',
    type: 'email',

  },
  {
    name: "password",
    label: "password",
    placeholder: "Enter your password",
    componentType: 'input',
    type: 'password',

  }
]

export const loginFormControl = [

  {
    name: "email",
    label: "User Email",
    placeholder: "Enter your email",
    componentType: 'input',
    type: 'email',

  },
  {
    name: "password",
    label: "password",
    placeholder: "Enter your password",
    componentType: 'input',
    type: 'password',

  }
]

export const addProductFormElements = [
  {
    label:'Title',
    name:'title',
    componentType:'input',
    type:'text',
    placeholder:'Enter product title',
  },

  {
    label:'Description',
    name:'description',
    componentType:'textarea',
    placeholder:'Enter product description',
  },

  {
label: "Category",
name: "category",
componentType: "select",
options: [
  { id: 'men', label:"Men"},
  { id: 'women', label:"Women"},
  { id: 'kids', label:"Kids"},
  { id: 'accessories', label:"Accessories"},
  { id: 'footwear', label:"Footwear"},

]
  
  },
  {
    label:'Brand',
    name:'brand',
    componentType:'select',
    options:[
      {id:'nike', label:'Nike'},
      {id:'adidas', label:'Adidas'},
      {id:'puma', label:'Puma'},
      {id:'levis', label:'Levis'},
      {id:'reebok', label:'Reebok'},
      {id:'zara', label:'Zara'},
      {id:'h&m', label:'H&M'},


    ]
  },
  {

    label:'Price',
    name:'price',
    componentType:'input',
    type:'number',
    placeholder:'Enter product price',

  },
  {
    label:'Sale Price',
    name:'salePrice',
    componentType:'input',
    type:'number',
    placeholder:'Enter product sale price',
  },
  {
    label:'Total Stock',
    name:'totalStock',
    componentType:'input',
    type:'number',
    placeholder:'Enter product total stock',
  },
]

//For shop

export const shoppingViewHeaderMenuItems = [
  {
    id:'home',
    label:'home',
    path: '/shop/home'

  },
  {
    id:'men',
    label:'Men',
    path: '/shop/listing'

  },
  {
    id:'women',
    label:'Women',
    path: '/shop/listing'

  },
  {
    id:'kids',
    label:'Kids',
    path: '/shop/listing'

  },

  {
    id:'footwear',
    label:'Footwear',
    path: '/shop/listing'

  },
  {
    id:'acccessories',
    label:'Accessories',
    path: '/shop/listing'

  },
]
