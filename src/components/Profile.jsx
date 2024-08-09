import { useRef, useState } from "react";
import PencilIcon from "./PencilIcon";
import Modal from "./Modal";

const Profile = () => {
  const avatarUrl = useRef(
    "https://avatarfiles.alphacoders.com/161/161002.jpg"
  );
  const [modalOpen, setModalOpen] = useState(false);

  const updateAvatar = (imgSrc) => {
    avatarUrl.current = imgSrc;
  };

  console.log(avatarUrl.current);

  // Utility function to convert Base64 to Blob
  function base64ToBlob(base64, mimeType) {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  }

  // Function to convert Base64 string to File object
  function base64ToFile(base64String, filename) {
    if (base64String.startsWith("data:")) {
      const [metadata, base64Data] = base64String.split(",");
      const mimeType = metadata.match(/:(.*?);/)[1]; // Extract the mime type
      const blob = base64ToBlob(base64Data, mimeType);

      // Create a File object from the Blob
      return new File([blob], filename, {
        type: mimeType,
        lastModified: new Date(),
      });
    } else {
      console.error("Provided string is not a valid base64 string.");
      return null;
    }
  }

  // Example usage in your React component
  const filename = "user.png"; // You can give any name you want to the file

  // Check if the current avatar URL is a base64 string
  let file = null;
  if (avatarUrl.current.startsWith("data:")) {
    file = base64ToFile(avatarUrl.current, filename);
  }

  if (file) {
    console.log(file);
  }

  return (
    <div className="flex flex-col items-center pt-12">
      <div className="relative">
        <img
          src={avatarUrl.current}
          alt="Avatar"
          className="w-[150px] h-[150px] rounded-full border-2 border-gray-400"
        />
        <button
          className="absolute -bottom-3 left-0 right-0 m-auto w-fit p-[.35rem] rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-600"
          title="Change photo"
          onClick={() => setModalOpen(true)}
        >
          <PencilIcon />
        </button>
      </div>
      <h2 className="text-white font-bold mt-6">Mack Aroney</h2>
      <p className="text-gray-500 text-xs mt-2">Software Engineer</p>
      {modalOpen && (
        <Modal
          updateAvatar={updateAvatar}
          closeModal={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Profile;
