"use client";
import React, { useEffect, useState } from "react";
import { UserAuth } from "@/app/context/AuthContext";
import Spinner from "@/app/components/spinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"




import {
  collection,
  addDoc,
  getDoc,
  //querySnapshot,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '@/firebase';

const page = () => {
  const { user } = UserAuth();
  const [loading, setLoading] = useState(true);

  const [items, setItems] = useState([
    // { name: 'Coffee', price: 4.95 },
    // { name: 'Movie', price: 24.95 },
    // { name: 'candy', price: 7.95 },
  ]);
  const [newItem, setNewItem] = useState({ name: '', price: '' });
  const [total, setTotal] = useState(0);

  // Add item to database
  const addItem = async (e) => {
    e.preventDefault();
    if (newItem.name !== '' && newItem.price !== '') {
      // setItems([...items, newItem]);
      await addDoc(collection(db, 'cases'), {
        name: newItem.name.trim(),
        price: newItem.price,
        user: user.uid,
      });
      setNewItem({ name: '', price: '' });
    }
  };

  // Read items from database
  useEffect(() => {
    const q = query(collection(db, 'cases'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = [];

      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemsArr);

      // Read total from itemsArr
      const calculateTotal = () => {
        const totalPrice = itemsArr.reduce(
          (sum, item) => sum + parseFloat(item.price),
          0
        );
        setTotal(totalPrice);
      };
      calculateTotal();
      return () => unsubscribe();
    });
  }, []);

  // Delete items from database
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, 'cases', id));
  };


  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  return (
    <div className="p-4">
      {loading ? (
        <Spinner />
      ) : user ? (
        <main className='flex min-h-screen flex-col items-center justify-between sm:p-24 p-4'>
      <div className='z-10 w-full max-w-5xl items-center justify-between font-mono text-sm '>
      <h3>the components ✨ Vision</h3>
        <h1 className="text-3xl font-bold center">R{total}</h1>
        <h3>premium per month</h3>
        
        <div className='bg-slate-100 p-4 rounded-lg'>
          <form className='grid grid-cols-6 items-center text-black'>
        

            <Input
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className='col-span-3 p-3 border'
              type='text'
              placeholder='Enter Item'
            />
            <Input
              value={newItem.price}
              onChange={(e) =>
                setNewItem({ ...newItem, price: e.target.value })
              }
              className='col-span-2 p-3 border mx-3'
              type='number'
              placeholder='Enter $'
            />
          
            <Button variant="secondary" size="lg" onClick={addItem} type='submit'>Customise</Button>

          </form>
          
      
        </div>
      </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
      {items.map((item) => (
        <Card key={item.id}> 
          <CardHeader>
            <CardTitle>{item.name}</CardTitle>
            <Link href={`/${item.name.toLowerCase()}`}>
              {item.name}
            </Link>
            {/* Assuming 'item.description' exists in your data */}
            <CardDescription>{item.description || "No description"}</CardDescription> 
          </CardHeader>
          <CardContent>{item.price}</CardContent>
  <CardFooter> <button onClick={() => deleteItem(item.id)}>remove</button>
  </CardFooter>
        </Card>
      ))}
    </div>
    <section>
        <div className='p-8'>
          <h2 className='font-semibold'>Select a Case to see list of potential claims</h2>
          <Link href="/atoms"><Button size={"lg"}>Continue</Button></Link>
        </div>
      </section>
    
    </main>
      ) : (
        <p>You must be invited by a client first - Request to join.</p>
      )}
    </div>
  );
};

export default page;