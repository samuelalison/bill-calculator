import React, { useState } from 'react'
// import FriendsList from './FriendsList'
// import AddNewFriends from './AddNewFriends';
// import SplitBill from './SplitBill';


const initialFriends = [
    {
     id: 118836,
     name: "Clark",
     image: "https://i.pravatar.cc/50?u=118836",
     balance: -7,
    },
    {
     id: 933372,
     name: "Sarah",
     image: "https://i.pravatar.cc/50?u=933372",
     balance: 20,
    },
    {
     id: 499476,
     name: "Anthony",
     image: "https://i.pravatar.cc/50?u=499476",
     balance: 0,
    },
    ];
 

function Button({ children, onClick }) {
return(
    <button onClick={onClick} className='bg-yellow-600 rounded-md py-1 px-4'>{children}</button>
)
};


export default function TipCalculator () {
const [showAdd, setShowAdd] = useState(false);
const [person, setFriends] = useState(initialFriends);
const [ selectedFriend, setSelectedFriend] = useState(null);



function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend])
}
   

function handleShowAdd() {
    setShowAdd((s) => !s)
}

function handleSelection(friend){
    setSelectedFriend((cur) => cur?.id === friend.id ? null : friend )
    setShowAdd(false);
}

function handleSplitBill (value){
   setFriends(friends => friends.map(friend => friend.id === selectedFriend.id ? {...friend, balance: friend.balance + value} : friend))
}
    
  return (
    <div className='flex'>
    <div>
      <FriendsList person={person}  onSelection={handleSelection} selectedFriend={selectedFriend}/> 

      {showAdd ? <AddNewFriends onShow={handleShowAdd} onAddFriend={handleAddFriend}/> : ""}

       <Button onClick={handleShowAdd}>{showAdd ? 'Close' : 'Add Friend'}</Button>
       </div> 

      <div>
        { selectedFriend && <SplitBill person={person} selectedFriend={selectedFriend}  onSplitBill={handleSplitBill}/>}
       </div> 

    </div>
  )
}




function FriendsList({ person, onSelection, selectedFriend }) {

    return (
        <div>
          {person.map((per) => (
        <div key={per.id}><Friends per={per} name={per.name}  image={per.image} balance={per.balance} onSelection={onSelection} selectedFriend={selectedFriend}/></div>
          ))}
        </div>
      )
}


function Friends({name, image, balance, onSelection, per, selectedFriend }){
const isSelected = selectedFriend?.id === per.id; 

    return(
        <div className='flex items-center p-4'>
     <div className=''><img className='rounded-full' src={image}alt="" /></div>
     <div className='mr-4 ml-4'>
        <div>{name}</div>
        
        <div>
        {balance < 0 ? <p className="text-red-500">You owe {name} {Math.abs(balance)}€</p> : ""}

    {balance > 0 ? <p className="text-green-500">{name} owes you {balance}€</p> : ""}
    {balance === 0 ? `You and ${name} are even` : ""}
            </div>
        </div>
        <Button onClick={() => onSelection(per)}>{isSelected ? "Close" : 'Select'}</Button>
     </div>
    )
}

function AddNewFriends({ onAddFriend, onShow }) {
const [name, setName] = useState("")
const [image, setImage] = useState("https://i.pravatar.cc/50")

function handleSubmit(e){
e.preventDefault()

if(!name || !image) return;

const id = crypto.randomUUID()
    const newFriend =  {
            id,
            name,
            image: `${image}?=${id}`,
            balance: 0,
        }
onAddFriend(newFriend)

    setName('')
    setImage('')
    onShow(false)
}
//   console.log(name);
     return(
        <form className='mt-4 p-4' onSubmit={handleSubmit}>
            <div className='bg-yellow-300 p-6'>

            <div className='flex gap-2'>
             <p>👩🏽‍🤝‍👨🏻</p>
             <label htmlFor="">Friend's name</label>
             <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
             </div>

            <div className='flex gap-2 mt-4 mb-4'>
             <p>📷</p>
             <label htmlFor="">Image URL</label>
             <input type='text' value={image} onChange={(e) => setImage(e.target.value)}/>
            </div>
             <Button>Add</Button>
             </div>
        </form>
    )
}



function SplitBill({ selectedFriend, onSplitBill }){
    const [bill, setBill] = useState("");
    const [paidByUser, setpaidByUser] = useState("");
    const paidByFriend = bill ? bill - paidByUser : "";
    const [whoIsPaying, setWhoIsPaying] = useState("user");

function handleSubmit(e) {
    e.preventDefault();

    if(!bill || !paidByUser) return;
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
}


    return(
        <div className='bg-yellow-300 '>
        <form className='p-8' onSubmit={handleSubmit}>
            <h2>SPLIT BILL WITH {selectedFriend.name}</h2>

            <div className='flex gap-2 mt-8'>
             <p>💸</p>
             <label htmlFor="">Bill value</label>
             <input type="text" value={bill} onChange={(e) => setBill(Number(e.target.value))}/>
            </div>

            <div className='flex gap-2 mt-8'>
             <p>⛹️‍♀️</p>
             <label htmlFor="" >Your expense</label>
             <input type="text" value={paidByUser} onChange={(e) => setpaidByUser(
                Number(e.target.value) > bill ? paidByUser :
                Number(e.target.value)
                )}
                />
            </div>
            
            <div className='flex gap-2 mt-8'>
             <p>👩🏽‍🤝‍👨🏻</p>
             <label htmlFor="">{selectedFriend.name} expense</label>
             <input type="text" disabled value={paidByFriend}/>
            </div>



            <div className='flex gap-2 mt-8'>
             <p>👩🏽</p>
             <label htmlFor="">Who is paying the bill?</label>
             <select
             value={whoIsPaying}
             onChange={(e) => setWhoIsPaying(e.target.value)}
             >
                <option value="user">You</option>
                <option value="friend">{selectedFriend.name}</option>
             </select>
            </div>


           <div className='mt-8'>
            <Button>Split Bill</Button>
            </div>
            </form>
        </div>
    )
}