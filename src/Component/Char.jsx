import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Form from '../Component/Form'
import Modal from '../Component/Modal';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
function Char() {
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState(''); 
  const ApiUrl = "https://683747da2c55e01d184956c6.mockapi.io/post"; 

 useEffect(() => {
axios.get(`${ApiUrl}/?name=${search}`)
.then((res)=>setCharacters(res.data))
.catch((error)=> setCharacters([]))
 }, [search,characters])
  const [isModalOpen, setIsModalOpen] = useState(false);

const handleOpenModal = () => {
    const username = localStorage.getItem("username");
    if (!username) {
      toast.error("You must login first!");
      return;
    }
        setIsModalOpen(true);

  }


const handleDelete = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await axios.delete(`${ApiUrl}/${id}`);

        const updatedList = characters.filter((item) => item.id !== id);
        setCharacters(updatedList);

        Swal.fire("Deleted!", "Your item has been deleted.", "success");
        toast.success("Item deleted successfully");

      } catch (error) {
        console.error("Delete error:", error);
        Swal.fire("Error", "Failed to delete item.", "error");
        toast.error("Failed to delete item");
      }
    }
  });
};

  return (
    <>
          <Toaster /> 

     <div className=" px-4 py-8">
  <div className="mb-6 flex flex-col items-center space-y-4">
   
   
  </div>

 
  <div className='flex justify-between'>
 <input
      type="text"
      placeholder="Search characters..."
      value={search}
      onChange={(e)=>{
       setSearch(e.target.value)
      }}
      className="p-3 pl-10 w-full max-w-md border  border-amber-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gree-500 transition duration-200 ease-in-out"
      aria-label="Search characters"
    />

      <button
        type="button"
        onClick={handleOpenModal}
        className="px-5 py-1 bg-amber-500 text-white rounded-full  hover:bg-amber-600 transition"
      >
        +
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Form onClose={() => setIsModalOpen(false)} />
      </Modal>

    </div>
     <h1 className="text-4xl font-extrabold text-center text-amber-900 py-5 ">
    Explore Gilmore Girl Characters
  </h1>
  <div className="flex flex-col-reverse flex-wrap justify-center items-center gap-6 p-5 ">
    {characters.length > 0 ? (
      characters.map((character) => (
        <div
          key={character.id}
className="w-90 bg-amber-100 border border-amber-200 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"        >
          <div className="overflow-hidden h-90 bg-amber-100">
            <img
              src={character.url}
              alt={character.name}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="p-4">
            <h5 className="mb-2 text-xl font-semibold text-amber-900 truncate">
              Name: <span className="font-normal">{character.name}</span>
            </h5>
            <p className="text-amber-800">
              Gender: <span className="font-medium">{character.gender}</span>
            </p>
             {(localStorage.getItem("username")) &&(
        <button
          className="mt-2 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded transition"
          onClick={() => handleDelete(character.id)}
        >
          Delete
        </button>
             )}
          </div>
         
        </div>
      ))
    ) : (
      <p className="text-xl text-amber-300">No characters found.</p>
    )}
  </div>
</div>
    </>
  );
}

export default Char;