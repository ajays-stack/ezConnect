import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";
const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
const [selectedImg,setSelectedImg]=useState(null)
  const handleImageUpload = async (e) => {

    const file=e.target.files[0];
    //if user open the selection but not select any image
    if(!file)return;

    const reader=new FileReader;
    reader.readAsDataURL(file);

    
    //the file is stored as buffer(tempstorage) in memory binary so we have to convert it in base64
    //Base64 is a way of representing binary data (like images, PDFs, or any file) as plain text using only 64 different characters:
    //eska fayda ye hai raw binary corrupt ho sakta hai ye jabki safe hai
    //es base 64 url ko ham simple url ki tarah use krr sakte hai for file access

    //jab file read ho jaye to base64 return kardo result me
    reader.onload=async()=>{
      const base64Image=reader.result;
      setSelectedImg(base64Image);
      await updateProfile({profilePic:base64Image});
    }

  };
  return (
    <div className="h-full pt-15">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* avatar upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg||authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 "
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${
                    isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                  }
                `}
              >
                <Camera className="w-5 h-5 stroke-black" />

                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>
          {/* user info  */}

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              {/* we can use input tag here with attribute readonly or disabled */}
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.fullName}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.email}
              </p>
            </div>
          </div>

          {/* extra info */}
           <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium  mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;



// ----understanding image upload--------------------

// Image upload ka pura flow (Browser → Server)

// 1️⃣ Browser me File choose karna
//jab bhi ham input type file me koi images ya multiple image select karte hai
//to ek object create hote hai  FileList
//ye object e.target.files esi object ko represent karta hai jisme har ek element ek file ka object hai jo us file ka raw data aur uska metadata store karta hai
// File object = Blob + extra metadata
//jab ham e.target.files[0] karte hai to hame ek single file ka object milta hai 

// {
//   name: "photo.png",         // file ka naam
//   type: "image/png",         // MIME type
//   size: 24567,                // bytes me size
//   lastModified: 1691502839273,// last modified timestamp
//   // Aur andar actual binary data (Blob ke form me)
// }

// 2️⃣ Blob kya hai?
// Blob = Binary Large Object

// Matlab raw binary data ka container (image, video, PDF, kuch bhi).

// File object ek special Blob hai jisme extra info (name, lastModified) hoti hai.


// 3️⃣ Preview without upload
// Agar sirf local preview chahiye:


// let file = e.target.files[0];
// let imgURL = URL.createObjectURL(file);
// document.querySelector("img").src = imgURL;
// Is case me file server pe nahi jaati, sirf local memory se display hoti hai.

// 4️⃣ Server pe upload karna
// Upload ke liye hum FormData use karte hain:


// let formData = new FormData();
// formData.append("image", file); // yahan file ek File/Blob object hai
// fetch("/upload", { method: "POST", body: formData });
//ese ham server me base64 pe convert karke use krr sakte hai

// 5️⃣ Browser FormData ko kaise bhejta hai
// Browser FormData dekhte hi request ka Content-Type set karta hai:


// multipart/form-data; boundary=----XYZ
// Boundary ek separator hota hai jo multiple fields ko alag karega jisme normal 
//text feild aur binary data me boundary add karta hai taki separation ho sake

// Binary data as-is jata hai, JSON ya Base64 me convert nahi hota.

// Example request body:

// ------XYZ
// Content-Disposition: form-data; name="username"

// ajay
// ------XYZ
// Content-Disposition: form-data; name="image"; filename="photo.png"
// Content-Type: image/png

// <raw binary bytes of the image>
// ------XYZ--




// 6️⃣ Server pe kya hota hai (multer example)
// Multer middleware upload.single("image"): ye kehta hai koi request data aaya hai jisme image ho to mujhpe bhejdo

// Request body ka multipart/form-data parse karta hai.

// "image" field ka binary chunk extract karta hai.

// Binary ko ya to disk pe save karta hai (diskStorage) to path bhi store karega object me ya memory me rakhta hai (memoryStorage) to file.buffer me actual data store kar dega binary.

// Tumhare req.file me metadata + path/buffer attach karta hai:


// req.file = {
//   fieldname: 'image',
//   originalname: 'photo.png',
//   mimetype: 'image/png',
//   size: 24567,
//   path: 'uploads/photo.png'
// }


// 7️⃣ Object ko JSON me kyun convert karte hain (binary nahi)
//ham network ke through binary data send kar sakte hai prr vo simplest form me hona chahiye as text
// Normal JS object → pointers, prototypes, circular refs contain kar sakta hai 
//  isliye hum usse serialize (JSON.stringify) karte hain kyuki ye easily send ho sakta hai.

// File/Blob me direct binary hota hai → ise serialize karne ki zarurat nahi hoti, isliye as-is bhej dete hain.


// ----------multipart form data -----------

// jab ham normal data send karte hai form ke through to vo application/x-www-form-urlencoded me bhejta hai.

// name=Ajay&email=ajay@example.com
// Ye ek single string hoti hai, simple key=value format.

// Lekin Jab ham file upload karta hai (image, pdf, video, etc.), tab data sirf string me bhejna possible nahi, kyunki file ka content binary hota hai.
// Isliye hum use bhejte hain multipart/form-data me.

// "Multipart" ka matlab hota hai → Data ko multiple parts me tod ke bhejna, jisme har part ko separate karke unke saath ek boundary hoti hai jo batati hai ki ek field ka data kahan khatam hua aur dusra field kahan se start hua.

// 2️⃣ "Boundary" ka kaam
// Boundary ek random unique string hoti hai (browser bana deta hai)
// Example:


// ----WebKitFormBoundaryXyZ123
// Ye har part ko separate karega.

// example:-
// POST /upload HTTP/1.1
// Host: example.com
// Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryXyZ123

// ------WebKitFormBoundaryXyZ123
// Content-Disposition: form-data; name="name"

// Ajay Singh
// ------WebKitFormBoundaryXyZ123
// Content-Disposition: form-data; name="email"

// ajay@example.com
// ------WebKitFormBoundaryXyZ123
// Content-Disposition: form-data; name="profilePic"; filename="photo.jpg"
// Content-Type: image/jpeg

// <binary data of the image here...>
// ------WebKitFormBoundaryXyZ123--


// 3️⃣ Browser kya karta hai jab hum FormData object use karta hai


// const formData = new FormData();
// formData.append("name", "Ajay Singh");
// formData.append("email", "ajay@example.com");
// formData.append("profilePic", fileInput.files[0]); // Image file

// fetch("/upload", {
//   method: "POST",
//   body: formData
// });

// Browser ke steps:
// FormData object ka kaam hai → saare fields ko memory me store karna, chahe wo string ho ya file.
// Browser jab request bhejta hai, tab automatically:
// Content-Type header ko set karega →Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryXyZ123

// Har field ko alag-alag part me tod dega, aur beech me boundary laga dega.

// File ka binary data as-it-is bhej dega (string me convert nahi karega).

// why formData is special formData is replica of actual form which represent we want to send data in multipart so browser can identify wese ham simple variable me bhi store kar sakte hai lekin fir hame content type ye sab khud add karna padega


// 5️⃣ Server pe kya hota hai (Multer example)
// Multer middleware:

// Request ke Content-Type check karta hai.

// Boundary read karta hai.

// Parts ko alag-alag parse karta hai.

// File parts ko disk ya memory me save karta hai.

// Text fields ko req.body me daal deta hai.

// File info ko req.file ya req.files me daal deta hai.

// Example:


// app.post("/upload", upload.single("profilePic"), (req, res) => {
//   console.log(req.body.name); // "Ajay Singh"
//   console.log(req.body.email); // "ajay@example.com"
//   console.log(req.file); // File ka path, size, mimetype, etc.
//   res.send("Done");
// });


// FileReader Kya Hai?
// FileReader ek JavaScript API hai jo hume client side (browser me) file ka content read karne deta hai.
// Yaani, agar user ne koi file choose ki (<input type="file"> se), to bina server pe bheje hum us file ka data browser me read kar sakte hain.

// Kyu use karte hai?
// Agar tumhe image ka preview dikhana ho before upload.

// Agar tumhe file ka text content read karna ho (e.g., .txt file ke andar ka text).

// Agar tumhe file ko Base64 format me convert karke server pe bhejna ho.

// Kaise kaam karta hai?
// FileReader basically file ko binary data ke form me read karta hai, fir usse alag-alag format me convert kar sakta hai:

// Text → readAsText(file)

// Base64 (Data URL) → readAsDataURL(file)

// ArrayBuffer (pure binary) → readAsArrayBuffer(file)

// Example: Image preview before upload
// html
// Copy code
// <input type="file" id="fileInput" />
// <img id="preview" width="200" />

// <script>
//   const fileInput = document.getElementById('fileInput');
//   const preview = document.getElementById('preview');

//   fileInput.addEventListener('change', () => {
//     const file = fileInput.files[0]; // user ka select kiya hua file
//     if (!file) return;

//     const reader = new FileReader();
    
//     reader.onload = () => {
//       preview.src = reader.result; // Base64 string image ke src me set
//     };
    
//     reader.readAsDataURL(file); // Base64 me convert karega
//   });
// </script>
// 📌 Kaam ka flow:

// User ne file choose ki.

// FileReader us file ko Base64 string me read karta hai.

// Hum wo Base64 string ko <img> ke src me laga dete hain.

// Image preview aa jata hai bina server pe bheje.

// Base64 Output Kaisa Dikhta Hai?
// Image ka Base64 kuch is tarah hota hai:

// bash
// Copy code
// data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...
// Ye ek string hai jisme image ka pura binary data Base64 me encode hota hai.