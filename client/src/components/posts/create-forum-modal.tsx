import { useState } from "react";
import { Button } from "~/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFetcher } from "~/hooks/fetcher";
import { useAuth } from "@clerk/clerk-react";
import { Input } from "~/components/ui/input";
import { useToast } from "~/components/ui/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Textarea } from "~/components/ui/textarea";
import CirclePopLoader from "react-loaders-kit/lib/circlePop/CirclePopLoader";

interface CreateForumModalProps {
  open: boolean;
  setOpen: () => void;
}

const formSchema = z.object({
  name: z.string({
    required_error: "Forum is required",
  }),
  description: z.string().default(""),
  logo: z.string().default(""),
  banner: z.string().default(""),
  slug: z.string({
    required_error: "Slug is required",
  }),
});

export default function CreateForumModal({
  open,
  setOpen,
}: CreateForumModalProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { isSignedIn, getToken } = useAuth();
  const { createForum } = useFetcher();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setLoading(true);
    const token = await getToken();
    if (token === null) {
      console.error("Token is null");
      return;
    }
    try {
      const res = await createForum(
        {
          name: data.name,
          slug: data.slug,
          description: data.description,
          logo: data.logo,
          banner: data.banner,
        },
        token
      );
      console.log(res);
      setLoading(false);
      toast({
        title: "Forum created successfully",
        description: "Your forum has been created",
        duration: 2000,
      });
      form.reset();
      setOpen();
    } catch (e) {
      setLoading(false);
      console.error(e);
      toast({
        title: "Error creating forum",
        description: "An error occurred while creating your forum",
      });
    }
  }

  console.log(form.formState.errors)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/*<DialogTrigger>Open</DialogTrigger>*/}
      <DialogContent className="max-w-[90%] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create a forum</DialogTitle>
          <DialogDescription>
            Create a forum. For now if you have a logo and banner, you can paste
            the URL in the respective fields.
          </DialogDescription>
          <div className="px- py-8">
            {isSignedIn && (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col items-start justify-center gap-8 mx-auto w-100"
                >
                  <div className="flex gap-2 md:gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-start">Forum</FormLabel>
                          <FormControl>
                            <div className="flex gap-4">
                              <Input
                                type="text"
                                placeholder="Forum name"
                                className="placeholder:text-sm"
                                {...field}
                                onChange={field.onChange}
                                value={field.value}
                                name="name"
                              />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    ></FormField>
                    <FormField
                      control={form.control}
                      name="slug"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-start">Slug</FormLabel>
                          <FormControl>
                            <div className="flex gap-4">
                              <Input
                                type="text"
                                placeholder="A slug for your forum"
                                className="placeholder:text-sm"
                                {...field}
                                onChange={field.onChange}
                                value={field.value}
                                name="slug"
                              />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    ></FormField>
                  </div>
                  <div className="flex gap-4">
                    <FormField
                      control={form.control}
                      name="logo"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-start">Logo</FormLabel>
                          <FormControl>
                            <div className="">
                              <Input
                                type="text"
                                placeholder="Logo for your forum"
                                className="placeholder:text-sm"
                                {...field}
                                onChange={field.onChange}
                                value={field.value}
                                name="logo"
                              />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    ></FormField>
                    <FormField
                      control={form.control}
                      name="banner"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-start w-100">
                            Banner image
                          </FormLabel>
                          <FormControl>
                            <div className="">
                              <Input
                                placeholder="Banner"
                                type="text"
                                className="placeholder:text-sm text-[16px]"
                                {...field}
                                onChange={field.onChange}
                                value={field.value}
                                name="banner"
                              />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    ></FormField>
                  </div>
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="flex flex-col justify-start  w-[100%] md:w-[100%]">
                        <FormLabel className="text-start">
                          Description
                        </FormLabel>
                        <FormControl>
                          <div className="">
                            <Textarea
                              placeholder="More details about your forum"
                              className="placeholder:text-sm text-[16px]"
                              {...field}
                              onChange={field.onChange}
                              value={field.value}
                              name="description"
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  ></FormField>
                  {loading ? (
                    <div className="place-self-end">
                      <CirclePopLoader
                        loading={loading}
                        size={20}
                        color="#FFCA28"
                      />
                    </div>
                  ) : (
                    <Button
                      variant={"default"}
                      className="place-self-end font-bold"
                      type="button"
                      disabled={loading}
                      onClick={form.handleSubmit(onSubmit)}
                    >
                      Create forum
                    </Button>
                  )}

                  {/* <div ref={quillRef} /> */}
                </form>
              </Form>
            )}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
