import { UploadCloudIcon, XIcon ,FileIcon } from "lucide-react"
import { useRef } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"


function ImageUpload({imageFile,setImageFile,uploadedImageUrl,setUploadedImageUrl}) {

    const inputRef = useRef(null)

    const handleImageFileChange = (e)=>{
        console.log(e.target.files);

        const selectedFile = e.target.files?.[0]
        if(selectedFile){
            setImageFile(selectedFile)
        }
    }

    const handleDragOver = (e)=>{
        e.preventDefault()

    }

    const handleDrop = (e)=>{
        e.preventDefault()
        const droppedFile =  e.dataTransfer.files?.[0]
        if(droppedFile) setImageFile(droppedFile)
    }

    const handleRemoveImage = ()=>{
        setImageFile(null)
        if(inputRef.current){
            inputRef.current.value = ''
        }
    }

  return (
    <div className='w-full max-w-md mx-auto mt-4'>
        <Label className='text-lg font-semibold mb-2 block'>Upload Image</Label>
        <div onDragOver={handleDragOver} onDrop={handleDrop} className="border-2 border-dashed rounded-lg p-4 ">
            <Input id="image-upload" type="file" className="hidden" ref={inputRef} onChange={handleImageFileChange}></Input>

            {
                !imageFile ?
                <Label htmlFor='image-upload' className='flex flex-col items-center justify-center h-32 cursor-pointer'>
                    <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-5"/>
                    <span>Drag & Drop or click to upload Image</span>
                </Label>: <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <FileIcon className='w-8 text-primary mr-2 h-8'/>
                    </div>
                    <p className="text-sm">{imageFile.name}</p>
                    <Button variant='ghost' size='icon' className='text-muted-foreground hover:text-foreground' onClick={handleRemoveImage}>
                        <XIcon className="w-4 h-4">
                            <span className="sr-only">Remove File</span>
                        </XIcon>
                    </Button>
                </div>
            }
        </div>
    </div>
  )
}

export default ImageUpload