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
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useSWR from "swr";
import { useFetcher } from "~/hooks/fetcher";
import { useAuth } from "@clerk/clerk-react";
import { Input } from "~/components/ui/input";
import { useToast } from "~/components/ui/use-toast";
import { ToastAction } from "~/components/ui/toast";
import Link from "next/link";

const formSchema = z.object({
  forum: z.string({
    required_error: "Forum is required",
  }),
  imageUrl: z.string().default(""),
  title: z.string({
    required_error: "Title is required",
  })
});

export default function Home() {
  const { toast } = useToast();
  const [value, setValue] = useState("");
  const { quill, quillRef } = useQuill();
  const { allForums, createPost } = useFetcher();
  const { data: forums, error } = useSWR("/forums", allForums);
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
          forumId: forums?.find(
            (forum) => forum.slug === form.getValues("forum")
          )?.id,
          imageUrl: form.getValues("imageUrl"),
        },
        token
      );
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

      quill?.setText("");
    } catch (e) {
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

  return (
    <div className="">
      <Posts />
    </div>
  );
}
