import React, { useState } from "react";
import DragDropFiles from "../../components/dragdrop/DragDropFiles";

export default function DragDropPage() {
  const [images, setImages] = useState([]);
  //const [videos, setVideos] = useState([]);

  //console.log(images);
  //console.log(videos);

  return (
    <div className="dragdrop-page">
      <DragDropFiles
        setFiles={setImages}
        accepts="image/png,image/jpg,image/jpeg"
      />

      {images.length > 0 && (
        <div className="temp-images">
          {images.map((image, index) => (
            <img key={index} src={URL.createObjectURL(image)} />
          ))}
        </div>
      )}
      {/* <DragDropFiles setFiles={setVideos} accepts="video/mp4" /> */}
    </div>
  );
}
