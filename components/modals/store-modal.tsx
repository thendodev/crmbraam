"use client"
import { useForm } from "react-hook-form";
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import { useStoreModal } from "@/hooks/use-store-modal"
import { Modal } from "../ui/modal"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"

const FormSchema = z.object({
    name : z.string().min(1)
});

type FormProps = z.infer<typeof FormSchema>

export const StoreModal = ()=> {
    const storeModal = useStoreModal(state=> state);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast()

    const form = useForm<FormProps>({
        resolver : zodResolver(FormSchema),
        defaultValues: {
            name: ""
        }
    });

    const onSubmit = async (values : FormProps)=>{
        try{
            setLoading(true);
            const {data} = await axios.post("/api/stores", values);
            toast({ title: "Success", description: `succesfully created store ${data.name}` }) 
        }catch(e){
            console.log(e)
        }finally{
            setLoading(false);
        }
    }



    return (
        <Modal title="Create Store"
            description="Add a new store to manage products ande categories"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
            >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                        control={form.control}
                        name="name"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>
                                    name
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="E-Commerce" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="pt-6 space-x-2 flex items-center justify-center">
                        <Button variant="outline" type="submit">
                            Create
                        </Button>
                        <Button onClick={storeModal.onClose}>
                            Cancel
                        </Button>
                    </div>
                    </form>
                </Form>
            </Modal>
    )
}