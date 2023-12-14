import { bakery, cheese, freeze, meat, milk } from "./assets";

export const sliderItems = [
  {
    id: 1,
    img: "https://i.ibb.co/XsdmR2c/1.png",
    title: "SUMMER SALE",
    desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
    bg: "f5fafd",
  },
  {
    id: 2,
    img: "https://i.ibb.co/DG69bQ4/2.png",
    title: "AUTUMN COLLECTION",
    desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
    bg: "fcf1ed",
  },
  {
    id: 3,
    img: "https://i.ibb.co/cXFnLLV/3.png",
    title: "LOUNGEWEAR LOVE",
    desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
    bg: "fbf0f4",
  },
];

export const categories = [
  {
    id: 1,
    title: "bakery",
    img: bakery
  },
  {
    id: 2,
    title: "milk",
    img: milk
  },
  {
    id: 3,
    title: "cheese",
    img: cheese
  },
  {
    id: 4,
    title: "frozen",
    img: freeze
  },
  {
    id: 5,
    title: "meat",
    img: meat
  },
  {
    id: 6,
    title: "butter",
    img: meat
  }
];

export const products = [
  {
      _id: 1,
      title: "Cheese cook 170",
      decription: "ovingly crafted on our local farm, our cheese boasts a unique flavor and aroma that you won't find in ordinary cheeses. Whether you're slicing it for snacks or melting it for delectable sandwiches, our artisanal cheese promises an unforgettable experience, brimming with the taste and traditions of authentic farm-to-table cuisine.",
      image: "https://res.cloudinary.com/dtkoyzh0l/image/upload/v1697924917/Farm/46_vnu6gl.jpg",
      categories: [
        {
          categoryId: 3
        },
        {
          categoryId: 2
        }
      ],
      measure: "pcs",
      price :170,
      createdAt: new Date(2023, 10, 3),
      updatedAt: new Date(2023, 11, 3),
      inStock: true,
  },
  {
    _id: 2,
    title: "Cheese beez 200",
    decription: "ovingly crafted on our local farm, our cheese boasts a unique flavor and aroma that you won't find in ordinary cheeses. Whether you're slicing it for snacks or melting it for delectable sandwiches, our artisanal cheese promises an unforgettable experience, brimming with the taste and traditions of authentic farm-to-table cuisine.",
    image: "https://res.cloudinary.com/dtkoyzh0l/image/upload/v1697924917/Farm/46_vnu6gl.jpg",
    categories: [
      {
        categoryId: 3
      }
    ],
    measure: "pcs",
    price :200,
    createdAt: new Date(2022, 8, 3),
    updatedAt: new Date(2022, 9, 3),
    inStock: true,
  },
  {
    _id: 3,
    title: "Bread beez 220",
    decription: "ovingly crafted on our local farm, our cheese boasts a unique flavor and aroma that you won't find in ordinary cheeses. Whether you're slicing it for snacks or melting it for delectable sandwiches, our artisanal cheese promises an unforgettable experience, brimming with the taste and traditions of authentic farm-to-table cuisine.",
    image: "https://res.cloudinary.com/dtkoyzh0l/image/upload/v1697924917/Farm/33_ibschi.jpg",
    categories: [
      {
        categoryId: 1
      }
    ],
    measure: "pcs",
    price :220,
    createdAt: new Date(2022, 8, 3),
    updatedAt: new Date(2022, 9, 3),
    inStock: true,
  },
  {
    _id: 4,
    title: "Bread beez 250",
    decription: "ovingly crafted on our local farm, our cheese boasts a unique flavor and aroma that you won't find in ordinary cheeses. Whether you're slicing it for snacks or melting it for delectable sandwiches, our artisanal cheese promises an unforgettable experience, brimming with the taste and traditions of authentic farm-to-table cuisine.",
    image: "https://res.cloudinary.com/dtkoyzh0l/image/upload/v1697924917/Farm/33_ibschi.jpg",
    categories: [
      {
        categoryId: 1
      }
    ],
    measure: "pcs",
    price :250,
    createdAt: new Date(2022, 8, 3),
    updatedAt: new Date(2022, 9, 3),
    inStock: true,
  },
  {
    _id: 5,
    title: "Bread beez 140",
    decription: "ovingly crafted on our local farm, our cheese boasts a unique flavor and aroma that you won't find in ordinary cheeses. Whether you're slicing it for snacks or melting it for delectable sandwiches, our artisanal cheese promises an unforgettable experience, brimming with the taste and traditions of authentic farm-to-table cuisine.",
    image: "https://res.cloudinary.com/dtkoyzh0l/image/upload/v1697924917/Farm/33_ibschi.jpg",
    categories: [
      {
        categoryId: 1
      }
    ],
    measure: "pcs",
    price :140,
    createdAt: new Date(2022, 8, 3),
    updatedAt: new Date(2022, 9, 3),
    inStock: true,
  },
  {
    _id: 6,
    title: "Bread beez",
    decription: "ovingly crafted on our local farm, our cheese boasts a unique flavor and aroma that you won't find in ordinary cheeses. Whether you're slicing it for snacks or melting it for delectable sandwiches, our artisanal cheese promises an unforgettable experience, brimming with the taste and traditions of authentic farm-to-table cuisine.",
    image: "https://res.cloudinary.com/dtkoyzh0l/image/upload/v1697924917/Farm/33_ibschi.jpg",
    categories: [
      {
        categoryId: 1
      }
    ],
    measure: "pcs",
    price :30,
    createdAt: new Date(2022, 8, 3),
    updatedAt: new Date(2022, 9, 3),
    inStock: true,
  },
  {
    _id: 7,
    title: "Bread beez",
    decription: "ovingly crafted on our local farm, our cheese boasts a unique flavor and aroma that you won't find in ordinary cheeses. Whether you're slicing it for snacks or melting it for delectable sandwiches, our artisanal cheese promises an unforgettable experience, brimming with the taste and traditions of authentic farm-to-table cuisine.",
    image: "https://res.cloudinary.com/dtkoyzh0l/image/upload/v1697924917/Farm/33_ibschi.jpg",
    categories: [
      {
        categoryId: 1
      }
    ],
    measure: "pcs",
    price :80,
    createdAt: new Date(2022, 8, 3),
    updatedAt: new Date(2022, 9, 3),
    inStock: true,
  },
  {
    _id: 8,
    title: "Bread beez",
    decription: "ovingly crafted on our local farm, our cheese boasts a unique flavor and aroma that you won't find in ordinary cheeses. Whether you're slicing it for snacks or melting it for delectable sandwiches, our artisanal cheese promises an unforgettable experience, brimming with the taste and traditions of authentic farm-to-table cuisine.",
    image: "https://res.cloudinary.com/dtkoyzh0l/image/upload/v1697924917/Farm/33_ibschi.jpg",
    categories: [
      {
        categoryId: 1
      },
      {
        categoryId: 3
      },
      {
        categoryId: 7
      }
    ],
    measure: "pcs",
    price :150,
    createdAt: new Date(2022, 8, 3),
    updatedAt: new Date(2022, 9, 3),
    inStock: true,
  }
]