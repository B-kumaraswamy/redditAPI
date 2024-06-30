
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


  /* onHittingApi function -- fetches data from reddit API and 
  updates the blogPostData state. */
  useEffect(() => {
    const onHittingApi = async () => {
      try {
        const url = "https://www.reddit.com/r/reactjs.json";
        const response = await axios.get(url);
        console.log("response", response.data);
       

        if (response.data) {
          let postsData = [];
          const children = response.data["data"]["children"]

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


  /* Sets the theme for the project */
useEffect(() => {
  const currentTheme = localStorage.getItem("theme")
  if(currentTheme) {
    setIsDarkMode(currentTheme === 'dark')
  }
}, [])

/* on hitting toggleTheme function, toggles between dark and light mode, 
stores the mode to localStorage */ 
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode 
      localStorage.setItem("theme", newMode ? 'dark' : 'light')
      return newMode
    })
  }

  /* activates darkMode css when darkMode is activated/true */ 
  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : '';
  }, [isDarkMode]);

/* renders blogPostData state after checking errors and fetching data*/ 
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

