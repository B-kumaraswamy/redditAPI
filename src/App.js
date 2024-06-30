
import { useState, useEffect } from 'react';
import axios from 'axios'
import './components/blogpost.css';
import BlogPost from './components/blogpost';
import ClipLoader from 'react-spinners/ClipLoader';

function App() {
  const [blogPostData, setBlogPostData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const onHittingApi = async () => {
      try {
        const url = "https://www.reddit.com/r/reactjs.json";
        const response = await axios.get(url);
        console.log("response", response.data);
        let res1 = response.data["data"]["children"]
        if (response.data) {
          let postsData = [];
          const children = response.data["data"]["children"]
          console.log("verifying", res1 === children)
          console.log("length", children.length)

          for (let i = 0;  i < children.length; i++) {
            const childData = children[i].data;
            const title = childData.title;
            const selfTextHtml = childData.selftext_html;
            const url = childData.url;
            const score = childData.score;

            postsData.push({
              Title: title,
              SelfText_HTML: selfTextHtml,
              URL: url,
              score: score
            });
          }
        
          setBlogPostData(postsData)
          setIsLoading(false);
          setError(null);
         
        } 
         
        else {
          setError("Error: response.data is undefined or missing expected properties");
          setIsLoading(false);
        }
      } catch (err) {
        setError("Error occurred while fetching data: " + err.message);
        setIsLoading(false);
      }
    };

    onHittingApi();
  }, []);

useEffect(() => {
  const currentTheme = localStorage.getItem("theme")
  if(currentTheme) {
    setIsDarkMode(currentTheme === 'dark')
  }
}, [])

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode 
      localStorage.setItem("theme", newMode ? 'dark' : 'light')
      return newMode
    })
  }

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : '';
  }, [isDarkMode]);

  useEffect(() => {
    console.log("updated state", blogPostData)
  }, [blogPostData])

  return (
    <div>
      <h1 className='heading'>Reddit API data</h1>
      <div className="theme-toggle-container">
        <button onClick={toggleTheme} className="theme-toggle">
          Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
        </button>
      </div>
      <div> 
        {isLoading ? (
           <div className="spinner-container">
         <ClipLoader color = {"#f6089b"}/>
         </div>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          blogPostData.map((post, index) => (
            <BlogPost
              key={index}
              title={post.Title}
              selfTextHtml={post.SelfText_HTML}
              url={post.URL}
              score={post.score}
            />
          ))
        )}
      </div>
      </div>
  );
}

export default App

