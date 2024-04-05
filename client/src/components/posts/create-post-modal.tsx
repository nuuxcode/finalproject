import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFetcher } from "~/hooks/fetcher";
import { useAuth } from "@clerk/clerk-react";
import { Input } from "~/components/ui/input";
import { useToast } from "~/components/ui/use-toast";
import { ToastAction } from "~/components/ui/toast";
import { useQuill } from "react-quilljs";
import Link from "next/link";
import useSWR from "swr";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
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
  DialogTrigger,
} from "~/components/ui/dialog";
import { Textarea } from "~/components/ui/textarea";
import CirclePopLoader from "react-loaders-kit/lib/circlePop/CirclePopLoader";

interface CreatePostModalProps {
  open: boolean;
  setOpen: () => void;
}

const formSchema = z.object({
  forum: z.string({
    required_error: "Forum is required",
  }),
  imageUrl: z.string().default(""),
  title: z.string({
    required_error: "Title is required",
  }),
  content: z.string({
    required_error: "Content is required",
  }),
});

export default function CreatePostModal({
  open,
  setOpen,
}: CreatePostModalProps) {
  const { toast } = useToast();
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const { quill, quillRef } = useQuill();
  const { isSignedIn, getToken } = useAuth();
  const { allForums, createPost } = useFetcher();
  const { data: forums, error } = useSWR("/forums", allForums);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setValue(quill.getText());
      });
    }
  }, [quill]);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setLoading(true);
    const token = await getToken();
    if (token === null) {
      console.error("Token is null");
      return;
    }
    try {
      const res = await createPost(
        {
          title: data.title,
          content: data.content,
          forumId: forums?.find(
            (forum) => forum.slug === form.getValues("forum")
          )?.id,
          imageUrl: data.imageUrl,
        },
        token
      );
      setLoading(false);
      toast({
        title: "Post created sucessfully",
        description: "Your post has been created",
        action: (
          <ToastAction altText="View post">
            <Link href={`/post/${res.id}`}>View post</Link>
          </ToastAction>
        ),
      });
      form.reset();
      setOpen();

      //   quill?.setText("");
    } catch (e) {
      setLoading(false);
      console.error(e);
      toast({
        title: "Error creating post",
        description: "An error occurred while creating your post",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/*<DialogTrigger>Open</DialogTrigger>*/}
      <DialogContent className="max-w-[90%] md:max-w-[50%]">
        <DialogHeader>
          <DialogTitle>Create a post</DialogTitle>
          <DialogDescription>
            Share your thoughts with the world. You can attach an image to your
            post by pasting the URL in the input field.
          </DialogDescription>
          {forums && (
            <div className="px- py-2">
              {isSignedIn && (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-8 mx-auto"
                  >
                    <div className="flex gap-2 md:gap-4">
                      <FormField
                        control={form.control}
                        name="forum"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Forum</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder="Forum" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {forums &&
                                  forums.map((forum) => (
                                    <SelectItem
                                      key={forum.id}
                                      value={forum.slug}
                                    >
                                      {forum.name}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      ></FormField>
                      <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Attach image</FormLabel>
                            <FormControl>
                              <div className="flex gap-4">
                                <Input
                                  type="text"
                                  placeholder="Image URL"
                                  className="placeholder:text-sm"
                                  {...field}
                                  onChange={field.onChange}
                                  value={field.value}
                                  name="imageUrl"
                                />
                                {/* <Button variant={"default"} type="button">
                              Upload
                            </Button> */}
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      ></FormField>
                    </div>
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-start">Title</FormLabel>
                          <FormControl>
                            <div className="">
                              <Input
                                type="text"
                                placeholder="Something short and sweet"
                                className="placeholder:text-sm"
                                {...field}
                                onChange={field.onChange}
                                value={field.value}
                                name="title"
                              />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    ></FormField>
                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-start w-100">
                            Content
                          </FormLabel>
                          <FormControl>
                            <div className="">
                              <Textarea
                                placeholder="More details about your post"
                                className="placeholder:text-sm text-[16px]"
                                {...field}
                                onChange={field.onChange}
                                value={field.value}
                                name="content"
                              />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    ></FormField>
                    {/* <div ref={quillRef} /> */}
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
                        Create post
                      </Button>
                    )}
                  </form>
                </Form>
              )}
            </div>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
