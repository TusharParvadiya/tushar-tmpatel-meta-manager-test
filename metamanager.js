import React, { useEffect, useState } from "react";
import { populateHead } from "./meta-index";
const Metamanager = ({ children, ...props }) => {
  const [data, setData] = useState({});
  const [cacheSet,setCacheSet] = useState({})
  const [metaData, setMetaData] = useState([]);
  const { pathname } =
    typeof window !== "undefined" ? window.location : { pathname: null };
  const { title, description } = props;
  // if(cacheSet.cacheData == null){
  //   console.log('null')
  // }
  // else{
  // }
  useEffect(() => {
    fetch(
      "https://api.metamanager.io/website/v1/websites/79078020/urls?view=last-edited&status=pixel&page=1&pageSize=25000",
      {
        method: "GET",

        headers: {
          Authorization:
            "Bearer c69e3039cdb62fedef71fd8be927df2a7593a2a6335bc5db78c79be2505da3e2dbf9685b03041d8d90baa19332945798",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        const item = res.items.find((i) => i.url == pathname);
        populateHead(item, title, description);
        setData(res.items.map((i) => i.meta.tag));
        setMetaData(item.meta);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const addMultipleCacheData = async (cacheList) => {
      for (var i = 0; i < cacheList.length; i++) {
        // Converting our response into Actual Response form
        const cacheData = new Response(JSON.stringify(cacheList[i].cacheData));

        if ("caches" in window) {
          // Opening given cache and putting our data into it
          var cache = await caches.open(cacheList[i].cacheName);
          cache.put(cacheList[i].url, cacheData);
        }
      }
     
    };
    const CacheToBeStored = [
      { cacheName: pathname, cacheData: metaData, url: pathname },
    ];
    setCacheSet(CacheToBeStored)
    console.log(cacheSet)
    addMultipleCacheData(CacheToBeStored);
  
  }, [data]);


// useEffect(() => {

//   const getAllCacheData = async () => {
//     const url = pathname
  
//     // List of all caches present in browser
//     const names = await caches.keys()
  
//     const cacheDataArray = []
  
//     // Iterating over the list of caches
//     names.forEach(async(name) => {
  
//       // Opening that particular cache
//       const cacheStorage = await caches.open(name);
  
//       // Fetching that particular cache data
//       const cachedResponse = await cacheStorage.match(url);
//       const data = await cachedResponse.json()
  
//       // Pushing fetched data into our cacheDataArray
//       cacheDataArray.push(data)
//       setHome(cacheDataArray.join(', '))
 
//     })
//     getAllCacheData()
 
//   };
//   console.log()
// },[])

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if ("caches" in window) {
  //       caches.delete(pathname).then(function (res) {
  //         return res;
  //       });
  //     }
  //   }, 604800000);
  //   return () => clearTimeout(timer);
  // }, []);

  return <>{children}</>;
};

export default Metamanager;
