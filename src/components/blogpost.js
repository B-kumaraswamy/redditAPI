// BlogPost.js
import { decodeHtmlEntities } from './utils';
import './blogpost.css';
import { useEffect, useState } from 'react';
const BlogPost = ({ title, selfTextHtml, url, score }) => {
  
  const cleanedContent = decodeHtmlEntities(selfTextHtml);
  const modifiedScore = "Score: " + score.toString()
  const characters = modifiedScore.split('')
  
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF'
    let color = '#'

    for(let i = 0; i<6; i++) {
       color += letters[Math.floor(Math.random()*16)] 
    }
    return color
  }

  const [charColors, setCharColors] = useState(characters.map(() => getRandomColor()))

  useEffect(() => {
    const interval = setInterval(() => {
      setCharColors(characters.map(() => getRandomColor()))
    }, 1000)

    return () => clearInterval(interval)

  }, [characters])




  return (
   <div className='blog-container'>
     <div className="blog-post">
      <h2>{title}</h2>
      <div dangerouslySetInnerHTML={{ __html: cleanedContent }} />
      <p>URL: <a href={url} target="_blank" rel="noopener noreferrer">{url}</a></p>
      <p>{characters.map((letter, index) => (
        <span key = {index} style = {{color : charColors[index], fontWeight : "bold", fontSize : "20px"}}>{letter}</span>
      ))}</p>
    </div>
   </div>
  );
};

export default BlogPost;