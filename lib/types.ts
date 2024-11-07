export type Atom = {
    createdAt: string
    name: string
    id: string
    description: string; // Add this line
    snippet: string;     // Add this line
    body: string;  
  }
  
  export type Product = {
    createdAt: string
    title: string
    isCompleted: boolean
    id: string
    productId: string
  }