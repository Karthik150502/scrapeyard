import { ParamProps } from '@/types/appNode'
import React, { useId } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '@clerk/nextjs';
import { getCredentialsForUser } from '@/actions/credentials/getCredentialsForUser';

export default function CredentialParam({
    param,
    updateNodeParamValue,
    value
}: ParamProps) {
    const id = useId();
    const { user } = useUser();

    const creds = useQuery({
        queryKey: ["credentials", user?.id],
        queryFn: async () => {
            return getCredentialsForUser();
        },
        refetchInterval: 10000
    })

    return (
        <div className='flex flex-col gap-1 w-full'>
            <Label htmlFor={id} className='text-xs flex'>
                {param.name}
                {param.required && <p className='text-red-400 px-2'>*</p>}
            </Label>
            <Select
                onValueChange={(value) => updateNodeParamValue(value)}
                defaultValue={value}
            >
                <SelectTrigger className='w-full'>
                    <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel >Credentials</SelectLabel>
                        {
                            creds?.data && creds.data.map(item => {
                                return <SelectItem key={item.id} value={item.id}>
                                    {item.name}
                                </SelectItem>
                            })
                        }
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div >
    )
}


