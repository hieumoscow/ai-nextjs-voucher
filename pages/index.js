import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useEffect, useState} from "react";

export default function Home() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [todo, setTodo] = useState("");
    let changeHandler = (event) => {
        setTodo(event.target.value)
    }

    let addTodo = (event) => {
        setLoading(true)
        event.preventDefault();
        fetch('/api/add?todo=' + todo)
            .then(res => res.json())
            .then(data => {
                loadTodos()
            })
    }

    let removeTodo = (rtodo) => {
        setLoading(true)
        fetch('/api/remove?todo=' + rtodo)
            .then(res => res.json())
            .then(data => {
                loadTodos()
            })
    }

    let loadTodos = () => {
        console.log("load todos")
        fetch('/api/list')
            .then(res => res.json())
            .then(data => {
                    setData(data)
                    setLoading(false)
                }
            )
    }

    useEffect(() => {
        console.log("effect")
        setLoading(true)
        loadTodos()
    }, [])

    if (!data) return "Loading...";
    return (
        <div className={styles.container}>
            <Head>
                <title>Voucher redemption</title>
                <meta name="description" content="Generated by create next a    pp"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <div className={styles.grid}>
                    <h1 className={styles.title}>
                        Voucher Redemption
                        <br/>
                        <br/>
                    </h1>
                    {
                        loading ?
                            <a href="#" className={styles.card}>
                                <img src="/loader.gif"/>
                            </a>
                            :
                            <form className={styles.cardForm} onSubmit={addTodo}>
                                <input className={styles.cardInput} type="text"
                                       name="todo" onChange={changeHandler}
                                       placeholder="Create your voucher!"/>
                            </form>
                    }

                    {data.map((item) =>
                        <a href="#" onClick={() => removeTodo(item)} className={styles.card} key={item.voucherId} >
                            <div className="flex">
                                <div className="w-1/5 text-2xl text-green-600">{item.merchant}</div>
                                <div class="w-3/5 h-12"></div>
                                {item.couponCode ? <div className="w-1/5 text-center m-auto">{item.couponCode}</div>  :
                                <button class="w-1/5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " >Redeem</button>}
                                
                            </div>
                        </a>)
                    }
                </div>
            </main>

            {/* <footer className={styles.footer}>
                <a
                    href="https://blog.upstash.com/nextjs-todo"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span className={styles.logo}>
            <Image src="/logo.png" alt="Upstash Logo" width={87} height={25}/>
          </span>
                </a>
            </footer> */}
        </div>
    )
}