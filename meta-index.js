export const populateHead = (item, title, description) => {
    if (item.meta) {
      PopulateMeta(item.meta, title , description)
      // JsonLd(item)
    }
    // if (item) {
    //   populateJsonLd(item)
    // }
  }
  export const PopulateMeta = (meta, title, description) => {
    if (meta.tag !== null) {
      //TODO : create separate function for this.
      //  const meta_tag = () => { }
      //set title
      document.title = meta.tag.title || title
  
      //set meta description
      const meta_tags = document.getElementsByTagName('meta')
      let found = false
      for (const m of meta_tags) {
        if (m.name == 'description') {
          m.content = meta.tag.description || description
          found = true
        }
      }
      if (!found) {
        const new_meta = document.createElement('meta')
        new_meta.setAttribute('name', 'description')
        new_meta.setAttribute('content', meta.tag.description || description)
        document.head.appendChild(new_meta)
      }
    }
  
    const metaAdder = (meta, value) => {
      // Get an element if it exists already
      let element = document.querySelector(`meta[${meta}]`)
  
      // Check if the element exists
      if (element) {
        element.setAttribute('content', value)
        // If it does just change the content of the element
      } else {
        ;(element ) = `<meta ${meta} content="${value}" />`
        // And insert it into the head
        document.head.insertAdjacentHTML('beforeend', element )
      }
    }
    const metaUrl = (meta, value) => {
      // Get an element if it exists already
      let element = document.querySelector(`meta[${meta}]`)
  
      // Check if the element exists
      if (element) {
        element.setAttribute('href', value)
        // If it does just change the content of the element
      } else {
        ;(element ) = `<meta ${meta} href="${value}" />`
        // And insert it into the head
        document.head.insertAdjacentHTML('beforeend', element)
      }
    }
  
    if (meta.tag.canonical) {
      metaAdder('property="canonical"', meta?.tag?.canonical)
    }
    if (meta?.tag?.robot) {
      metaAdder('property="robot"', meta?.tag?.robot)
    }
    if (meta?.og?.title) {
      metaAdder('property="og:title"', meta?.og?.title)
    }
    if (meta?.og?.description) {
      metaAdder('property="og:description"', meta?.og?.description)
    }
    if (meta?.og?.url) {
      metaUrl('property="og:image"', meta?.og?.image?.url)
    }
    if (meta?.og?.type) {
      metaAdder('property="og:type"', meta?.og?.type)
    }
    if (meta?.og?.url) {
      metaUrl('property="og:url"', document?.location?.href)
    }
    if (meta?.article?.author) {
      metaAdder('property="article:author"', meta?.article?.author)
    }
    if (meta?.article?.author) {
      metaAdder('property="article:publisher"', meta?.article?.author)
    }
    if (meta?.twitter?.title) {
      metaAdder('property="twitter:title"', meta?.twitter?.title)
    }
    if (meta?.twitter?.description) {
      metaAdder('property="twitter:description"', meta?.twitter?.description)
    }
    if (meta?.twitter?.image?.url) {
      metaUrl('property="twitter:image"', meta?.twitter?.image?.url)
    }
    if (document?.location?.href) {
      metaUrl('property="url"', document?.location?.href)
    }
    if (meta?.redirect?.url_301) {
      metaUrl('property="redirect:url_301"', meta?.redirect?.url_301)
    }
    if (meta?.redirect?.url_302) {
      metaUrl('property="redirect:url_302"', meta?.redirect?.url_302)
    }
  }
  
//   export const populateJsonLd = (item) => {
//     const { pathname } = typeof window !== 'undefined' ? window.location : { pathname: null }
//     const data = JSON.parse(JSON.stringify(item))
//     const schemaJson = data?.url === pathname ? data?.schema : ``
//     const schemajsonld = JSON.parse(schemaJson)[0]
//     const existingScriptTag = document.querySelector(`script[type="application/ld+json"]`)
//     if (existingScriptTag) {
//       existingScriptTag.textContent = `${JSON.stringify(schemajsonld)}`
//     } else {
//       const script = document.createElement('script')
//       script.setAttribute('type', 'application/ld+json')
//       script.innerText = `${JSON.stringify(schemajsonld)}`
//       document.head.appendChild(script)
//     }
//   }
  