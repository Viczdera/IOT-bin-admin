// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { initializeApp } from 'firebase/app';
import { ref, getDatabase, get, child, onValue } from 'firebase/database'
import {
  initializeAuth,
  indexedDBLocalPersistence,
  connectAuthEmulator,
  inMemoryPersistence,
} from 'firebase/auth';

// Firebase configuration - this should not be public.
// Please use your own config if you intend to use this code.
var firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  databaseURL: process.env.DATABASEURL,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID
}

// Initialize Firebase
initializeApp(firebaseConfig);
// firebase.initializeApp(firebaseConfig)
const db = getDatabase()
// // Get a reference to the database service
let sensor_dataRef = ref(db, "sensor_data/bins")
onValue(sensor_dataRef, (snapshot) => {
  const data = snapshot.val();
  console.log(data)
});




type Data = {
  message: string,
  data: JSON
}


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  get(sensor_dataRef).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
      res.status(200).json({ message: 'success', data: snapshot.val() })
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });

}
