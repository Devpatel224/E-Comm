import { filterOptions } from '@/config'
import React, { Fragment } from 'react'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '../ui/separator'


function Filter() {
  return (
    <div className='bg-background rounded-lg shadow-sm'> 
        <div className='p4 border-b '>
            <h2 className='text-lg font-extrabold'>Filters</h2>
        </div>
        <div className='p-4 space-y-4'>
            {
                Object.keys(filterOptions).map((keyItem) => ( <Fragment key={keyItem}>
                    <div>
                        <h3 className='text-base font-bold'>{keyItem}</h3>
                    
                    <div className='grid gap-2 mt-2'>
                        {
                            filterOptions[keyItem].map((item) => (
                                <Label className="flex items-center gap-2 font-normal" key={item.value}>
                                    <Checkbox id={item.value}/>
                                    {item.label}
                                </Label>
                            ))
                        }
                    </div>
                    </div>
                    <Separator/>
                </Fragment>
                ))
            }
        </div>
    </div>
  )
}

export default Filter