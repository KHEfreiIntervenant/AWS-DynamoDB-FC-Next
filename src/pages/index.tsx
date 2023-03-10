import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import React, { useState, useEffect } from 'react';

type Content = {
  [key: string]: string;
};

export default function Home() {

  const [content , setContent] = useState<Content>({});

  useEffect(() => {
    fetch('/api/getContent')
      .then(res => res.json())
      .then(data => setContent(data.data)).then(() => console.log(content))
      .catch(err => console.error('Error retrieving content from API', err));
  }, []);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
        <h1>My Content</h1>
        <div className="card">
          <button onClick={() => console.log(content)}>
            Get content from DynamoDB
          </button>
        </div>
          {content && Object.keys(content).map((item:string, index:number) => (
            <div key={index}>
              <h1>{item}</h1>
              <p>{content[item]}</p>
            </div>
            
          ))}
        
        </div>
      </main>
    </>
  )
}
