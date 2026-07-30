import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
     return [
          {
               url: "https://oasisintech.com",
               priority: 1,
               changeFrequency: "weekly",
          },

          {
               url: "https://oasisintech.com/about",
               priority: 0.8,
          },

          {
               url: "https://oasisintech.com/courses",
               priority: 0.9,
          },

          {
               url: "https://oasisintech.com/contact",
               priority: 0.7,
          },

          {
               url: "https://oasisintech.com/blog",
               priority: 0.9,
          },
     ];
}