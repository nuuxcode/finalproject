"use client";

import { useState, useEffect } from "react";
import Posts from "~/components/posts/posts";
import { useQuill } from "react-quilljs";
import { Button } from "~/components/ui/button";
import { useForm } from "react-hook-form";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useSWR from "swr";
import { useFetcher } from "~/hooks/fetcher";
import { useAuth } from "@clerk/clerk-react";
import { Input } from "~/components/ui/input";
import { useToast } from "~/components/ui/use-toast"
import { ToastAction } from "~/components/ui/toast";
import Link from "next/link";


const formSchema = z.object({
  forum: z.string({
    required_error: "Forum is required",
  }),
  imageUrl: z.string().default(""),
});

export default function Home() {
  const {toast} = useToast();
  const [value, setValue] = useState("");
  const { quill, quillRef } = useQuill();
  const [forum, setForum] = useState("");
  // const [imageUrl, setImageUrl] = useState("");
  const { allForums, createPost } = useFetcher();
  const { data: forums, error, mutate } = useSWR("/forums", allForums);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { isSignedIn, getToken } = useAuth();

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("data");
    const token = await getToken();
    if (token === null) {
      console.error("Token is null");
      return;
    }
    try {
      const res = await createPost(
        {
          title: value.slice(0, 10),
          content: value,
          forumId: forums?.find((forum) => forum.slug === form.getValues("forum"))
            ?.id,
          imageUrl: form.getValues("imageUrl"),
        },
        token
      );
      console.log(res);
      toast({
        title: "Post created sucessfully",
        description: "Your post has been created",
        action: <ToastAction altText="View post">
          <Link href={`/post/${res.id}`}>
            View post
          </Link>
          </ToastAction>,
      });
      form.reset();
      quill?.setText("");
      mutate();
    }
    catch (e) {
      console.error(e);
      toast({
        title: "Error creating post",
        description: "An error occurred while creating your post",
      });
    }
  }

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setValue(quill.getText());
      });
    }
  }, [quill]);

  // const handleChange = (event) => {
  //   setForum(event.target.value);
  // }

  return (
    <div className="">
      {forums && (
        <div className="px-4 py-6">
          {isSignedIn && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4 md:max-w-[600px] mx-auto"
              >
                <div className="flex gap-4">
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
                                <SelectItem key={forum.id} value={forum.slug}>
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
                <div ref={quillRef} />
                <Button
                  variant={"default"}
                  className="place-self-end font-bold"
                  type="button"
                  onClick={form.handleSubmit(onSubmit)}
                >
                  Post
                </Button>
              </form>
            </Form>
          )}
        </div>
      )}
      <Posts />
    </div>
  );
}
