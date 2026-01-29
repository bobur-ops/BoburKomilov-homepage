import { defineCollection } from "astro:content";
import { notionLoader } from "@chlorinec-pkgs/notion-astro-loader";
import { variables } from "./config/variables";

const database = defineCollection({
  loader: notionLoader({
    auth: variables.notionToken,
    database_id: variables.databaseId,

    imageSavePath: "assets/images/notion",

    filter: {
      property: "published",
      checkbox: { equals: true },
    },
  }),
});

export const collections = { database };
