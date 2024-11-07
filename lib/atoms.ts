import { Product, Atom } from './types'
import { collection, getDocs, getDoc, doc, where, query } from 'firebase/firestore';
import { db } from '@/firebase'


export async function getAtoms(): Promise<{
  atoms: Atom[] | null
  error: string | null
}> {
  try {
    
    const atomsCollection = collection(db, 'anatomy'); ////PRODUCTS YO
    const atomsSnapshot = await getDocs(atomsCollection);
    const atomsData = atomsSnapshot.docs.map(doc => doc.data() as Atom); // Cast to Atom
    return { atoms: atomsData, error: null };
  } catch (error: any) { // Added type assertion
    return { atoms: null, error: error.message || 'Failed to fetch atoms or comp' };
  }
}

export async function getAtomById(
  id: string
): Promise<{ atom: Atom | null; error: string | null }> {
  try {
const atomDocRef = doc(db, 'anatomy', id);
    const atomsSnapshot = await getDoc(atomDocRef);
    if (atomsSnapshot.exists()) {
      return { atom: atomsSnapshot.data() as Atom, error: null }; // Changed from Product to Atom
    } else {
      return { atom: null, error: 'User not found' };
    }
  } catch (error: any) {
    return { atom: null, error: error.message || 'Failed to fetch Atom or component' };
  }
}

export async function getProductsByAtomId(
  id: string
): Promise<{ products: Product[] | null; error: string | null }> { // Changed 'product' to 'Product'
  console.log(`in context of product:${ id }`); // Log the parameters to confirm the atomId
  try {
    const productCollection = collection(db, 'product');
    const q = query(productCollection, where('productId', '==', id)); // Hardcoded known existing id
    const productsSnapshot = await getDocs(q);
    
    // Log the number of products found
    console.log(`Number of products found: ${productsSnapshot.size}`);
    
    const productsData = productsSnapshot.docs.map(doc => doc.data() as Product);
    return { products: productsData, error: null };
  } catch (error: any) {
    return { products: null, error: error.message || 'Failed to fetch products' };
  }
}