import Home from "@/components/Home/Home";
import axios from "axios";

const getPosts = async (start: string) => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=20`);
  return response.data;
}

const getPictures = async (start: string) => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=20`);
  return response.data;
}

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {

  const activetab = searchParams?.tab || "posts";

  // console.log(searchParams?.tab, activetab);

  const start = searchParams?._start || 0;



  const response = activetab === "posts" ? await getPosts(start as string) : await getPictures(start as string);

  // console.log(response, activetab)
  return (

    <Home activetab={activetab as string} response={response} />

  );
}