import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import {
  collection,
  documentId,
  updateDoc,
  addDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore';
import styles from '../styles/Home.module.css'
import { database } from '../firebaseConfig';
import { useRouter } from 'next/router';
import {
  getAuth,
}from 'firebase/auth';
export default function q2() {
  const [tname, setteamname] = useState("");
  const [Mtcode, setMcode] = useState("");
  const [teamlist,setteamlist]=useState([]);
  const auth = getAuth();
  const router = useRouter();
  const user = auth.currentUser;
  const databaseRef = doc(database,"teams","kavi");

  //const [updatedname,setupdatedname]=useState("")
  //const dataref=doc(database,'T',tname);
 
/*    const addData = () => {
    setDoc(doc(database,"T_head",user.email),{
      name: tname,
      code: tcode
    })      .then(() => {
      alert('Data Sent')
      router.push('/home')
    })
    .catch((err) => {
      console.error(err);
    })
}  */
const teamref=collection(database,"T_head")
const getteamlist = async()=>{
  try{
  const data = await getDocs(teamref);
  const filtereddata=data.docs.map((doc)=>({
    ...doc.data(),
    id:doc.id,
  }));
  setteamlist(filtereddata);
  } catch(err){
    console.error(err);
  }
  
};
  useEffect(()=>{

    
    getteamlist();
  },[]);
  const checkNadddata=async (x)=>{

    try {
      
      const docRef1 = doc(database, 'Teams',x);
      const docSnap2 = await getDoc(docRef1);
      


        const fieldValue1 = docSnap2.get('idM');
        const fieldValue2 = docSnap2.get('memc');
       // const fieldValue2 = docSnap2.get('q1');
       getteamlist();
       if(Mtcode==fieldValue1){
          
          if(fieldValue2==1){
            updateDoc(docRef1,{
              B:user.email,
              memc:Number(2)
            })
            
            .then(() => {
              alert('Data Sent')
              router.push('/v_m')
            })
            .catch((err) => {
              console.error(err);
            })
          }
          else{
            if(fieldValue2==2){
              updateDoc(docRef1,{
                C:user.email,
                memc:Number(3)
              })

              .then(() => {
                alert('Data Sent')
                router.push('/v_m')
              })
              .catch((err) => {
                console.error(err);
              })
          }
          else{
            if(fieldValue2==3){
              updateDoc(docRef1,{
                D:user.email,
                memc:Number(4)
              })

              .then(() => {
                alert('Data Sent')
                router.push('/v_m')
              })
              .catch((err) => {
                console.error(err);
              })
          }
          else{
            alert("team is full")
          }
        }}}}
     catch (error) {
      console.error('Error fetching field value:', error);
    }
  }
  const logout = () => {
    //sessionStorage.removeItem('Token')
    router.push('/login')
  }
  useEffect(() => {
    let token = sessionStorage.getItem('Token')

    if(token){
        router.push('/v_m')
    }
}, [])
  return (
    <div className={styles.container}>
      <div>
          <button onClick={logout}>Log Out</button>
        </div>
      <div>
          {teamlist.map((team)=>(
            <div>
              <h1>{team.name}</h1>
              <h1>members</h1>
            
              </div>
          ))}
        </div>
    </div>
    

  
  );
}
