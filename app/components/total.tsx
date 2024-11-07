"use client";
import React, { useEffect, useState } from "react";
import { UserAuth } from "@/app/context/AuthContext";
import Spinner from "@/app/components/spinner";
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

const Total = () => {
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
      await addDoc(collection(db, 'anatomy'), {
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

  // Delete items