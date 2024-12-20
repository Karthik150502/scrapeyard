'use client'
import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { CoinsIcon, CreditCard } from 'lucide-react'
import { CreditsPack, PackId } from '@/types/billing'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { purchaseCredits } from '@/actions/billing/purchaseCredits'
export default function CreditsPurchase() {

    const [selectedPack, setSelectedPack] = useState<PackId>(PackId.MEDIUM);

    const mutation = useMutation({
        mutationFn: purchaseCredits,
        onSuccess: () => {

        },
        onError: () => {

        }

    })


    return (
        <Card>
            <CardHeader>
                <CardTitle className='text-2xl font-bold lex items-center gap-2'>
                    <CoinsIcon className='h-6 w-6 text-primary' />
                    Purchase Credits
                </CardTitle>
                <CardDescription>
                    Select the number of credits you want to purchase
                </CardDescription>
            </CardHeader>
            <CardContent >
                <RadioGroup onValueChange={value => setSelectedPack(value as PackId)} value={selectedPack}>
                    {
                        CreditsPack.map(pack => {
                            return <div key={pack.id} className='flex items-center space-x-3 bg-secondary/50 rounded-lg hover:bg-secondary p-3' onClick={() => setSelectedPack(pack.id)}>
                                <RadioGroupItem value={pack.id} id={pack.id} />
                                <Label className='w-full flex justify-between cursor-pointer'>
                                    <span className='font-medium'>{pack.name} - {pack.label}</span>
                                    <span className='font-bold text-primary'>
                                        &#8377; {(pack.price / 100).toFixed(2)}
                                    </span>
                                </Label>
                            </div>
                        })
                    }
                </RadioGroup>
            </CardContent>
            <CardFooter>
                <Button
                    className='w-full'
                    disabled={mutation.isPending}
                    onClick={() => mutation.mutate(selectedPack)}
                >
                    <CreditCard className='mr-2 h-5 w-5' />
                    Purchase Credits
                </Button>
            </CardFooter>
        </Card>
    )
}
