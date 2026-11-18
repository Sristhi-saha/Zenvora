

export const registerFormControls = [
    {
        name:"username",
        label:"User Name",
        type:"text",
        placeholder:"Enter your user name",
        required:true,
        componentType:"input"
    },
    {
        name:"email",
        label:"Email",
        type:"email",
        placeholder:"Enter your email",
        // required:true,
        componentType:"input"
    },
    {
        name:"password",
        label:"Password",
        type:"password",
        placeholder:"Enter your password",
        // required:true,
        componentType:"input"
    }
]

export const LoginFromControls = [
   {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
]


export const addProductsFromElements = [
    {
      "label": "Product Name",
      "name": "title",
      "componentType": "input",
      "type": "text",
      "placeholder": "Enter product name"
    },
    {
      "label": "Price",
      "name": "price",
      "componentType": "input",
      "type": "number",
      "placeholder": "0.00"
    },
    {
      "label": "Sale Price",
      "name": "salePrice",
      "componentType": "input",
      "type": "number",
      "placeholder": "0.00 (optional)"
    },
    {
      "label": "Category",
      "name": "category",
      "componentType": "select",
      "type": "select",
      "placeholder": "Select a category",
      "options": [
        { "value": "electronics", "label": "Electronics" },
        { "value": "clothing", "label": "Clothing" },
        { "value": "food", "label": "Food & Beverage" },
        { "value": "home", "label": "Home & Garden" },
        { "value": "sports", "label": "Sports & Outdoors" }
      ]
    },
    {
      "label": "Stock Quantity",
      "name": "totalStock",
      "componentType": "input",
      "type": "number",
      "placeholder": "Enter stock quantity"
    },
    {
      "label": "Description",
      "name": "description",
      "componentType": "textarea",
      "type": "textarea",
      "placeholder": "Enter product description"
    },
    {
      "label": "Brand",
      "name": "brand",
      "componentType": "input",
      "type": "text",
      "placeholder": "Enter brand name"
    },    
]

export const menuItemShoppingView = [
  {
    id:"home",
    label:"Home",
    path:"/"
  },
  {
    id:"All Notes",
    label:"All Notes",
    path:"/listing"
  },
  
  {
    id:"contribute",
    label:"Contribute",
    path:"/contribute"
  },
  {
    id:"saved",
    label:"Saved",
    path:"/saved"
  },
  
]


export const filters = {
  ProductFilter: {
    category: {
      key: "category",
      label: "Core CS Subjects",
      type: "checkbox",
      options: [
        { label: "Data Structures & Algorithms", value: "dsa" },
        { label: "Operating Systems", value: "os" },
        { label: "DBMS & SQL", value: "dbms" },
        { label: "Computer Networks", value: "cn" },
        { label: "System Design & Web", value: "system-design" },
        { label: "AI & Machine Learning", value: "aiml" },
      ],
    },
    brand: {
      key: "brand",
      label: "Resource Type",
      type: "checkbox",
      options: [
        { label: "Topper Handwritten Notes", value: "handwritten" },
        { label: "Exam Cheat Sheets", value: "cheatsheet" },
        { label: "Solved Previous Year Papers", value: "pyq" },
        { label: "GATE & Placement Prep", value: "gate" },
      ],
    },
  },
};
