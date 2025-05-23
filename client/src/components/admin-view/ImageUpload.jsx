import { UploadCloudIcon, XIcon, FileIcon } from "lucide-react"
import { useEffect, useRef } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import axios from "axios"
import { Skeleton } from "../ui/skeleton"


function ImageUpload({ imageFile, setImageFile, uploadedImageUrl, setUploadedImageUrl,imageLoadingState , isEditMode}) {

    const inputRef = useRef(null)

    const handleImageFileChange = (e) => {

        const selectedFile = e.target.files?.[0]
        if (selectedFile) {
            setImageFile(selectedFile)
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault()

    }

    const handleDrop = (e) => {
        e.preventDefault()
        const droppedFile = e.dataTransfer.files?.[0]
        if (droppedFile) setImageFile(droppedFile)
    }

    const handleRemoveImage = () => {
        setImageFile(null)
        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }

    const uploadImagetoCloudinary = async () => {
        const data = new FormData()
        data.append("my_file", imageFile)
        const res = await axios.post("http://localhost:3000/admin/products/upload-image", data, {
            withCredentials: true,
        })

        if(res.data?.result) setUploadedImageUrl(res.data.result?.url)
      
    }

    useEffect(() => {
        if (imageFile !== null) uploadImagetoCloudinary()
    }, [imageFile])

    

    return (
        
        <div className='w-full max-w-md mx-auto mt-4'>
            <Label className='text-lg font-semibold mb-2 block'>Upload Image</Label>
            <div onDragOver={handleDragOver} onDrop={handleDrop} className={`${isEditMode?'opacity-60':'' }border-2 border-dashed rounded-lg p-4 `}>
                <Input id="image-upload" type="file" className="hidden" ref={inputRef} onChange={handleImageFileChange} disabled={isEditMode}></Input>

                {
                    !imageFile ?
                        <Label htmlFor='image-upload' className={`${isEditMode ? 'cursor-not-allowed' : ""} flex flex-col items-center justify-center h-32 cursor-pointer`}>
                            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-5" />
                            <span>Drag & Drop or click to upload Image</span>
                        </Label> : (
                             imageLoadingState ? <Skeleton className='bg-gray-200' />:
                            <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <FileIcon className='w-8 text-primary mr-2 h-8' />
                            </div>
                            <p className="text-sm">{imageFile.name}</p>
                            <Button variant='ghost' size='icon' className='text-muted-foreground hover:text-foreground' onClick={handleRemoveImage}>
                                <XIcon className="w-4 h-4">
                                    <span className="sr-only">Remove File</span>
                                </XIcon>
                            </Button>
                        </div>)
                }
            </div>
        </div>
    )
}

export default ImageUpload