/* 
import { useEffect, useState } from 'react'
import {
  collection,

  getDocs,

} from 'firebase/firestore';
import styles from '../styles/Home.module.css'
import { database } from '../firebaseConfig';
import { useRouter } from 'next/router';

export default function q2() {

  const [teamlist,setteamlist]=useState([]);
  const router = useRouter();

  
const teamref=collection(database,"Teams")
 const getteamlist = async()=>{
  try{
  const data = await getDocs(teamref);
  const filtereddata=data.docs.map((doc)=>({
    ...doc.data(),
    id:doc.id
  })) 

  setteamlist(filtereddata)
  } catch(err){
    console.error(err);
  }
  
};
  useEffect(()=>{

    
    getteamlist();
  },[]); 

  const logout = () => {
    router.push('/login')
  }
  useEffect(() => {
    let token = sessionStorage.getItem('Token')

    if(token){
        router.push('/v_h')
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
              <h1>{team.id}</h1>
              <h1>members:{team.memc}</h1>
            
              </div>
          ))}
        </div>
    </div>
    

  
  );
} */
import { useEffect, useState } from 'react';
import {
  collection,
  doc, // Import the 'doc' function
  getDoc, // Import the 'getDoc' function
} from 'firebase/firestore';
import styles from '../styles/Home.module.css';
import { database } from '../firebaseConfig';
import { useRouter } from 'next/router';

export default function q2() {
  const [team, setTeam] = useState(null); // Use a single 'team' state to store the specific document
  const router = useRouter();

  // Specify the document ID you want to fetch
  //const documentId = 'YOUR_DOCUMENT_ID_HERE'; // Replace with the desired document ID

  const teamRef = doc(database, 'Teams', "zoom"); // Create a reference to the specific document

  const getTeam = async () => {
    try {
      const docSnap = await getDoc(teamRef);
      if (docSnap.exists()) {
        // Check if the document exists
        setTeam({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log('No such document!');
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTeam();
  }, []); // Fetch the specific document when the component mounts

  const logout = () => {
    router.push('/login');
  };

  useEffect(() => {
    let token = sessionStorage.getItem('Token');

    if (token) {
      router.push('/v_h');
    }
  }, []);

  return (
    <div className={styles.container}>
      <div>
        <button onClick={logout}>Log Out</button>
      </div>
      <div>
        {team && (
          <div>
            <h1>{team.id}</h1>
            <h1>members: {team.memc}</h1>
            <h1>A: {team.A}</h1>
            <h1>B: {team.B}</h1>
            <h1>C: {team.C}</h1>
            <h1>D: {team.D}</h1>
            <input placeholder='enter member'/>
            <button>kick member</button>
          </div>
        )}
      </div>
    </div>
  );
}

