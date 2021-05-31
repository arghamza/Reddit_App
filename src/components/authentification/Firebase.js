import app from 'firebase/app'
import 'firebase/auth'
import "firebase/firestore"
// class firebase which has one instanciation in the project ( go to index.js )

class Firebase  
{
    constructor()
    {
      
        app.initializeApp({
            //  replace these credentials with your own after following our guide 
            apiKey: "AIzaSyCGl5NXcvHWWMOJOUbnbDaT3emDtTm6bMM",
            authDomain: "argarti-7cde7.firebaseapp.com",
            projectId: "argarti-7cde7",
            storageBucket: "argarti-7cde7.appspot.com",
            messagingSenderId: "475608311331",
            appId: "1:475608311331:web:0aa644de0904bd26e27396",
            measurementId: "G-CN744ZBE2N"
          });

            this.auth=app.auth() ; //calling auth constructor to be able to use firebase authentification methods
            this.db=app.firestore() ; //calling firestore constructor to be able to use firestore methods 
          
      
    }
   getUser()
   {
       if(this.auth.currentUser !== undefined )
        return this.auth.currentUser ; 
        //returns current user
        
   }
  SignInWithGoogle()
   {
    this.google = new app.auth.GoogleAuthProvider();
  
      this.auth.signInWithPopup(this.google).then(result=>console.log(result.user))
  
    // signing in and up with google
     
   

    }
    addFavorite(title , url , media , mediaType )
    {
        this.db.collection('user').doc(this.auth.currentUser.uid).update(
            {
                favorites: app.firestore.FieldValue.arrayUnion({title: title , url : url , media : media , mediaType : mediaType})
            }
        )
        //saves user's favorites to firestore database 
    }
    removeFavorite(title , url , media , mediaType )
    {
        this.db.collection('user').doc(this.auth.currentUser.uid).update(
            {
                favorites: app.firestore.FieldValue.arrayRemove({title: title , url : url , media : media , mediaType : mediaType})
            }
        )
  //removes user's favoritesfrom firestore database
    }
    getFavorites()
    {
        // gets the current user's favorites 
       return this.db.collection('user').doc(this.auth.currentUser.uid) ;  }
     profileUpdate(username)
    {
        // when the user authenticates this method creates a document in firestore with his uid as document' ID
        // each document has array of favorites , username , userID 
        this.auth.currentUser.updateProfile({displayName : username})
        this.db.collection('user').doc(this.auth.currentUser.uid).set({
            userName: username,
            
            userID : this.auth.currentUser.uid,
            
            favorites:[]

        })
    }
    SignupUser=(email,password)=>
    {
      
        return this.auth.createUserWithEmailAndPassword(email,password)
        
    }
    SigninUser=(email,password)=>
    {
        
       return  this.auth.signInWithEmailAndPassword(email,password)
    }
    SignoutUser=()=>
    {
        return this.auth.signOut()
    }
}

export default Firebase ; 