// import React from 'react'
//   const NoteFound = () => {
//   return (
//     <div>
//         404 Not Found
//     </div>
//   )
// }


export default function NoteFound() {
  // const [albums, setAlbums] = useState([]);
  // const [loading, setLoading] = useState(true);

   fetch("https://jsonplaceholder.typicode.com/albums")
     
      .then((data) => {
        console.log(data);
      })
    

  return (
    <div>
      <h1>Albums List</h1>
    
    </div>
  );
}


