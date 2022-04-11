import { View, Text ,StyleSheet,FlatList,Image,TouchableOpacity} from 'react-native'
import React,{useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import { BookSellerContext,useContext } from '../context'
import axios from 'axios'
const data=[
  {
    "id": 1,
    "name": "The Book Thief",
    "author": "Markus Zusak",
    "imgUrl": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1522157426l/19063._SY475_.jpg",
    "about": "Elit mollit in enim qui. Est ea anim voluptate mollit magna. Tempor aliqua esse nulla reprehenderit reprehenderit quis voluptate velit. Aute id reprehenderit deserunt incididunt laboris et pariatur nulla. Excepteur velit qui ullamco aute laboris eu aliqua in nostrud anim reprehenderit deserunt occaecat. Fugiat sit est magna aliqua. Nisi non incididunt sunt fugiat nostrud aliqua nostrud excepteur ullamco sit excepteur commodo enim voluptate."
  },
  {
    "id": 2,
    "name": "Sapiens",
    "author": "Yuval Noah Harari",
    "imgUrl": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1420585954l/23692271.jpg",
    "about": "Nulla enim cillum deserunt proident eiusmod deserunt excepteur magna voluptate duis. Exercitation ex magna excepteur est id reprehenderit officia amet. Adipisicing quis anim ad sit commodo pariatur exercitation eiusmod commodo velit. Deserunt commodo pariatur quis magna. Fugiat enim tempor aliqua esse ut irure nostrud eiusmod do consectetur laborum."
  },
  {
    "id": 3,
    "name": "Crime and Punishment",
    "author": "Fyodor Dostoyevsky",
    "imgUrl": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1382846449l/7144.jpg",
    "about": "Velit voluptate et nostrud eu tempor excepteur aliqua laborum veniam sit. Reprehenderit occaecat ex fugiat veniam commodo. Laboris ut minim quis anim reprehenderit dolor. Fugiat laborum cillum sunt reprehenderit anim anim et ut Lorem sit ipsum magna non. Excepteur officia proident incididunt esse. Cillum laboris nulla ea minim officia amet deserunt consectetur velit aliqua est incididunt enim proident. Ea ut laborum aute sunt enim velit."
  },
  
 
]
export default function Carts() {
  const [state,dispatch]=useContext(BookSellerContext);
  function fetchCart(){
    axios.get("http://api-bookseller.herokuapp.com/carts").then((response)=>{
      dispatch({type:"FETCH_CARTS",payload:response.data})
    })
  }
  useEffect(()=>{
    fetchCart();
  },[])
  function removeCart(id){
axios.delete(`http://api-bookseller.herokuapp.com/carts/${id}`).then((response)=>{
  fetchCart();
})
  }
  const navigation=useNavigation()
  function _renderItem(item,index){
    return(  <View style={{flexDirection:"row",padding:10}}>
    <Image source={{uri:item.imgUrl}} style={styles.image}/>
    <View style={{padding:10}}>
 <Text style={styles.name}>{item.name}</Text>
 <Text style={styles.author}>{item.author}</Text>
 
    </View>
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={()=>{removeCart(item.id)}} style={styles.button}>
        <Text style={styles.buttonText}>Remove -</Text>
      </TouchableOpacity>
    </View>
 
   </View>
    
    )
   }
   function Seperator(){
    return( <View style={{borderBottomWidth:1,borderBottomColor:"#a9a9a9a9"}}></View>)
   }
  return (
    <View style={ styles.container}>
    {/* <Text>Books</Text> */}
{/* <Button title='goto Carts' onPress={()=>navigation.navigate("Carts")}></Button> */}
  <FlatList data={state.carts}
  ListEmptyComponent={
  <View style={styles.emptyContainer}>
  <Text style={styles.emptyText}>Your Cart is Empty!</Text>
  <TouchableOpacity style={styles.button} onPress={()=>{
    navigation.navigate("Book")
  }}>
    <Text style={styles.buttonText}>Go to Books</Text>
  </TouchableOpacity>
</View>
}
  
   renderItem={({item,index})=>_renderItem(item,index)}
keyExtractor={(item,index)=>item.id+index}
ItemSeparatorComponent={Seperator}
  />
  


  
  </View>
  )
}
const styles=StyleSheet.create(
  {container:{flex:1,backgroundColor:"#fff"},
  image:{width:100,height:150},
  name:{fontSize:22,fontWeight:"400",marginBottom:10},
  author:{fontSize:18,fontWeight:"200"},
  buttonContainer:{position:"absolute",
top:110,
left:130
},
  button:{backgroundColor:"red",borderRadius:10,padding:7},
  buttonText:{fontSize:20,color:"#fff"},
  emptyText:{fontSize:25},
  emptyContainer:{marginTop:250,alignItems:"center",justifyContent:"center"}

  }

)