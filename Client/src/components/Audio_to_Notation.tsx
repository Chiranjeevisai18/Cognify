import { useState } from "react";
import axios from "axios";
import Notation from "./Notation";

function Audio_to_Notation() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [notationData, setNotationData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setNotationData(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-3xl font-bold mb-6">🎼 Audio to Notation</h1>
      
      <input type="file" accept="audio/wav" onChange={handleFileChange} className="mb-4" />
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
        disabled={!selectedFile || loading}
      >
        {loading ? "Processing..." : "Upload & Convert"}
      </button>

      {notationData && <Notation data={notationData} />}
    </div>
  );
}

export default Audio_to_Notation;
