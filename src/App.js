
import { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';
import BlogPost from './components/blogpost';

function App() {
  const [blogPostData, setBlogPostData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const onHittingApi = async () => {
      try {
        const url = "https://www.reddit.com/r/reactjs.json";
        const response = await axios.get(url);
        console.log("response", response.data);
        //console.log(response.data["data"]["children"])
        let res1 = response.data["data"]["children"]
        //console.log(response.data["data"]["children"][0]["data"]["title"])
        if (response.data) {
          let postsData = [];
          //const children = response.data.data.children;
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
        
          
          console.log("line num 42")
          setBlogPostData(postsData)
          console.log("line num 44")
          setIsLoading(false);
          setError(null);
         
        } 
         
          /*
        if (response.data && response.data["data"] && response.data["data"]["children"]) {
          const postsData = response.data["data"]["children"].slice(0, 27).map(child => ({
            Title: child.data.title,
            SelfText_HTML: child.data.selftext_html,
            URL: child.data.url,
            score: child.data.score
          }));

          setBlogPostData(postsData);
          setIsLoading(false);
          setError(null);
        }*/
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
    //console.log("updated state", blogPostData)
  }, [blogPostData])

  return (
   
      <div>
        {isLoading ? (
          <p>Loading...</p>
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
   
  );
}

export default App

//const [data, setData] = useState({Title : "", SelfText_HTML : "", URL : "", score : ""})
//console.log(response.data["data"]["children"][0]["data"])
      //console.log(response.data["data"]["children"][0]["data"]["title"])
      //console.log(response.data["data"]["children"][5]["data"]["selftext_html"])
      //console.log(response.data["data"]["children"][0]["data"]["url"])
      //console.log(response.data["data"]["children"][0]["data"]["score"])

      

    //const selfTextHtml = response.data.data.children[1].data.selftext_html;
        //setBlogPostData(selfTextHtml);