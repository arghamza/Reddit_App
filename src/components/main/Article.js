
import {React , useState,useEffect} from 'react'
import '../../index.css'
import SaveBtn from './SaveBtn'

//Img takes care of the media in a post (image , video , article , gif )

    const Img=(props)=>{ 
       let  media=props.article.url_overridden_by_dest ;
        //in the json data  url_overridden_by_dest is where we find the link to the picture or gif 
       // to visualize the json file provided by reddit , go to https://www.reddit.com/r/memes.json
      ;

        if(media && (media.substr(media.length - 3)==="jpg" || media && media.substr(media.length - 3)==="png" 
        || media.substr(media.length - 3)==="gif"  || media.substr(media.length - 4)==="gifv") )
         { // we check the type of the media by getting the 3 or 4 last characters in the link  
            
             if(media.substr(media.length - 4)==="gifv") // gifv extension is not like gif it should be put in a video tag 
             {
               props.setMediaType("video") 
               //once we know the type we set the props.mediType to either "image","video","gif" or "article" using props.setMediType  
                 return(<div className="video" > <video controls autoPlay  loop preload="auto" loop="loop" style={{width: "200px", height: "250px" }}>
                 <source src={media.replace("gifv","mp4")} type="video/mp4"></source>
                 { /*to make a gifv work we need to change its extension to mp4*/}
                 
             </video> </div> );
           
             }
             

            else {
              if(media.substr(media.length - 3)==="gif"){ props.setMediaType("gif") }else{ props.setMediaType("image")}  ;
              return (<img src={media} alt=""   width="200" height="250"  />)}
     }   //if gif return img tag 
    else if((props.article.media != undefined || props.article.secure_media != undefined ) && props.article.media.reddit_video!==undefined)
    {    /** video's link can be in either  secure_media.reddit_video.fallback_url or  reddit_video.fallback_url  ( view json data ) */
         if(props.article.media != undefined ){ console.log(props.article.media.reddit_video.fallback_url) ;props.setMediaType("video");
             return( <div className="video" > <video controls autoPlay loop preload="auto" style={{width: "200px", height: "250px" }}>
        <source   raw_json="1" src={props.article.media.reddit_video.fallback_url}></source>
        </video> </div> )
         }
         else 
         { props.setMediaType("video")
             return(<div className="video" > <video controls autoplay loop preload="auto" style={{width: "200px", height: "250px" }}>
             <source   raw_json="1" src={props.article.secure_media.reddit_video.fallback_url}></source>
             </video> </div>)
         }

        
       
    }
    
     else 
     {
       /**if media is an article we return button click to read more */
      props.setMediaType("article") 
        return (<button type="button" className="btnArt" > Click to read more </button>)
        
     } 
     }
     
function Article(props) {
  const[mediaType,setMediaType]=useState("") ;
  //media type which we change in component Img above
 props.setUser(props.user) //forcing rerendering 
 let media ="" ; // this is not like mediaType 
 /** this media will take the link of either a video , an image , a gif ...  */
 if(props.article.url_overridden_by_dest) {  media=props.article.url_overridden_by_dest }
  else if(props.article.secure_media!=null) {media=props.article.secure_media.reddit_video.fallback_url } 
  else if(props.article.media!=null)   {  media= props.article.media.reddit_video.fallback_url };
  /*
         
  props.mediaType is the props we get from the main component 
  if the user goes to '/image' page its value becomes  "image" 
   if the user goes to '/video' page its value becomes  "video" 
   if the user is on '/' home path its value is ""
 
   */
    return (
    
        props.mediaType==="" ||
         props.mediaType==="video" && mediaType ==="video" ||
        props.mediaType==="image" && mediaType ==="image" ||
        props.mediaType==="gif" && mediaType ==="gif" ?
        // if the mediaType of a post and what the user requested type match 
        <article>

           <h3>{ props.article.title}</h3> 
           {/* if user connected we show save button and return Savebtn component with user and post data as props  */}
            {props.user?  <SaveBtn  title={props.article.title} mediaType={mediaType} media={media} url={props.article.permalink }  user={props.user} setUser={props.setUser} firebase={props.firebase}/> : null}
            <a href={"https://reddit.com" + props.article.permalink } target="_blank" rel="noreferrer" >
                {/* link to reddit post  */}
           <Img  article={props.article} className="images" mediaType={mediaType} setMediaType={setMediaType}/>
           {/* media  */}
           </a> 
        </article>
          : null 
         
    )
}


function Articles(props) {
    const[articles , setArticles]=useState([]);
    const subreddit =props.subreddit ; 



  useEffect(() => {
    // when the subreddit typed in the search bar changes , useEffect refetches the data
    fetch("https://www.reddit.com/r/"+ subreddit +"\\top.json?limit=100").then(res =>
    {
      if(res.status !== 200){
        console.log("ERoRR");
        return;
      }
      res.json().then(data =>
     {
          if(data!=null){
            setArticles(data.data.children); /** to understand this , please check json file structure https://www.reddit.com/r/memes.json  */
          }
        })
    })
  }, [subreddit]);
    return (
        <div className="articles">
        {
          // once we get the data we map through the array to display the posts using component article   
          //mediaType here is what we use to filter posts in navbar  
          // we pass firebase as props to then give it to the save button component in Article component 
          
          (articles !== null) ? articles.map((article ,index) => <Article  firebase={props.firebase} user={props.user} setUser={props.setUser} key={index} mediaType={props.media} article={article.data}/>):''
        }
        </div>
    )
}

export default Articles
