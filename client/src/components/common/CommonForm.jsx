import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from '../ui/textarea';

function CommonForm({ formControls, formData, setFormData, onsubmit, buttonText , isbtnDisabled  }) {

  const renderInputsByComponentType = (controlItem) => {
    let element = null
    let value = formData[controlItem.name] || ''


    switch (controlItem.componentType) {
      case 'input':
        element =
          <Input
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            type={controlItem.type}
            value={value}
            className={controlItem.className ? controlItem.className : ''} 
            onChange={event => setFormData({
              ...formData,
              [controlItem.name]: event.target.value
            })}
          >
          </Input>

        break;

      case 'select':
        element = <Select onValueChange={(value) => {
          setFormData({
            ...formData,
            [controlItem.name]: value
          })
        }} value={value}>
          <SelectTrigger className='w-full'>
            <SelectValue placeholder={controlItem.label} />
          </SelectTrigger>
          <SelectContent>
            {
              controlItem.options && controlItem.options.length > 0 ? controlItem.options.map(option => (
                <SelectItem key={option.id} value={option.id}>{option.label}</SelectItem>
              )) : null
            }

          </SelectContent>
        </Select>

        break;

      case 'textarea':
        element = <Textarea
          name={controlItem.name}
          placeholder={controlItem.placeholder}
          id={controlItem.id}
          value={value}
          onChange={event => setFormData({
            ...formData,
            [controlItem.name]: event.target.value
          })}
        >
        </Textarea>

        break;

      default:
        element = <Input
          name={controlItem.name}
          placeholder={controlItem.placeholder}
          type={controlItem.type}
          value={value}
          onChange={event => setFormData({
            ...formData,
            [controlItem.name]: event.target.value
          })}
        >
        </Input>
        break;
    }
    return element
}

  return (
    <form onSubmit={onsubmit}>
      <div className='flex flex-col gap-3'>
        {
          formControls.map((controlItem, ind) => <div className='grid w-full gap-1.5' key={controlItem.name}>
            <Label className='mb-1'>{controlItem.label}</Label>
            {
              renderInputsByComponentType(controlItem)
            }
          </div>)
        }
      </div>
      <Button disabled={isbtnDisabled} type='submit' className='mt-2 w-full'   >{buttonText || "submit"}</Button>
    </form>
  )
}

export default CommonForm