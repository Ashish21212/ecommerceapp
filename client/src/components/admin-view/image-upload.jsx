import React from 'react'
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useRef } from 'react';
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react';
import { Button } from '../ui/button';

const ProductImageUpload = ({
  imageFile, 
  setImageFile,
  uploadedImageUrl, 
  setUploadedImageUrl
}) => {
  const inputRef = useRef(null);

  const handleImageFileChange = (event) => {
    console.log(event.target.files,'event.target.files');
    const selectedFile = event.target.files?.[0]
    if (selectedFile) setImageFile(selectedFile);
    

  }
  const handleDragOver = (event) => {
event.preventDefault()


  }
  
  const handleDrop = (event) => {
    event.preventDefault()
    const droppedFile = event.dataTransfer.files?.[0];
    // console.log(droppedFile);
    if(droppedFile) {
      setImageFile(droppedFile);
      console.log(droppedFile);
    }
   
  }
  

   function handleRemoveImage() {
       setImageFile(null);
       if(inputRef.current) {
          inputRef.current.value = ''
       }
   }

// console.log(imageFile);
  return (
    <div className='w-full max-w-md mx-auto'>
       <Label className='text-lg font-semibold mb-2 block'>Upload Images </Label>
       <div onDragOver={handleDragOver}  onDrop={handleDrop} className='border-2 border-dashed rounded-lg p-4 mt-4 '>
        <Input 
        id='image-upload' 
        type='file' 
        className='hidden' 
        ref={inputRef} 
        onChange={handleImageFileChange}/>
       {
        !imageFile ?(
        <Label htmlFor='image-upload' className='flex flex-col items-center justify-enter h-32 cursor-pointer' >
        <UploadCloudIcon className='-10 h-10 text-muted-forground mb-2'/>
        <span>Drag and Drop or click to upload image</span>

        </Label>
        ) : (
          <div className='flex items-center justify-between '>
            <div className='flex items-center'>
              <FileIcon className='w-8 text-primary mr-2 h-8'/>
            </div>
            <p className='text-sm font-medium'>{imageFile.name}</p>
            <Button variant='ghost' size='icon' className='text-muted-foground hover:text-foreground' onClick={handleRemoveImage}>
              <XIcon className='w-4 h-4'/>
              <span className='sr-only'>Remove File</span>

    
            </Button>
          </div>


       )}
       </div>
    </div>
  )
}

export default ProductImageUpload;
