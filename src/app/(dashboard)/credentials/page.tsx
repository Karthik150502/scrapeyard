import React, { Suspense } from 'react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { LockKeyhole, ShieldIcon, ShieldOffIcon } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { getCredentialsForUser } from '@/actions/credentials/getCredentialsForUser'
import { Card } from '@/components/ui/card'
import CreateCredentialDialog from './_components/CreateCredentialDialog'
import { formatDistanceToNow } from 'date-fns'
import DeleteCredentialDialog from './_components/DeleteCredentialsDialog'
export default function CredentialsPage() {
    return (
        <div className='flex flex-1 flex-col h-full'>
            <div className='flex justify-between items-center'>
                <div className='flex flex-col'>
                    <h1 className="text-3xl font-bold">Credentials</h1>
                    <p>Manage your credentials</p>
                </div>
                <CreateCredentialDialog />
            </div>
            <div className='h-full py-6 space-y-8'>
                <Alert>
                    <ShieldIcon className='h-4 w-4 stroke-primary' />
                    <AlertTitle className='text-primary'>Encryption</AlertTitle>
                    <AlertDescription>All information is securely encrypted, ensuring your data remains safe.</AlertDescription>
                </Alert>
                <Suspense fallback={<Skeleton className='h-[300px] w-full' />}>
                    <UserCredentials />
                </Suspense>
            </div>
        </div>
    )
}


async function UserCredentials() {
    const credentials = await getCredentialsForUser();
    if (!credentials) {
        return <div className=''>Something went wrong</div>
    }

    if (credentials.length === 0) {
        return <Card className='p-4 w-full'>
            <div className='flex flex-col items-center justify-center gap-4'>
                <div className='rounded-full bg-accent w-20 h-20 flex items-center justify-center'>
                    <ShieldOffIcon strokeWidth={1} size={40} className='stroke-primary' />
                </div>
                <div className='flex flex-col gap-1 text-center'>
                    <p className='font-bold'>No credentials created yet</p>
                    <p className="text-xs text-muted-foreground">Click the button below to create your first credential</p>
                </div>
                <CreateCredentialDialog triggerText='Create your first credential' />
            </div>
        </Card>
    }

    return <div className="flex gap-2 flex-wrap">
        {
            credentials.map((item) => {
                const createdAt = formatDistanceToNow(item.createdAt, { addSuffix: true });
                return <Card key={item.id} className='w-full p-4 flex justify-between'>
                    <div className='flex items-denter gap-2'>
                        <div className='rounded-full bg-primary/20 w-8 h-8 flex items-center justify-center'>
                            <LockKeyhole size={18} className='stroke-primary' />
                        </div>
                        <div>
                            <p className='font-bold'>{item.name}</p>
                            <p className='text-xs text-muted-foreground'>{createdAt}</p>
                        </div>
                    </div>
                    <DeleteCredentialDialog name={item.name} />
                </Card>
            })
        }
    </div>
}



