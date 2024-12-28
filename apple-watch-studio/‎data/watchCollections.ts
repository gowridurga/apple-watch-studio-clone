   - export const watchCollections:{id:string; name: string; sizes: { id: string; name: string; price: number }[] }[]  = [
   + export const watchCollections:{id:string; name: string; sizes: { id: number; name: string; price: number }[] }[]  = [
      {
        id: "APPLE_WATCH_SERIES_10",
        name:'Apple Watch Series 10',
        sizes: [
      -    { id: "42mm", name: "42mm", price: 30 },
       -   { id: "46mm", name: "46mm", price: 50 },
       + { id: "40mm", name: "40mm", price: 30 },
        +  { id: 46, name: "46mm", price: 50 },
        ],
      },
      {
        id: "APPLE_WATCH_HERMÈS_SERIES_10",
        name:'Apple Watch Hermès Series 10',
        sizes: [
       -   { id: "42mm", name: "42mm", price: 20 },
        -  { id: "46mm", name: "46mm", price: 40 },
        +{ id: "40mm", name: "40mm", price: 20 },
        +  { id: 46, name: "46mm", price: 40 },
        ],
      },
      {
        id: "APPLE_WATCH_SE",
        name:'Apple Watch SE',
        sizes: [
       -   { id: "40mm", name: "40mm", price: 10 },
        -  { id: "44mm", name: "44mm", price: 30 },
        + { id: "40mm", name: "40mm", price: 10 },
        + { id: 44, name: "44mm", price: 30 },
        ],
      },
    ];