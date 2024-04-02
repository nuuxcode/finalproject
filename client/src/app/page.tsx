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
import {useAuth} from '@clerk/clerk-react'
import { get } from "http";

const formSchema = z.object({
  forum: z.string({
    required_error: "Forum is required",
  }),
  content: z.string({
    required_error: "Content is required",
  }),
});
export default function Home() {
  const [value, setValue] = useState("");
  const { quill, quillRef } = useQuill();
  const [forum, setForum] = useState("");
  const { allForums, createPost } = useFetcher();
  const { data: forums, error } = useSWR("/forums", allForums);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const {isSignedIn, getToken} = useAuth()

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(await getToken())
    const res = await createPost({
      title: value.slice(0, 10),
      content: value,
      forumId: forums?.find((forum) => forum.slug === form.getValues('forum'))
        ?.id,
    }, await getToken());
    // console.log(quill?.getText());
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
     {forums && <div className="px-4 py-10">
        {isSignedIn && <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 md:max-w-[600px] mx-auto">
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
            <div ref={quillRef} />
            <Button
              variant={"default"}
              className="place-self-end font-bold"
              type="button"
              onClick={onSubmit}
            >
              Post
            </Button>
          </form>
        </Form>}
      </div>}
      <Posts />
    </div>
  );
}
