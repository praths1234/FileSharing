import {useRef , useState , useEffect} from 'react' ;
import './App.css';
import { uploadFile } from './services/api';
function App() {
  const logo= "https://i.pinimg.com/originals/16/46/24/1646243661201a0892cc4b1a64fcbacf.jpg" ;
  const [file , setFile] = useState('');
  const [result , setResult] = useState('');
  const fileInputRef = useRef();
  const onUploadClick = () =>  {
    fileInputRef.current.click();
  }
  useEffect(() => {
    const getImage = async () => {
          if(file){
            const data = new FormData();
            data.append("name" , file.name);
            data.append("file" , file);
            let response = await uploadFile(data);
            setResult(response.path);
          }
    }
    getImage();
  } , [file])
  return (
    <div className='container'>
    <img src={logo} alt="banner"/>
    <div className='wrapper'>
      <h1>SIMPLE FILE SHARING</h1>
      <p>UPLOAD AND SHARE THE DOWNLOAD LINK</p>
      <button onClick={() => onUploadClick() }>UPLOAD</button>
      <input type="file" 
      ref={fileInputRef}
      style={{display:'none'}}
      onChange={(e) => setFile(e.target.files[0])}
      />
      <a href={result} target="_blank" rel="noopener noreferrer">{result}</a>
    </div>
  </div>
    
  );
}

export default App;
